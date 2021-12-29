"use strick";

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
const dbUpdatePlayer = async function (connection, no, score) {
    const params = [score, no];
    const updatePlayerQuery = `
    update Player set score = ? where no = ?
    `;
    const [updateResult] = await connection.query(updatePlayerQuery, params);
    return updateResult;
};

module.exports = {
    dbNicknameExist,
    dbPasswordMatch,
    dbInsertPlayer,
    dbUpdatePlayer,
};
