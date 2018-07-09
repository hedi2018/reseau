var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

module.exports = {
 findUserPosts : function(id) {

   return new Promise(function(resolve, reject){
     MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
    if (err) throw err;
     var dbo = db.db("TodoApp");
     dbo.collection("posts").find({
       user : new ObjectID(id)
     }).sort({date:-1}).toArray(function(err, res) {
       if (err) reject("Une erreur s'est produite");
       else
         db.close();
         resolve(res);
     });
   });
   });
}
}
