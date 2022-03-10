'use strict';
const { errResponse, Message } = require('../src/lib/responseMessage');

module.exports = function () {
  const express = require('express');
  const app = express();
  app.set('port', process.env.PORT || 3000);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // for ajax on localhost
  app.use(require('cors')());

  require('./router')(app);

  // Error middleware
  app.use((req, res, next) => res.send(errResponse(Message.INVALID_URI)));
  app.use((err, req, res, next) => res.send(errResponse(Message.SERVER_ERROR)));

  return app;
};
