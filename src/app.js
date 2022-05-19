const express = require('express');
const morgan = require('morgan');

const api = require('./routes/api');

const app = express();

app.use(morgan('combined'));

app.use(express.json());

app.use('/v1', api); // In case other versions came out, other consumers can still use older versions

module.exports = app;