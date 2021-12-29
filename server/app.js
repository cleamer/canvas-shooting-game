"use strict";
// Express
const express = require("express");
const app = express();
const PORT = 3000;

// Database
const mysql = require("mysql2/promise");
const myDB = require("./src/DB/DB-info");
const pool = mysql.createPool(myDB);

// Library
const sanitizeHTML = require("sanitize-html");

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

// Dao (query to DB)
const dbNicknameExist = async function (connection, nickname) {
    const selectNoQuery = `
        select no
        from Player
        where nickname = ?;
        `;
    const [noFromNickname] = await connection.query(selectNoQuery, nickname);
    return noFromNickname;
};

// Provider (GET)
const checkNickname = async function (nickname) {
    const connection = await pool.getConnection(async (conn) => conn);
    const checkNicknameResult = await dbNicknameExist(connection, nickname);
    connection.release();
    return checkNicknameResult[0];
};

// Controller
const login = async function (req, res) {
    const { nickname, password, score } = req.body;
    const nickname0 = sanitizeHTML(nickname);
    const password0 = sanitizeHTML(password);
    const score0 = parseInt(score);

    // validation
    if (!nickname0) return res.send(errResponse(Message.EMPTY_NICKNAME));
    if (!password0) return res.send(errResponse(Message.EMPTY_PASSWORD));
    if (nickname0.length < 4 || nickname0 > 8) return res.send(errResponse(Message.LENGTH_NICKNAME));
    if (password0.length < 4 || password0 > 10) return res.send(errResponse(Message.LENGTH_PASSWORD));
    if (!(score0 > 0)) return res.send(errResponse(Message.NAN_SCORE));

    try {
        // TODO: main logic
        const DoesNicknameExist = await checkNickname(nickname0);
        if (DoesNicknameExist) {
            const no = DoesNicknameExist.no;
            console.log(no);
            // TRUE -> IF(check PW match)
            // TRUE -> TRUE -> update score
            // TRUE -> FALSE -> throw PW error
        } else {
            // FALSE -> create new user and save
        }
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
