var MongoClient = require('mongodb').MongoClient;

module.exports = {
 findPost : function() {
  return new Promise(function(resolve, reject){
    MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
        if (err) throw err;
        var dbo = db.db("TodoApp");

        dbo.collection('posts').aggregate([
            { $lookup:
              {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'posts_doc'
              }
            },
            { $lookup:
              {
                from: 'likeposts',
                localField: '_id',
                foreignField: 'idPost',
                as: 'like_doc'
              }
            },
            { $lookup:
              {
                from: 'commentaires',
                localField: '_id',
                foreignField: 'idPost',
                as: 'comment_doc'
              }
            },
            { $sort : { date:-1 } }
          ]).toArray(function(err, res) {
            if (err) reject("Une erreur");
            else
              var res = res;
              db.close();
              resolve(res);
          });
        });
      });
    }
};
