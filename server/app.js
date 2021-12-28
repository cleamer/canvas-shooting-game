"use strict";
const sanitizeHTML = require("sanitize-html");
const express = require("express");
const app = express();
const PORT = 3000;

// Response message
const response = ({ isSuccess, code, message }, result) => {
    return { isSuccess, code, message, result: result };
};
const errResponse = ({ isSuccess, code, message }) => {
    return { isSuccess, code, message };
};
const Message = {
    // success
    SUCCESS_CREATE: { isSuccess: true, code: 2000, message: "It has been successed to create a new user" },
    SUCCESS_UPDATE: { isSuccess: true, code: 2001, message: "It has been successed to update the new user" },
    // validation
    EMPTY_NICKNAME: { isSuccess: false, code: 3000, message: "Nickname is required." },
    EMPTY_PASSWORD: { isSuccess: false, code: 3001, message: "Password is required." },
    LENGTH_NICKNAME: { isSuccess: false, code: 3002, message: "Nickname must be between 4 and 8 letters long." },
    LENGTH_PASSWORD: { isSuccess: false, code: 3003, message: "Password must be between 4 and 10 letters long." },
    NAN_SCORE: { isSuccess: false, code: 3004, message: "Score is not a number." },
    //
    NOT_MATCHED_PASSWORD: { isSuccess: false, code: 4000, message: "It's a wrong password." },
    // Error
    SERVER_ERROR: { isSuccess: false, code: 5000, message: "Server Error" },
};

// Controller
const login = async function (req, res) {
    const { nickname0, password0, score0 } = req.body;
    const nickname = sanitizeHTML(nickname0);
    const password = sanitizeHTML(password0);
    const score = parseInt(score0);

    // validation
    if (!nickname) return res.send(errResponse(Message.EMPTY_NICKNAME));
    if (!password) return res.send(errResponse(Message.EMPTY_PASSWORD));
    if (nickname.length < 4 || nickname > 8) return res.send(errResponse(Message.LENGTH_NICKNAME));
    if (password.length < 4 || password > 10) return res.send(errResponse(Message.LENGTH_PASSWORD));
    if (!(score > 0)) return res.send(errResponse(Message.NAN_SCORE));

    try {
        // TODO: main logic
        // IF(check nickname in DB)
        // TRUE -> IF(check PW match)
        // TRUE -> TRUE -> update score
        // TRUE -> FALSE -> throw PW error
        // FALSE -> create new user and save
    } catch (error) {
        console.log(error);
        return res.send(errResponse(Message.SERVER_ERROR));
    }
};

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route
app.post("/login", login);

// Listen
app.listen(PORT, () => {
    console.log(`API-server is listening at port: ${PORT}`);
});
