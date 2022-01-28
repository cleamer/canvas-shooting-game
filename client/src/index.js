import gameStart from "./game.js";
import * as Controller from "./controller.js";

const startBtn = document.getElementById("start-btn");
const loginBtn = document.getElementById("login-btn");
const boardStartBtn = document.getElementById("board-start-btn");
const saveBtn = document.getElementById("save-btn");

// Event Listener
startBtn.addEventListener("click", gameStart);
loginBtn.addEventListener("click", Controller.loginBtnHandler);

boardStartBtn.addEventListener("click", () => {
  Controller.hideScoreBoard();
  gameStart();
});

saveBtn.addEventListener("click", Controller.goLogin);
