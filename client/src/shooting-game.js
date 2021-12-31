"use strict";
// DOM element
const inGameScoreSpan = document.getElementById("in-game-score");
const scoreDiv = document.getElementById("score-div");
const scoreResultH1 = document.getElementById("game-score");
const startBtn = document.getElementById("start-btn");
const saveBtn = document.getElementById("save-btn");

const loginDiv = document.getElementById("login-div");
const loginBtn = document.getElementById("login-btn");

const scoreBoardDiv = document.getElementById("score-board-div");
const boardStartBtn = document.getElementById("board-start-btn");
const nicknameInput = document.getElementById("nickname-input");
const passwordInput = document.getElementById("password-input");
const table = document.getElementById("score-board");
const myRankH1 = document.getElementById("my-rank");

//canvas
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// CSS class constant
const HIDDEN = "hidden";

/*
 * CLASS
 */

class Circle {
    constructor(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        c.fillStyle = this.color;
        c.fill();
    }
}

// player
const playerSize = 20;
const playerColor = "white";
class Player extends Circle {
    constructor(x, y, r, color) {
        super(x, y, r, color);
        this.score = 0;
    }
}

// bullet
const bulletSpeed = 6;
const bulletSize = 5;
const bulletColor = "white";
class Bullet extends Circle {
    constructor(x, y, r, color, directionVector) {
        super(x, y, r, color);
        this.dV = directionVector;
        this.speed = bulletSpeed;
    }
    update() {
        this.x += this.speed * this.dV.x;
        this.y += this.speed * this.dV.y;
        this.draw();
    }
}

// enemy
const enemySpeedInit = 1.4;
let enemySpeed = enemySpeedInit;
const enemySizeMin = 30;
const enemySizeMax = 10;
class Enemy extends Circle {
    constructor(x, y, r, color, directionVector) {
        super(x, y, r, color);
        this.dV = directionVector;
        this.speed = enemySpeed;
    }
    update() {
        this.x += this.speed * this.dV.x;
        this.y += this.speed * this.dV.y;
        this.draw();
    }
}

// particle
const friction = 0.99;
const particleSpeed = 5;
const particleSizeMax = 3;
class Particle extends Circle {
    constructor(x, y, r, color, directionVector) {
        super(x, y, r, color);
        this.dV = directionVector;
        this.speed = particleSpeed;
        this.alpha = 0.8;
    }
    update() {
        c.save();
        c.globalAlpha = this.alpha;
        this.draw();
        c.restore();
        this.x += friction * this.speed * this.dV.x;
        this.y += friction * this.speed * this.dV.y;
        this.alpha -= 0.01;
    }
}

/*
 * INSTANCE
 */

// Player instance
const playerLoc = { x: canvas.width / 2, y: canvas.height / 2 };
const player = new Player(playerLoc.x, playerLoc.y, playerSize, playerColor);

// Bullets instance
let bullets = [];

// Enemies instance
let enemies = [];

// Particles instance
let particles = [];

/*
 * FUNCTIONS
 */
const getDirection = (fromX, fromY, toX, toY) => {
    const angle = Math.atan2(toY - fromY, toX - fromX);
    return {
        x: Math.cos(angle),
        y: Math.sin(angle),
    };
};

const init = () => {
    scoreDiv.classList.add(HIDDEN);
    inGameScoreSpan.innerHTML = 0;
    player.score = 0;
    bullets = [];
    enemies = [];
    particles = [];
    enemySpeed = enemySpeedInit;
};

let spawnInterver = null;
const spawnEnemies = () => {
    const spawnInterverTime = 1000;
    spawnInterver = setInterval(() => {
        const enemyR = enemySizeMin + (enemySizeMax - enemySizeMin) * Math.random();
        const enemyLoc = { x: null, y: null };
        if (Math.random() < 0.5) {
            enemyLoc.x = Math.random() < 0.5 ? -enemyR : canvas.width + enemyR;
            enemyLoc.y = Math.random() * canvas.height;
        } else {
            enemyLoc.x = Math.random() * canvas.width;
            enemyLoc.y = Math.random() < 0.5 ? -enemyR : canvas.height + enemyR;
        }
        const enemyDirection = getDirection(enemyLoc.x, enemyLoc.y, playerLoc.x, playerLoc.y);
        const enemyColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
        const enemy = new Enemy(enemyLoc.x, enemyLoc.y, enemyR, enemyColor, enemyDirection);
        enemies.push(enemy);
    }, spawnInterverTime);
};

