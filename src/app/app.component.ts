import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const { htmlToText } = require('html-to-text');
const htmlPages = require("./navigationLinks.json");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'authorative-litarature-test';
  htmlData: string = "";
  getSearchValue: string = "";
  mainActivate: boolean = true;
  searchActivate: boolean = false;

  constructor(private http: HttpClient) { };

  searchNow() {
    if (this.getSearchValue.trim().length > 2) {
      this.mainActivate = false;
      this.searchActivate = true;
      this.checkStrInFiles(htmlPages);
      return;

      let levelOneLength = Object.keys(htmlPages).length;
      if (levelOneLength > 0) {
        for (let levelOne in htmlPages) {
          const levelTwoNotArray = !Array.isArray(htmlPages[levelOne]);
          if (levelTwoNotArray) {
            const levelTwoLength = Object.keys(htmlPages[levelOne]).length;
            if (levelTwoLength > 0) {
              for (let levelTwo in htmlPages[levelOne]) {
                const levelThreeNotArray = !Array.isArray(htmlPages[levelOne][levelTwo]);
                if (levelThreeNotArray) {
                  const levelThreeLength = Object.keys(htmlPages[levelOne][levelTwo]).length;
                  if (levelThreeLength > 0) {
                    for (let levelThree in htmlPages[levelOne][levelTwo]) {
                      const levelFourNotArray = !Array.isArray(htmlPages[levelOne][levelTwo][levelThree]);
                      if (levelFourNotArray) {

                      } else {
                        htmlPages[levelOne][levelTwo][levelThree].map((book: any) => {
                          this.getHtmlFile(book.pageName)
                        })
                      }
                      // console.log(htmlPages[levelOne][levelTwo][levelThree])
                      // this.getHtmlFile(htmlPages[levelOne][levelTwo][levelThree])
                    }
                  }

                } else {

                }
              }

            }
          } else {

          }
        }
      }
    } else {
      alert("search string should min 2 chars")
    }
  }

  checkStrInFiles(listOfFiles: any) {
    const objLength = Object.keys(listOfFiles).length;
    if (objLength > 0) {
      for (let page in listOfFiles) {
        const notArray: boolean = !Array.isArray(listOfFiles[page]);
        if (notArray) {
          this.checkStrInFiles(listOfFiles[page])
        } else {
          listOfFiles[page].map((page: {}) => {
            const objLength = Object.keys(page).length;
            console.log(page)
            const pageCheck: boolean = !Array.isArray(page);
            // if(pageCheck) {
            //   const objLength = Object.keys(listOfFiles).length;
            //   this.checkStrInFiles(page)
            // } else {

            // }
          })
        }
      }
    }
  }

  getHtmlFile(endPoint: any) {
    this.http.get('app/htmls/' + endPoint, {
      responseType: 'text'
    }).subscribe(
      (data) => {
        var re = new RegExp(this.getSearchValue, "gi");
        // this.htmlData += data.replace(re, "<mark>" + this.getSearchValue + "</mark>");
        const text = htmlToText(data, {
          wordwrap: 300
        })
        let res = re.test(text);
        if (res) {
          console.log(text)
        }
      }
    )
  }

  ngOnInit() {

  }
}
