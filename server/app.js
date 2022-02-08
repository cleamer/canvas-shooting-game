"use strict";

const express = require("./config/express");
const app = express();
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`API-server is listening at port: ${app.get("port")}`);
});
