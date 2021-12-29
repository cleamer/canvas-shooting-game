"use strict";

const express = require("express");
module.exports = function () {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    require("./router")(app);

    return app;
};
