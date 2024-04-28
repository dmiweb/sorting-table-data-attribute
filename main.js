/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/sort/SortingData.js
class SortingData {
  constructor() {
    this.setFields = [...document.querySelectorAll("tr")].slice(1);
    this.sortKeys = Object.keys(this.setFields[0].dataset).flatMap(i => [i, i]);
    this.methodSort = new Array(this.sortKeys.length / 2).fill(["asc", "desc"]).flat();
    this.index = 0;
  }
  sortingSetFields(array, attr, methodSort) {
    for (const element of array) {
      if (!isNaN(Number(element.getAttribute(`data-${attr}`))) && methodSort === "asc") {
        document.querySelector(`.${attr}`).classList.add("asc");
        return array.sort((a, b) => +a.getAttribute(`data-${attr}`) - +b.getAttribute(`data-${attr}`));
      }
      if (!isNaN(Number(element.getAttribute(`data-${attr}`))) && methodSort === "desc") {
        document.querySelector(`.${attr}`).classList.add("desc");
        return array.sort((a, b) => +b.getAttribute(`data-${attr}`) - +a.getAttribute(`data-${attr}`));
      }
      if (isNaN(Number(element.getAttribute(`data-${attr}`))) && methodSort === "asc") {
        document.querySelector(`.${attr}`).classList.add("asc");
        return array.sort((a, b) => a.getAttribute(`data-${attr}`).toLowerCase().localeCompare(b.getAttribute(`data-${attr}`).toLowerCase()));
      }
      if (isNaN(Number(element.getAttribute(`data-${attr}`))) && methodSort === "desc") {
        document.querySelector(`.${attr}`).classList.add("desc");
        return array.sort((a, b) => b.getAttribute(`data-${attr}`).toLowerCase().localeCompare(a.getAttribute(`data-${attr}`).toLowerCase()));
      }
    }
  }
  addDataTable(elements) {
    for (const element of elements) {
      document.querySelector(".tableBody").appendChild(element);
    }
  }
  clearDataTable() {
    document.querySelector(".tableBody").innerHTML = "";
    for (const element of document.querySelectorAll("th")) {
      element.classList.remove("asc");
      element.classList.remove("desc");
    }
  }
  startSortingTable() {
    setInterval(() => {
      this.clearDataTable();
      this.addDataTable(this.sortingSetFields(this.setFields, this.sortKeys[this.index], this.methodSort[this.index]));
      this.index++;
      if (this.index === this.sortKeys.length) {
        this.index = 0;
      }
    }, 2000);
  }
}
;// CONCATENATED MODULE: ./src/js/sort/response.js
const response = [{
  id: 26,
  title: "Побег из Шоушенка",
  imdb: 9.3,
  year: 1994
}, {
  id: 25,
  title: "Крёстный отец",
  imdb: 9.2,
  year: 1972
}, {
  id: 27,
  title: "Крёстный отец 2",
  imdb: 9.0,
  year: 1974
}, {
  id: 1047,
  title: "Тёмный рыцарь",
  imdb: 9.0,
  year: 2008
}, {
  id: 223,
  title: "Криминальное чтиво",
  imdb: 8.9,
  year: 1994
}];
;// CONCATENATED MODULE: ./src/js/app.js


for (const el of response) {
  const data = `
<tr data-id="${el.id}" data-title="${el.title}" data-year="${el.year}" data-imdb="${el.imdb.toFixed(2)}">
<td class="id">${el.id}</td>
<td class="title">${el.title}</td>
<td class="year">${el.year}</td>
<td class="imdb">${"imdb: " + el.imdb.toFixed(2)}</td>
</tr>`;
  document.querySelector(".tableBody").insertAdjacentHTML("beforeEnd", data);
}
const sort = new SortingData();
sort.startSortingTable();
;// CONCATENATED MODULE: ./src/index.js




// TODO: write your code in app.js
/******/ })()
;