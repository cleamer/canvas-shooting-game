"use strict";
// Express
const express = require("./config/express");
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`API-server is listening at port: ${PORT}`);
});
