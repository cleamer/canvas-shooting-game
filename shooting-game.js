"use strict";
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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

// player setting
const playerSize = 20;
const playerColor = "white";
class Player extends Circle {
    constructor(x, y, r, color) {
        super(x, y, r, color);
        this.score = 0;
    }
}

// bullet setting
const bulletSpped = 6;
const bulletSize = 5;
const bulletColor = "white";
class Bullet extends Circle {
    constructor(x, y, r, color, directionVector) {
        super(x, y, r, color);
        this.dV = directionVector;
        this.speed = bulletSpped;
    }
    update() {
        this.x += this.speed * this.dV.x;
        this.y += this.speed * this.dV.y;
        this.draw();
    }
}

// Player instance
const playerLocX = canvas.width / 2;
const playerLocY = canvas.height / 2;
const player = new Player(playerLocX, playerLocY, playerSize, playerColor);

// Bullets instance
const bullets = [];

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
};
animate();

const getDirection = (fromX, fromY, toX, toY) => {
    const angle = Math.atan2(toY - fromY, toX - fromX);
    return {
        x: Math.cos(angle),
        y: Math.sin(angle),
    };
};

window.addEventListener("click", (e) => {
    const directionVector = getDirection(playerLocX, playerLocY, e.clientX, e.clientY);
    const bullet = new Bullet(playerLocX, playerLocY, bulletSize, bulletColor, directionVector);
    bullets.push(bullet);
});
