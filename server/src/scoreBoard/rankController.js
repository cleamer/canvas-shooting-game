"use strick";

const sanitizeHTML = require("sanitize-html");

const { response, errResponse, Message } = require("../lib/responseMessage");
const rankProvider = require("./rankProvider");

const getScoreBoard = async function (req, res) {
    const top10List = await rankProvider.getTop10List();
    if (top10List.length < 1) return res.send(errResponse(Message.DB_NO_RECORD_ERROR));
    return res.send(response(Message.SUCCESS_READ, top10List));
};
const getMyRank = async function (req, res) {};
module.exports = {
    getScoreBoard,
    getMyRank,
};
