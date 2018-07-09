
var MongoClient = require('mongodb').MongoClient;
// findPost().then((result)=>{
//   var table = [{"cho":result }];
//
//
// }).catch((e)=>{
//
// });

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
        { $sort : { date:-1 } },
        { $lookup:
          {
            from: 'likeposts',
            localField: '_id',
            foreignField: 'idPost',
            as: 'like_doc'
          }
        }
      ]).toArray(function(err, res) {
        if (err) console.log("Une erreur");
        else
          console.log(res);
          db.close();

      });
    });
