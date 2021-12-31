"use strict";

const nicknameInput = document.getElementById("nickname-input");
const passwordInput = document.getElementById("password-input");

// Ajax
async function postLogin(nickname, password, score) {
    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, password, score }),
    });

    if (!res.ok) throw new Error("Login Ajax Error!");

    const result = await res.json();
    return result;
}
async function getScoreBoard() {
    const res = await fetch("http://localhost:3000/score-board");

    if (!res.ok) throw new Error("Get Score Board Ajax Error!");

    const result = await res.json();
    return result;
}

const postNickname = nicknameInput.value;
const postPassword = passwordInput.value;
const postScore = parseInt(inGameScoreSpan.innerHTML);
postLogin(postNickname, postPassword, postScore).then((res) => {
    // TODO: route by status of reponse
    console.log(res);
    const socreList = await getScoreBoard();
});
