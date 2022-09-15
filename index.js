require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./route');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on http://localhost:${port}`);
});
