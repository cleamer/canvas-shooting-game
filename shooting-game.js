"use strict";
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
const enemySpeed = 1.4;
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

/*
 * INSTANCE
 */

// Player instance
const playerLoc = { x: canvas.width / 2, y: canvas.height / 2 };
const player = new Player(playerLoc.x, playerLoc.y, playerSize, playerColor);

// Bullets instance
const bullets = [];

// Enemies instance
const enemies = [];

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
spawnEnemies();

const backgroundColor = "rgba(0,0,0,0.1)";
const animate = () => {
    requestAnimationFrame(animate);

    // background
    c.fillStyle = backgroundColor;
    c.fillRect(0, 0, canvas.width, canvas.height);

    // player
    player.draw();

    // bullets
    bullets.forEach((bullet, bulletIdx) => {
        bullet.update();
    });

    // enemies
    enemies.forEach((enemy, enemyIdx) => {
        enemy.update();
    });
};
animate();

/*
 * EVENTS
 */

window.addEventListener("click", (e) => {
    const directionVector = getDirection(playerLoc.x, playerLoc.y, e.clientX, e.clientY);
    const bullet = new Bullet(playerLoc.x, playerLoc.y, bulletSize, bulletColor, directionVector);
    bullets.push(bullet);
});
