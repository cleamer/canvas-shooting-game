"use strick";

module.exports = function (app) {
    const { login } = require("../src/login/loginController");
    app.post("/login", login);

    const { getScoreBoard, getMyRank } = require("../src/scoreBoard/rankController");
    app.get("/score-board", getScoreBoard);
    app.get("/my-ranking", getMyRank);
};
