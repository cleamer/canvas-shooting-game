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
const dbPasswordMatch = async function (connection, no, password) {
    const params = [no, password];
    const selectScoreQuery = `
        select score
        from Player
        where no = ? and password = ?;
        `;
    const [scoreFromNoPw] = await connection.query(selectScoreQuery, params);
    return scoreFromNoPw;
};
const dbInsertPlayer = async function (connection, nickname, password, score) {
    const params = [nickname, password, score];
    const insertPlayerQuery = `
    insert into Player(nickname, password, score) value (?, ?, ?);
    `;
    const [insertResult] = await connection.query(insertPlayerQuery, params);
    return insertResult;
};

// Provider (GET)
const checkNickname = async function (nickname) {
    const connection = await pool.getConnection(async (conn) => conn);
    const checkNicknameResult = await dbNicknameExist(connection, nickname);
    connection.release();
    return checkNicknameResult[0];
};
const checkPassword = async function (no, password) {
    const connection = await pool.getConnection(async (conn) => conn);
    const checkPasswordResult = await dbPasswordMatch(connection, no, password);
    connection.release();
    return checkPasswordResult[0];
};
const createUser = async function (nickname, password, score) {
    const connection = await pool.getConnection(async (conn) => conn);
    const insertPlayerResult = await dbInsertPlayer(connection, nickname, password, score);
    connection.release();
    return insertPlayerResult.insertId;
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
        // TODO: compare with saved score and then save only high score like top 10
        // If the nickname doen't exist save the new user's record.
        const doesNicknameExist = await checkNickname(nickname0);
        if (!doesNicknameExist) {
            const createRecordResult = await createUser(nickname0, password0, score0);
            return res.send(response(Message.SUCCESS_CREATE, { insertId: createRecordResult }));
        }

        // If the password isn't that user's password send an erorr message
        const no = doesNicknameExist.no;
        const doesPwCorrect = await checkPassword(no, password0);
        if (!doesPwCorrect) return res.send(errResponse(Message.NOT_MATCHED_PASSWORD));

        // If a new score is higher than saved score then update the record
        const dbScore = doesPwCorrect.score;
        if (score0 > dbScore) {
            // update score
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
