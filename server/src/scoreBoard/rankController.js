"use strick";

const sanitizeHTML = require("sanitize-html");

const { response, errResponse, Message } = require("../lib/responseMessage");
const rankProvider = require("./rankProvider");

const getScoreBoard = async function (req, res) {};
const getMyRank = async function (req, res) {};
module.exports = {
    getScoreBoard,
    getMyRank,
};
