"use strick";

const dbSelectTop10Player = async function (connection) {
    const selectTop10Query = `
        select rank() over (order by score desc) as ranking, nickname, score
        from Player
        limit 10;
        `;
    const [rankNicknameScoreResult] = await connection.query(selectTop10Query);
    return rankNicknameScoreResult;
};

module.exports = { dbSelectTop10Player };
