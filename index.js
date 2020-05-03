const express = require('express');

const routes = require('./routes/index');

const app = express();

app.use('/api', routes);

app.set('json spaces', 2);

app.use((req, res) => {
  res.status(404)
    .send('Unknown Request');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
