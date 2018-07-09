const {MongoClient, ObjectID}=require('mongodb');
MongoClient.connect('mongodb://localhost:27017/chieuse',(err,db)=>{
  if(err){
    return console.log('Unable to connect to server');
  }
  console.log('Connected to server');
  db.close();
});
