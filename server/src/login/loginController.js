"use strick";

const sanitizeHTML = require("sanitize-html");

const { response, errResponse, Message } = require("../lib/responseMessage");
const loginProvider = require("./loginProvider");

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
        const doesNicknameExist = await loginProvider.checkNickname(nickname0);
        if (!doesNicknameExist) {
            const createRecordResult = await loginProvider.createRecord(nickname0, password0, score0);
            return res.send(response(Message.SUCCESS_CREATE, { insertId: createRecordResult }));
        }

        // If the password isn't that user's password send an erorr message
        const no = doesNicknameExist.no;
        const doesPwCorrect = await loginProvider.checkPassword(no, password0);
        if (!doesPwCorrect) return res.send(errResponse(Message.NOT_MATCHED_PASSWORD));

        // If a new score is higher than saved score then update the record
        const dbScore = doesPwCorrect.score;
        if (score0 > dbScore) {
            const updateRecordResult = await loginProvider.updateRecord(no, score0);
            return res.send(response(Message.SUCCESS_UPDATE, { savedScore: dbScore, newScore: score0 }));
        }
        return res.send(response(Message.SUCCESS, { savedScore: dbScore }));

        //TODO: redirection -> [GET] /ranks
    } catch (error) {
        console.log(error);
        return res.send(errResponse(Message.SERVER_ERROR));
    }
};

module.exports = {
    login,
};
