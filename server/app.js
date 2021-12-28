"use strict";
const express = require("express");
const app = express();
const PORT = 3000;

// Response message
const response = ({ isSuccess, code, message }, result) => {
    return { isSuccess, code, message, result: result };
};
const errResponse = ({ isSuccess, code, message }) => {
    return { isSuccess, code, message };
};
const Message = {
    // success
    SUCCESS: { isSuccess: true, code: 2000, message: "Successed" },
    // validation
    EMPTY_NICKNAME: { isSuccess: false, code: 3000, message: "Nickname is required." },
    EMPTY_PASSWORD: { isSuccess: false, code: 3001, message: "Password is required." },
    NOT_MATCHED_PASSWORD: { isSuccess: false, code: 3002, message: "It's a wrong password." },
    // Error
    SERVER_ERROR: { isSuccess: false, code: 5000, message: "Server Error" },
};

// Controller
const login = async function (req, res) {
    const { nickname, password, score } = req.body;

    // if (!nickname) return res.send();
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
