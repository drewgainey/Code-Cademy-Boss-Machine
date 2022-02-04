const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./minions');

app.use('/minions', minionsRouter);


module.exports = apiRouter;
