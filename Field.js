class Field {
  constructor(rowCount, columnCount, bombs) {
    console.log("starting field...");

    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.bombs = bombs;

    this.rows = [];
    this.cells = [];
  }

  build() {
    for (let i = 0; i < this.rowCount * this.columnCount; i++) {
      this.cells.push(new Cell(i));
    }

    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    this.rows.push(rowDiv);

    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].generateDiv(rowDiv);
      if ((i + 1) % this.columnCount == 0) {
        rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
      }
      gameContainer.appendChild(rowDiv);
    }
  }
}
