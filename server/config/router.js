"use strick";

module.exports = function (app) {
    const { login } = require("../src/login/loginController");
    app.post("/login", login);

    // TODO: get rank list
    // const {getranks} = require();
    // app.get('/ranks', getranks)
};
