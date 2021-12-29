"use strick";

const { response, errResponse, Message } = require("../lib/responseMessage");
const rankProvider = require("./rankProvider");

const getScoreBoard = async function (req, res) {
    const top10List = await rankProvider.getTop10List();
    if (top10List.length < 1) return res.send(errResponse(Message.DB_NO_RECORD_ERROR));
    return res.send(response(Message.SUCCESS_READ, top10List));
};
const getMyRank = async function (req, res) {
    const nickname = req.query.nickname;

    if (!nickname) return res.send(errResponse(Message.EMPTY_NICKNAME));
    if (nickname.length < 4 || nickname.length > 8) return res.send(errResponse(Message.LENGTH_NICKNAME));

    const doesNicknameExistForRankingScore = await rankProvider.checkNicknameForRankingScore(nickname);
    if (!doesNicknameExistForRankingScore) return res.send(errResponse(Message.NOT_MATCHED_NICKNAEM));
    const getMyRankresult = {
        ranking: doesNicknameExistForRankingScore.ranking,
        nickname,
        score: doesNicknameExistForRankingScore.score,
    };
    return res.send(response(Message.SUCCESS_READ, getMyRankresult));
};
module.exports = {
    getScoreBoard,
    getMyRank,
};
