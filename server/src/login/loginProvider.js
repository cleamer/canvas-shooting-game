"use strick";

// Library
const mysql = require("mysql2/promise");
const myDB = require("../lib/dbSecret");
const pool = mysql.createPool(myDB);

// Dao
const loginDao = require("./loginDao");

const checkNicknameForNo = async function (nickname) {
    const connection = await pool.getConnection(async (conn) => conn);
    const checkNicknameResult = await loginDao.dbNicknameExist(connection, nickname);
    connection.release();
    return checkNicknameResult[0];
};
const checkPasswordForScore = async function (no, password) {
    const connection = await pool.getConnection(async (conn) => conn);
    const checkPasswordResult = await loginDao.dbPasswordMatch(connection, no, password);
    connection.release();
    return checkPasswordResult[0];
};
const createRecord = async function (nickname, password, score) {
    const connection = await pool.getConnection(async (conn) => conn);
    const insertPlayerResult = await loginDao.dbInsertPlayer(connection, nickname, password, score);
    connection.release();
    return insertPlayerResult.insertId;
};
const updateRecord = async function (no, score) {
    const connection = await pool.getConnection(async (conn) => conn);
    const updatePlayerResult = await loginDao.dbUpdatePlayer(connection, no, score);
    connection.release();
    return updatePlayerResult.info;
};

module.exports = {
    checkNicknameForNo,
    checkPasswordForScore,
    createRecord,
    updateRecord,
};
