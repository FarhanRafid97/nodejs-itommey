require('dotenv').config();

const cors = require('cors');
const express = require('express');
const swaggerUI = require('swagger-ui-express');

const swaggerJSON = require('./docs/openapi.json');

const router = require('./route');

const app = express();

app.use(cors());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

module.exports = { app };
