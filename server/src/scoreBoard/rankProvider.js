"use strick";

// Library
const mysql = require("mysql2/promise");
const myDB = require("../lib/dbSecret");
const pool = mysql.createPool(myDB);

// Dao
const rankDao = require("./rankDao");

module.exports = {};
