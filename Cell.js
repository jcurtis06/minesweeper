class Cell {
  constructor(index) {
    this.index = index;
    this.cellType = -1;
    this.visible = false;
    this.flagged = false;
    this.icon = "⬜";
  }

  generateDiv(parent) {
    if (this.div) {
      this.updateIcon();
      return;
    }

    this.div = document.createElement("div");
    this.div.className = "cell";

    this.updateIcon();

    this.div.addEventListener("click", () => {
      this.leftClicked();
    });

    this.div.addEventListener("contextmenu", (e) => {
      this.rightClicked();
      e.preventDefault();
    });

    parent.appendChild(this.div);
  }

  leftClicked() {
    if (!game.isMining()) {
      this.rightClicked();
      return;
    }

    game.addMove();

    if (this.flagged) {
      this.toggleFlag();
      return;
    }

    if (this.cellVisibility) return;

    this.reveal();

    if (this.isBomb()) {
      game.end();
    }

    if (this.isEmpty()) {
      var queue = field.cycleCells(this.index, []);

      for (let i = 1; i < queue.length; i++) {
        setTimeout(function revealDelay() {
          field.getCells()[queue[i]].reveal();
        }, i * 5);
      }
    }
  }

  rightClicked() {
    game.addMove();
    this.toggleFlag();

    if (this.flagged) {
      if (this.isBomb()) game.addDefused();
    } else {
      if (this.isBomb()) game.removeDefused();
    }

    game.checkWin();
  }

  updateIcon() {
    if (this.flagged) {
      this.icon = "🏴";
    } else {
      if (this.visible) {
        switch (this.cellType) {
          case -1:
            this.icon = "🟩";
            this.div.classList.add("empty");
            break;
          case 0:
            this.icon = "💣";
            this.div.classList.add("bomb");
            break;
          case 1:
            this.icon = "1️⃣";
            break;
          case 2:
            this.icon = "2️⃣";
            break;
          case 3:
            this.icon = "3️⃣";
            break;
          case 4:
            this.icon = "4️⃣";
            break;
          case 5:
            this.icon = "5️⃣";
            break;
          case 6:
            this.icon = "6️⃣";
            break;
          case 7:
            this.icon = "7️⃣";
            break;
          case 8:
            this.icon = "8️⃣";
            break;
        }

        if (this.cellType > 0) this.div.classList.add("number");
      } else {
        this.icon = "⬜";
      }
    }
    this.div.innerHTML = this.icon;
  }

  reveal() {
    this.setVisiblity(true);
    this.updateIcon();
  }

  setType(cellType) {
    this.cellType = cellType;
  }

  setVisiblity(cellVisibility) {
    this.visible = cellVisibility;
  }

  toggleFlag() {
    if (this.visible) return;

    if (this.flagged) {
      this.flagged = false;
      game.addFlag();
    } else {
      if (game.getFlags() <= 0) return;

      this.flagged = true;
      game.removeFlag();
    }

    this.updateIcon();
  }

  increaseBombs() {
    if (this.cellType == 0) return;
    if (this.cellType == -1) this.setType(1);
    else this.cellType++;
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
