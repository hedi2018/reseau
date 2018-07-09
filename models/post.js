const mongoose = require('mongoose');


var ObjectId = mongoose.Schema.ObjectId;
var PostSchema = new mongoose.Schema({
  user : {
    type: ObjectId,
    default : null
  },
  image: {
    type:String
  },
  text : {
    type:String
  },
  date : {
    type: Date,
    default : Date.now
  }
});

var checkPost = function(id){
  MongoClient.connect('mongodb://localhost:27017/chieuse',(err,db)=>{
    if(err){
      return console.log('Unable to connect to server');
    }
  });

  db.collection('post').find({
    _id: id
  }).toArray().then((docs)=>{
    db.close();
    return true ;

  },(err)=>{
    return false
  });
};



var Post = mongoose.model('Post', PostSchema);
module.exports = {checkPost,Post};
