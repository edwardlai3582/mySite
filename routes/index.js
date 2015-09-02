var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Cover = mongoose.model('Cover');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/covers', function(req, res, next) {
  Cover.find(function(err, covers){
    if(err){ return next(err); }

    res.json(covers);
  });
});

module.exports = router;
