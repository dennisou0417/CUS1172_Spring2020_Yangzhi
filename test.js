const express = require('express');

const router = express.Router();

router.get('/welcome', function(req,res){
  res.send('Welcome new user!');
});

router.get('/goodbye', function(req,res){
  res.send('Thank you for visiting the page! See you again soon');
});

module.exports = router;
