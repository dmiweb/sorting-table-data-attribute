export default class SortingData {
  constructor() {
    this.setFields = [...document.querySelectorAll("tr")].slice(1);
    this.sortKeys = Object.keys(this.setFields[0].dataset).flatMap((i) => [
      i,
      i,
    ]);
    this.methodSort = new Array(this.sortKeys.length / 2)
      .fill(["asc", "desc"])
      .flat();
    this.index = 0;
  }

  sortingSetFields(array, attr, methodSort) {
    for (const element of array) {
      if (
        !isNaN(Number(element.getAttribute(`data-${attr}`))) &&
        methodSort === "asc"
      ) {
        document.querySelector(`.${attr}`).classList.add("asc");
        return array.sort(
          (a, b) =>
            +a.getAttribute(`data-${attr}`) - +b.getAttribute(`data-${attr}`)
        );
      }

      if (
        !isNaN(Number(element.getAttribute(`data-${attr}`))) &&
        methodSort === "desc"
      ) {
        document.querySelector(`.${attr}`).classList.add("desc");
        return array.sort(
          (a, b) =>
            +b.getAttribute(`data-${attr}`) - +a.getAttribute(`data-${attr}`)
        );
      }

      if (
        isNaN(Number(element.getAttribute(`data-${attr}`))) &&
        methodSort === "asc"
      ) {
        document.querySelector(`.${attr}`).classList.add("asc");

        return array.sort((a, b) =>
          a
            .getAttribute(`data-${attr}`)
            .toLowerCase()
            .localeCompare(b.getAttribute(`data-${attr}`).toLowerCase())
        );
      }

      if (
        isNaN(Number(element.getAttribute(`data-${attr}`))) &&
        methodSort === "desc"
      ) {
        document.querySelector(`.${attr}`).classList.add("desc");
        return array.sort((a, b) =>
          b
            .getAttribute(`data-${attr}`)
            .toLowerCase()
            .localeCompare(a.getAttribute(`data-${attr}`).toLowerCase())
        );
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
      this.addDataTable(
        this.sortingSetFields(
          this.setFields,
          this.sortKeys[this.index],
          this.methodSort[this.index]
        )
      );

      this.index++;

      if (this.index === this.sortKeys.length) {
        this.index = 0;
      }
    }, 2000);
  }
}