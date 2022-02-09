"use strict";

const express = require("./config/express");
const app = express();

app.listen(app.get("port"), () => {
  console.log(`API-server is listening at port: ${app.get("port")}`);
});
