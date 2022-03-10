'use strick';

// Library
const mysql = require('mysql2/promise');
const myDB = require('../lib/dbSecret');
const pool = mysql.createPool(myDB[process.env.NODE_ENV]);

// Dao
const rankDao = require('./rankDao');

const getTop10List = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectTop10PlayerResult = await rankDao.dbSelectTop10Player(connection);
  connection.release();
  return selectTop10PlayerResult;
};
const checkNicknameForRankingScore = async function (nickname) {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectRankingScoreResult = await rankDao.dbSelectRankingScorePlayer(connection, nickname);
  connection.release();
  return selectRankingScoreResult[0];
};

module.exports = { getTop10List, checkNicknameForRankingScore };
