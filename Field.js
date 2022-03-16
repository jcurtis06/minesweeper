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

    this.placeBombs();
  }

  placeBombs() {
    let setBombs = [];

    for (let i = 0; i < this.bombs; i++) {
      let number = Math.floor(
        Math.random() * (this.rowCount * this.columnCount)
      );

      while (setBombs.indexOf(number) >= 0) {
        number = Math.floor(Math.random() * (this.rowCount * this.columnCount));
      }

      setBombs.push(number);
      this.cells[number].setType(0);
      this.updateAdjacent(number);
    }
  }

  updateAdjacent(cellIndex) {
    let leftSide = cellIndex % this.columnCount === 0;
    let rightSide = (cellIndex + 1) % this.columnCount === 0;
    let topSide = cellIndex - this.columnCount < 0;
    let bottomSide =
      cellIndex + this.columnCount >= this.columnCount * this.rowCount;

    if (!leftSide) {
      this.cells[cellIndex - 1].increaseBombs();

      if (!topSide)
        this.cells[cellIndex - this.columnCount - 1].increaseBombs();

      if (!bottomSide)
        this.cells[cellIndex + this.columnCount - 1].increaseBombs();
    }

    if (!rightSide) {
      this.cells[cellIndex + 1].increaseBombs();

      if (!topSide)
        this.cells[cellIndex - this.columnCount + 1].increaseBombs();
      if (!bottomSide)
        this.cells[cellIndex + this.columnCount + 1].increaseBombs();
    }

    if (!bottomSide) this.cells[cellIndex + this.columnCount].increaseBombs();
    if (!topSide) this.cells[cellIndex - this.columnCount].increaseBombs();
  }

  cycleCells(startIndex, queue) {
    if (queue.indexOf(startIndex) !== -1) return queue;

    if (this.cells[startIndex].isNumber()) {
      queue.push(startIndex);
      return queue;
    } else if (this.cells[startIndex].isEmpty()) {
      queue.push(startIndex);
    } else {
      return queue;
    }

    var leftSide = startIndex % this.columnCount === 0;
    var rightSide = (startIndex + 1) % this.columnCount === 0;
    var topSide = startIndex - this.columnCount < 0;
    var bottomSide =
      startIndex + this.columnCount >= this.columnCount * this.rowCount;

    if (!leftSide) {
      queue.concat(this.cycleCells(startIndex - 1, queue));
      if (!topSide) {
        queue.concat(this.cycleCells(startIndex - this.columnCount - 1, queue));
      }
      if (!bottomSide) {
        queue.concat(this.cycleCells(startIndex + this.columnCount - 1, queue));
      }
    }
    if (!rightSide) {
      if (!topSide) {
        queue.concat(this.cycleCells(startIndex - this.columnCount + 1, queue));
      }
      if (!bottomSide) {
        queue.concat(this.cycleCells(startIndex + this.columnCount + 1, queue));
      }
      queue.concat(this.cycleCells(startIndex + 1, queue));
    }
    if (!bottomSide) {
      queue.concat(this.cycleCells(startIndex + this.columnCount, queue));
    }
    if (!topSide) {
      queue.concat(this.cycleCells(startIndex - this.columnCount, queue));
    }
    return queue;
  }

  getCells() {
    return this.cells;
  }
}
