var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ 
    dest: 'public/images/',
    rename: function (fieldname, filename) {
      return filename;
    },
});

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

router.post('/covers', upload.single('pic'), function (req, res, next) {  
//請注意，這裡的userPhoto要跟你上傳欄位的name相符合，否則會一直出現 field unexpected的訊息，非常重要，之前我死在這邊很多次 ：(
console.log(req.body); 
console.log("/////////"); 
console.log(req.file); //你上傳的資料就會變成文字紀錄於你的req.file裡頭囉

req.body.pic="./images/"+req.file.filename;        
var cover= new Cover(req.body);
cover.save(function(err, cover){
    if(err){ return next(err); }

    res.json(cover);
});
    
})

/*
router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});
*/


module.exports = router;
