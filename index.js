require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./route');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

module.exports = { app };
