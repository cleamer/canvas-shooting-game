"use strict";
const express = require("express");
const app = express();
const PORT = 3000;

// Controller
const login = async function (req, res) {
    const { nickname, password, score } = req.body;
    res.send(
        `nickname: ${nickname}
    password: ${password}
    score: ${score}`
    );
};

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route
app.post("/login", login);

// Listen
app.listen(PORT, () => {
    console.log(`API-server is listening at port: ${PORT}`);
});
