const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { downloadFile, generateNumbers } = require('./controllers');
const { validateId, validateTotal, validateMethod } = require('./middlewares');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all(
  '/api/v1/phone-numbers/:id',
  validateMethod('GET'),
  validateId,
  downloadFile
);
app.all(
  '/api/v1/phone-numbers',
  validateMethod('POST'),
  validateTotal,
  generateNumbers
);

app.get('*', (_, res) =>
  res.sendFile(path.join(path.dirname(__dirname), 'client/public/index.html'))
);

app.use((err, req, res, next) => {
  res.status(500).send({ error: { message: err.message } });
});

module.exports = app;
