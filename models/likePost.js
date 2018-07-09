const mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;

var LikePostSchema = new mongoose.Schema({
  idPost : {
    type : ObjectId
  },
  idUser : {
    type : ObjectId
  }
});
var LikePost = mongoose.model('LikePost', LikePostSchema);
module.exports = {LikePost};
