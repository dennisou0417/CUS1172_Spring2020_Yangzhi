const express = require('express');

const router = express.Router();

const data = require('../db.json');


router.get('/quiz/:quizid', function(req,res){
  var quizid = req.params['quizid'];

  req_id = data["html"].filter(q => q.id == quizid);
  res.json(req_id);
});

router.get('/quiz/:quizid/:questionid', function(req,res){
  res.send('Thank you for visiting the page! See you again soon');
});

module.exports = router;
