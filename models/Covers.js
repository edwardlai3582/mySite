var mongoose = require('mongoose');

var CoverSchema = new mongoose.Schema({
  artist: String,
  name: String,
  pic: String,
  link: String,
  starttime: Number,
  endtime: Number
});

mongoose.model('Cover', CoverSchema);