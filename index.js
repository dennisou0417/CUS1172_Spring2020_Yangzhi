const express = require('express');

const routes = require('./routes/index');

const app = express();

app.get('/', (req, res) => {
  res.send('use /api/quiz/list or /api/quiz/:quizid or /api/quiz/:quizid/:questionid or /api//check_answer/:quizid/:questionid/:answer');
})

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
