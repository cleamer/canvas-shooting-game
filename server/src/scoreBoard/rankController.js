'use strick';

const { response, errResponse, Message } = require('../lib/responseMessage');
const rankProvider = require('./rankProvider');

const getScoreBoard = async function (req, res) {
  try {
    const top10List = await rankProvider.getTop10List();
    if (top10List.length < 1) return res.json(errResponse(Message.DB_NO_RECORD_ERROR));
    return res.json(response(Message.SUCCESS_READ, top10List));
  } catch (error) {
    console.log(error);
    return res.json(errResponse(Message.SERVER_ERROR));
  }
};
const getMyRank = async function (req, res) {
  try {
    const nickname = req.params.nickname;
    if (!nickname) return res.json(errResponse(Message.EMPTY_NICKNAME));
    if (nickname.length < 4 || nickname.length > 8) return res.json(errResponse(Message.LENGTH_NICKNAME));

    const doesNicknameExistForRankingScore = await rankProvider.checkNicknameForRankingScore(nickname);
    if (!doesNicknameExistForRankingScore) return res.json(errResponse(Message.NOT_MATCHED_NICKNAEM));
    const getMyRankresult = {
      ranking: doesNicknameExistForRankingScore.ranking,
      nickname,
      score: doesNicknameExistForRankingScore.score,
    };
    return res.json(response(Message.SUCCESS_READ, getMyRankresult));
  } catch (error) {
    console.log(error);
    return res.json(errResponse(Message.SERVER_ERROR));
  }
};
module.exports = {
  getScoreBoard,
  getMyRank,
};
