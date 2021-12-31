"use strict";

module.exports = function () {
    const express = require("express");
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // for ajax on localhost
    const cors = require("cors");
    app.use(cors());

    require("./router")(app);

    return app;
};
