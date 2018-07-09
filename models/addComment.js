const mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;

var commentPostSchema = new mongoose.Schema({
  idPost : {
    type : ObjectId
  },
  idUser : {
    type : ObjectId
  },
  comment : {
    type : String
  },
  image: {
    type:String
  },
  date : {
    type: Date,
    default : Date.now
  }
});

var Commentaire = mongoose.model('Commentaire', commentPostSchema);
module.exports = {Commentaire};
