class GameManager {
  constructor() {
    this.defused = 0;
    this.flags = 0;
    this.mining = true;
    this.alive = true;
    this.moves = 0;
  }

  start(rows, columns, bombs) {
    field = new Field(rows, columns, bombs);
    this.flags = bombs;
    field.build();
    console.log("REACHED");
    return field;
  }

  end() {
    alert("game over!");
    this.alive = false;
    setButtonRestart();
  }

  checkWin() {
    console.log(this.defused, field.getBombs());
    if (this.defused == field.getBombs()) {
      console.log("YOU WIN!");
      setButtonRestart();
    }
  }

  restart(rows, columns, bombs) {
    field.clear();
    this.start(rows, columns, bombs);
    setButtonToggleModes();
  }

  removeFlag() {
    this.flags--;
  }

  addFlag() {
    this.flags++;
  }

  getFlags() {
    return this.flags;
  }

  addDefused() {
    this.defused++;
  }

  addMove() {
    this.moves++;
    console.log("moves", this.moves);
  }

  removeDefused() {
    this.defused--;
  }

  isMining() {
    return this.mining == true;
  }

  toggleMining() {
    if (this.mining) this.mining = false;
    else this.mining = true;
  }
}
