let bombsElement = document.getElementById("bombs-counter");
let movesElement = document.getElementById("moves-counter");
let timerElement = document.getElementById("timer");

let settingsPopup = document.getElementById("settings-page");
let helpPopup = document.getElementById("help-page");
let gamePage = document.getElementById("game-page");

let multiButton = {
  icon: document.getElementById("mode-icon"),
  text: document.getElementById("mode-text"),
  restartMode: false,
};

function toggleButtonMode() {
  if (!game.isMining()) {
    multiButton.icon.innerHTML = "⛏️";
    multiButton.text.innerHTML = "MINE";
  } else {
    multiButton.icon.innerHTML = "🏴";
    multiButton.text.innerHTML = "FLAG";
  }
  game.toggleMining();
}

function setButtonRestart() {
  multiButton.icon.innerHTML = "♻️";
  multiButton.text.innerHTML = "RESTART";
  multiButton.restartMode = true;
}

function setButtonToggleModes() {
  multiButton.restartMode = false;
}

function multiBtnClicked() {
  if (multiButton.restartMode) game.restart(10, 10, 5);
  else toggleButtonMode();
}
