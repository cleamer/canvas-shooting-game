"use strict";

const HOST = "http://localhost";
const PORT = 3000;

// Ajax
async function postLogin(nickname, password, score) {
  const res = await fetch(`${HOST}:${PORT}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nickname, password, score }),
  });
  if (!res.ok) throw new Error("Login Ajax Error!");
  const result = await res.json();
  return result;
}
async function getScoreBoard() {
  const res = await fetch(`${HOST}:${PORT}/score-board`);
  if (!res.ok) throw new Error("Get Score Board Ajax Error!");
  const result = await res.json();
  return result;
}

export { postLogin, getScoreBoard };
