class Cell {
  constructor(index) {
    this.index = index;
    this.cellType = -1;
    this.visible = false;
    this.flagged = false;
  }

  generateDiv(parent) {
    if (this.div) {
      this.update();
      return;
    }

    this.div = document.createElement("div");
    this.div.className = "cell";
    this.div.innerHTML = "⬜";

    this.update();

    this.div.addEventListener("click", () => {
      this.leftClicked();
    });

    this.div.addEventListener("contextmenu", () => {
      this.rightClicked();
    });

    parent.appendChild(this.div);
  }

  leftClicked() {}

  rightClicked() {}

  update() {
    if (this.flagged) this.div.innerHTML = "🏴";
    else {
      if (this.cellVisibility) {
        if (this.cellType < 0) {
          this.div.classList.add("empty");
        }

        if (this.cellType == 0) {
          this.div.classList.add("bomb");

          if (fieldManager.isDead()) {
            this.div.innerText = "💣";
          } else {
            this.div.innerText = "💥";
          }
        }

        if (this.cellType > 0) {
          this.div.classList.add("number");

          switch (this.cellType) {
            case 1:
              this.div.innerText = "1️⃣";
              break;
            case 2:
              this.div.innerText = "2️⃣";
              break;
            case 3:
              this.div.innerText = "3️⃣";
              break;
            case 4:
              this.div.innerText = "4️⃣";
              break;
            case 5:
              this.div.innerText = "5️⃣";
              break;
            case 6:
              this.div.innerText = "6️⃣";
              break;
            case 7:
              this.div.innerText = "7️⃣";
              break;
            case 8:
              this.div.innerText = "8️⃣";
              break;
          }
        } else {
          this.div.innerText = "🔥";
        }
      }
    }
  }

  reveal() {
    this.setVisiblity(true);
    this.update();
  }

  setType(cellType) {
    this.cellType = type;
  }

  setVisiblity(cellVisibility) {
    this.visible = cellVisibility;
  }

  toggleFlag() {
    if (this.flagged) this.flagged = false;
    else this.flagged = true;
  }

  isBomb() {
    return this.cellType == 0;
  }

  isEmpty() {
    return this.cellType == -1;
  }

  isFlagged() {
    return this.flagged;
  }

  isNumber() {
    return this.cellType > 0;
  }
}
