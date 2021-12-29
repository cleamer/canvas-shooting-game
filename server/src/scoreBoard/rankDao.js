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
const dbSelectRankingScorePlayer = async function (connection, nickname) {
    const selectRankingScoreQuery = `
        select ranking, score
        from (select rank() over (order by score desc) as ranking, nickname, score
            from Player
            limit 10) a
        where nickname = ?;
        `;
    const [rankingScoreFromNicknameResult] = await connection.query(selectRankingScoreQuery, nickname);
    return rankingScoreFromNicknameResult;
};

module.exports = { dbSelectTop10Player, dbSelectRankingScorePlayer };
