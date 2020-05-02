const express = require('express');

const router = express.Router();

const data = require('../db.json');

router.get('/quiz/list', function(req,res){
  res.json(data.list);
})

router.get('/quiz/:quizid', function(req,res){
  var quizid = req.params['quizid'];

  req_quizid = data.list.filter(q => q.quizid == quizid);
  res.json(req_quizid);
});

router.get('/quiz/:quizid/:questionid', function(req,res){
  var quizid = req.params['quizid'];
  var questionid = req.params['questionid'];

  req_quizid = data.data.filter(q => q.quizid == quizid);
  req_questionid = data.data.filter(q => q.id == questionid);

  if(quizid == "1" && questionid == "first"){
    res.json(data.data.filter(q => q.id == "100"));
  }else if (quizid == "2" && questionid == "first"){
    res.json(data.data.filter(q => q.id == "200"));
  }else{
    res.json(req_questionid);
  }

});

module.exports = router;
