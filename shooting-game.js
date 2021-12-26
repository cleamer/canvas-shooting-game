"use strict";
const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

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

class Player extends Circle {
    constructor(x, y, r, color) {
        super(x, y, r, color);
        this.score = 0;
    }
}

// Player instance
const playerLocX = canvas.width / 2;
const playerLocY = canvas.height / 2;
const playerSize = 10;
const playerColor = "white";
const player = new Player(playerLocX, playerLocY, playerSize, playerColor);
player.draw();
