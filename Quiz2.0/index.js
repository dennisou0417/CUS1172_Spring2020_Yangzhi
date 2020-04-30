const express = require('express');
const bodyParser = require('body-parser')

const data = require('./db.json');

const app = express();

app.get('/questions', (req, res) => {
  res.send(data);
});

app.use((req, res) => {
  res.status(404)
    .send('Unknown Request');
});

app.listen(8080, () => {
  console.log('App is listening on port 8080');
});
