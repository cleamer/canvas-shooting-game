"use strict";

import * as Model from "./model.js";

const scoreDiv = document.getElementById("score-div");
const inGameScoreSpan = document.getElementById("in-game-score");
const scoreResultH1 = document.getElementById("game-score");
const scoreBoardDiv = document.getElementById("score-board-div");
const loginDiv = document.getElementById("login-div");
const warningH1 = document.getElementById("warning-h1");
const table = document.getElementById("score-board");
const myRankH1 = document.getElementById("my-rank");
const saveBtn = document.getElementById("save-btn");
const nicknameInput = document.getElementById("nickname-input");
const passwordInput = document.getElementById("password-input");

const HIDDEN = "hidden";

export const gameReady = function () {
  scoreDiv.classList.add(HIDDEN);
  inGameScoreSpan.innerHTML = 0;
};
export const gameOver = function (score) {
  scoreResultH1.innerHTML = score;
  if (score > 0) saveBtn.classList.remove(HIDDEN);
  else saveBtn.classList.add(HIDDEN);
  scoreDiv.classList.remove(HIDDEN);
};
export const scoreSpanUpdate = function (score) {
  inGameScoreSpan.innerHTML = score;
};
export const hideScoreBoard = function () {
  scoreBoardDiv.classList.add(HIDDEN);
};

export const goScoreBoard = function () {
  loginDiv.classList.add(HIDDEN);
  scoreBoardDiv.classList.remove(HIDDEN);
  warningH1.classList.add(HIDDEN);
};
export const goLogin = function () {
  scoreDiv.classList.add(HIDDEN);
  loginDiv.classList.remove(HIDDEN);
};

function drawRecord(record) {
  const tr = document.createElement("tr");
  const tdRank = document.createElement("td");
  const tdNickname = document.createElement("td");
  const tdScore = document.createElement("td");
  tdRank.innerHTML = record.ranking;
  tdNickname.innerHTML = record.nickname;
  tdScore.innerHTML = record.score;
  tr.append(tdRank, tdNickname, tdScore);
  return tr;
}

function drawTable(myNickname, records) {
  // clear table and draw
  table.innerHTML = "<tr><th>Rank</th><th>Nickname</th><th>score</th></tr>";
  records.forEach((record) => {
    if (record.nickname === myNickname) myRankH1.innerHTML = `Rank: ${record.ranking}`;
    table.appendChild(drawRecord(record));
  });
}

const warning = function (message) {
  warningH1.innerHTML = message;
  warningH1.classList.remove(HIDDEN);
};

export async function loginBtnHandler() {
  const postNickname = nicknameInput.value;
  const postPassword = passwordInput.value;
  const postScore = parseInt(inGameScoreSpan.innerHTML);
  try {
    const loginResult = await Model.postLogin(postNickname, postPassword, postScore);
    if (!loginResult.isSuccess) return warning(loginResult.message);

    const scoreBoardResult = await Model.getScoreBoard();
    if (!scoreBoardResult.isSuccess) return warning(loginResult.message);

    drawTable(postNickname, scoreBoardResult.result);
    goScoreBoard();
  } catch (error) {
    warning("Server Error");
    console.log(error);
  }
}
