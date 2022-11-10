import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

var json = require("./navigationLinks.json");

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
    this.mainActivate = false;
    this.searchActivate = true;
  }


  getHtmlFile(endPoint: any) {
    this.http.get('app/htmls/' + endPoint, {
      responseType: 'text'
    }).subscribe(
      (data) => {
        this.htmlData += data.replace(/Company/gi, "<mark>Company</mark>");
        // console.log(this.htmlData)
      },
      (error: any) => {
        // this.htmlData = "error";
        // console.log("error");
      }

    )
  }

  ngOnInit() {
    let levelOneLength = Object.keys(json).length;
    // Level One Length Check
    if (levelOneLength > 0) {
      // Looping through level one
      for (let levelOne in json) {
        // Checking level two is array or not
        const levelTwoNotArray = !Array.isArray(json[levelOne]);
        // If level two is not an array
        if (levelTwoNotArray) {
          // geting level two length
          const levelTwoLength = Object.keys(json[levelOne]).length;
          // Checking level two length grater then 0
          if (levelTwoLength > 0) {

            for (let levelTwo in json[levelOne]) {
              const levelThreeNotArray = !Array.isArray(json[levelOne][levelTwo]);
              if (levelThreeNotArray) {
                const levelThreeLength = Object.keys(json[levelOne][levelTwo]).length;
                if (levelThreeLength > 0) {
                  for (let levelThree in json[levelOne][levelTwo]) {
                    const levelFourNotArray = !Array.isArray(json[levelOne][levelTwo][levelThree]);
                    if (levelFourNotArray) {

                    } else {
                      json[levelOne][levelTwo][levelThree].map((book: any) => {
                        this.getHtmlFile(book.pageName)
                      })
                    }
                    // console.log(json[levelOne][levelTwo][levelThree])
                    // this.getHtmlFile(json[levelOne][levelTwo][levelThree])
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
  }
}
