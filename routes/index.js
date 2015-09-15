var express = require('express');
var router = express.Router();
var multer  = require('multer');
var nodemailer = require('nodemailer');

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
    console.log(req.body); 
    console.log("/////////"); 
    console.log(req.file);

    req.body.pic="./images/"+req.file.filename;        
    var cover= new Cover(req.body);
    cover.save(function(err, cover){
        if(err){ return next(err); }
        res.json(cover);
    });   
});


router.post('/mail', function(req, res, next){
     
  var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'edwardlai3582@gmail.com', // Your email id
            pass: 'dragonash' // Your password
        }
  });
    
    //Mail options
  var mailOpts = {
      //from: req.body.name + ' &lt;' + req.body.mailaddress + '&gt;', //grab form data from the request body object
      to: 'edwardlai3582@gmail.com',
      subject: 'Website contact form',
      text: 'from: '+req.body.name + '\n'+'address: ' + req.body.mailaddress + '\n'+'message: '+req.body.message
  };
  console.log('wtf');
  console.log(req.body);     
    
  transporter.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
          console.log(error);
          res.json(error);
      }
      //Yay!! Email sent
      else {
          console.log("sent");
          res.json("thanks");
      }
      transporter.close();
  });    
});

///////////////////////////////////////////////////
module.exports = router;
