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
