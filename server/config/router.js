"use strick";

module.exports = function (app) {
    const { login } = require("../src/login/loginController");
    app.post("/login", login);

    // TODO: get rank list
    // const {getScoreBoard} = require();
    // app.get('/records', getScoreBoard)
};
