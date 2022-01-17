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
function drawRecord(record) {
  const tr = document.createElement("tr");
  const tdRank = document.createElement("td");
  const tdNickname = document.createElement("td");
  const tdScore = document.createElement("td");
  tdRank.innerHTML = record.ranking;
  tdNickname.innerHTML = record.nickname;
  tdScore.innerHTML = record.score;

  tr.append(tdRank, tdNickname, tdScore);
  table.appendChild(tr);
}
function drawTable(myNickname, records) {
  // clear table and draw
  table.innerHTML = "<tr><th>Rank</th><th>Nickname</th><th>score</th></tr>";
  records.forEach((record) => {
    if (record.nickname === myNickname) myRankH1.innerHTML = `Rank: ${record.ranking}`;
    drawRecord(record);
  });
}
function warnig(message) {
  warningH1.innerHTML = message;
  warningH1.classList.remove(HIDDEN);
}
function goScoreBoard() {
  loginDiv.classList.add(HIDDEN);
  scoreBoardDiv.classList.remove(HIDDEN);
  warningH1.classList.add(HIDDEN);
}

async function loginBtnHandler() {
  const postNickname = nicknameInput.value;
  const postPassword = passwordInput.value;
  const postScore = parseInt(inGameScoreSpan.innerHTML);
  try {
    const loginResult = await postLogin(postNickname, postPassword, postScore);
    if (loginResult.isSuccess) {
      const scoreBoardResult = await getScoreBoard();
      if (scoreBoardResult.isSuccess) {
        drawTable(postNickname, scoreBoardResult.result);
        goScoreBoard();
      } else {
        /*
                NOT_MATCHED_NICKNAEM: { isSuccess: false, code: 4001, message: "There is no record by that nickname." },
                DB_NO_RECORD_ERROR: { isSuccess: false, code: 5001, message: "There is no record!" },
                */
      }
    } else {
      // login exception
      warnig(loginResult.message);
    }
  } catch (error) {
    // TODO: fetch ERROR: ex) server is not running
    console.log(error);
  }
}

loginBtn.addEventListener("click", loginBtnHandler);
