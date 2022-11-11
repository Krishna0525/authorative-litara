import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const { htmlToText } = require('html-to-text');
const htmlPages = require("./navigationLinks.json");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  title = 'authorative-litarature-test';

  htmlData: string = "";
  getSearchValue: string = "";
  mainActivate: boolean = true;
  searchActivate: boolean = false;

  constructor(private http: HttpClient) { };
  searchResultArray: [] = []

  checkStrInFiles(listOfFiles: any, searchStr: string) {
    const objLength = Object.keys(listOfFiles).length;
    if (objLength > 0) {
      for (let page in listOfFiles) {
        const notArray: boolean = !Array.isArray(listOfFiles[page]);
        if (notArray) {
          this.checkStrInFiles(listOfFiles[page], searchStr)
        } else {
          listOfFiles[page].map((pageIn: any) => {
            const objLength = Object.keys(page).length;
            if (objLength > 0) {
              if ("title" in pageIn && "pageName" in pageIn) {
                this.http.get("app/htmls/" + pageIn.title, {
                  responseType: 'text'
                }).subscribe((data) => {
                  const searchPattren = new RegExp(searchStr, "gi");
                  const htmlToTextConvert = htmlToText(data, { wordwrap: 300 });
                  const isSearchPattrenExist = searchPattren.test(htmlToTextConvert);
                  if (isSearchPattrenExist) {

                  }
                })
              } else {
                this.checkStrInFiles(pageIn, searchStr)
              }
            }
          });
        }
      }
    }
  }

  searchNow() {
    if (this.getSearchValue.trim().length > 2) {
      this.mainActivate = false;
      this.searchActivate = true;
      this.checkStrInFiles(htmlPages, this.getSearchValue);
    } else {
      alert("search string should min 2 chars")
    }
  }

}