const backgroundColor = "rgba(0,0,0,0.1)";
let animationId = null;
const animate = () => {
    animationId = requestAnimationFrame(animate);

    // background
    c.fillStyle = backgroundColor;
    c.fillRect(0, 0, canvas.width, canvas.height);

    // player
    player.draw();

    // bullets
    bullets.forEach((bullet, bulletIdx) => {
        bullet.update();

        // remove bullets out of canvas
        if (
            bullet.x - bulletSize < 0 ||
            bullet.x + bulletSize > canvas.width ||
            bullet.y - bulletSize < 0 ||
            bullet.y + bulletSize > canvas.height //
        ) {
            bullets.splice(bulletIdx, 1);
        }
    });

    // enemies
    enemies.forEach((enemy, enemyIdx) => {
        enemy.update();

        // Crash enemy to player -> Game Over
        const distEnemyPlayer = Math.hypot(enemy.x - playerLoc.x, enemy.y - playerLoc.y);
        if (distEnemyPlayer < enemy.r + playerSize + 1) {
            cancelAnimationFrame(animationId);
            clearInterval(spawnInterver);
            scoreResultH1.innerHTML = player.score;
            if (player.score > 0) saveBtn.classList.remove(HIDDEN);
            else saveBtn.classList.add(HIDDEN);
            scoreDiv.classList.remove(HIDDEN);
        }

        // Crash bullet to enemy
        bullets.forEach((bullet, bulletIdx) => {
            const distEnemybullet = Math.hypot(enemy.x - bullet.x, enemy.y - bullet.y);
            if (distEnemybullet < enemy.r + bulletSize + 1) {
                setTimeout(() => {
                    // make particles
                    for (let i = 0; i < enemy.r; i++) {
                        particles.push(
                            new Particle(
                                bullet.x,
                                bullet.y,
                                particleSizeMax * Math.random(),
                                enemy.color,
                                {
                                    x: (Math.random() - 0.5) * Math.random(),
                                    y: (Math.random() - 0.5) * Math.random(),
                                } //
                            )
                        );
                    }

                    // remove bullet crashed to enemy
                    bullets.splice(bulletIdx, 1);

                    // remove or resize enemy
                    if (enemy.r < 20) {
                        enemies.splice(enemyIdx, 1);
                        gsap.to(enemy, {
                            r: enemy.r - 10,
                        });
                        enemySpeed += 0.02;
                        player.score += 100;
                        inGameScoreSpan.innerHTML = player.score;
                    } else {
                        enemy.r -= 10;
                        enemySpeed += 0.013;
                        player.score += 50;
                        inGameScoreSpan.innerHTML = player.score;
                    }
                }, 0);
            }
        });
    });

    // Particles
    particles.forEach((particle, particleIdx) => {
        if (particle.alpha < 0) particles.splice(particleIdx, 1);
        else particle.update();
    });
};

const startGame = () => {
    init();
    spawnEnemies();
    animate();
};

/*
 * EVENTS
 */

window.addEventListener("click", (e) => {
    const directionVector = getDirection(playerLoc.x, playerLoc.y, e.clientX, e.clientY);
    const bullet = new Bullet(playerLoc.x, playerLoc.y, bulletSize, bulletColor, directionVector);
    bullets.push(bullet);
});

startBtn.addEventListener("click", startGame);

boardStartBtn.addEventListener("click", () => {
    scoreBoardDiv.classList.add(HIDDEN);
    startGame();
});

saveBtn.addEventListener("click", () => {
    scoreDiv.classList.add(HIDDEN);
    loginDiv.classList.remove(HIDDEN);
});

// Ajax
async function postLogin(nickname, password, score) {
    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, password, score }),
    });
    if (!res.ok) throw new Error("Login Ajax Error!");
    const result = await res.json();
    return result;
}
async function getScoreBoard() {
    const res = await fetch("http://localhost:3000/score-board");
    if (!res.ok) throw new Error("Get Score Board Ajax Error!");
    const result = await res.json();
    return result;
}
function drawRecord(record) {
    const tr = document.createElement("tr");
    const tdRank = document.createElement("td");
    const tdNickname = document.createElement("td");
    const tdScore = document.createElement("td");
    tdRank.innerHTML = record.ranking;
    tdNickname.innerHTML = record.nickname;
    tdScore.innerHTML = record.score;

    tr.append(tdRank, tdNickname, tdScore);
    table.appendChild(tr);
}

async function loginBtnHandler() {
    const postNickname = nicknameInput.value;
    const postPassword = passwordInput.value;
    const postScore = parseInt(inGameScoreSpan.innerHTML);
    try {
        const loginResult = await postLogin(postNickname, postPassword, postScore);
        if (loginResult.isSuccess) {
            /*
            SUCCESS_LOW_SCORE: { isSuccess: true, code: 2000, message: "Less than saved score." },
            SUCCESS_CREATE: { isSuccess: true, code: 2001, message: "It has been successed to create a new user." },
            SUCCESS_UPDATE: { isSuccess: true, code: 2002, message: "It has been successed to update the new user." },
            */
            const scoreBoardResult = await getScoreBoard();
            if (scoreBoardResult.isSuccess) {
                // SUCCESS_READ: { isSuccess: true, code: 2003, message: "Data has been received successfully." },
                const records = scoreBoardResult.result;
                table.innerHTML = "<tr><th>Rank</th><th>Nickname</th><th>score</th></tr>";
                records.forEach((record) => {
                    if (record.nickname === postNickname) myRankH1.innerHTML = `Rank: ${record.ranking}`;
                    drawRecord(record);
                });
            } else {
                /*
                NOT_MATCHED_NICKNAEM: { isSuccess: false, code: 4001, message: "There is no record by that nickname." },
                DB_NO_RECORD_ERROR: { isSuccess: false, code: 5001, message: "There is no record!" },
                */
            }
        } else {
            /*
            // Validation Error
            EMPTY_NICKNAME: { isSuccess: false, code: 3000, message: "Nickname is required." },
            EMPTY_PASSWORD: { isSuccess: false, code: 3001, message: "Password is required." },
            LENGTH_NICKNAME: { isSuccess: false, code: 3002, message: "Nickname must be between 4 and 8 letters long." },
            LENGTH_PASSWORD: { isSuccess: false, code: 3003, message: "Password must be between 4 and 10 letters long." },
            NAN_SCORE: { isSuccess: false, code: 3004, message: "Score is not a number." },
            // Wrong
            NOT_MATCHED_PASSWORD: { isSuccess: false, code: 4000, message: "It's a wrong password." },
            // Error
            SERVER_ERROR: { isSuccess: false, code: 5000, message: "Server Error!" },
            */
        }
    } catch (error) {
        // TODO: fetch ERROR: ex) server is not running
        console.log(error);
    }

    loginDiv.classList.add(HIDDEN);
    scoreBoardDiv.classList.remove(HIDDEN);
}

loginBtn.addEventListener("click", loginBtnHandler);
