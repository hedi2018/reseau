const express=require('express');
const hbs=require('hbs');
var {mongoose}=require('./assets/db/mongoose');
var {User}=require('./models/users');
var bodyParser = require('body-parser');
var session = require('express-session');
var Twig = require("twig").twig;
var formidable = require('formidable');
var {Post}=require('./models/post');
var qs = require('querystring');
const fileUpload = require('express-fileupload');
var	fs = require("file-system");
var split = require("split");
var path = require("path");
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app){
  var twig = Twig.twig;
  app.use(session({secret: "Shh, c'est un secret!"}));
  app.set('view engine','hbs');
  app.set('view engine','twig');
  app.use(fileUpload());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser({limit: '52428800'}));
  app.use(bodyParser.json());


app.get('/',(req,res)=>{
    app.use(express.static(__dirname + '/assets'));
    app.use(express.static(__dirname + '/images'));
    app.use(express.static(__dirname + '/htmlpages'));

  if(req.session.token && req.session.grade ==="user"){
    var {findPost}=require('./htmlpages/queries/findPosts');
    findPost().then((result)=>{
      var table = [{"cho":result }];

      // console.log(table);
      res.render("./../htmlpages/user/dashboard.hbs",{
        pageTitle : "Accueil",
        userToken : req.session.token,
        posts : table[0],
        userImage : req.session.image,
        users : req.session.name,
        userId : req.session.user
        });
    }).catch((e)=>{
      res.render("./../htmlpages/views/erreur.hbs",{
        erreur :"Une erreur c'est produite , merci d'actualiser la page"
      });
    });

    }else{
      res.render("./../htmlpages/accueil.hbs");
    }
});

app.post('/',(req,res)=>{
  if(req.body.accueil==="Accueil"){
    var {findPost}=require('./htmlpages/queries/findPosts');
    findPost().then((result)=>{
      var table = [{"cho":result }];
      res.render("./../htmlpages/views/accueil.twig",{
        pageTitle : "Accueil",
        userToken : req.session.token,
        posts : table[0],
        userImage : req.session.image,
        users : req.session.name,
        userId : req.session.user
        });
      }).catch((e)=>{
        res.render("./../htmlpages/views/erreur.hbs",{
          erreur :"Une erreur c'est produite , merci d'actualiser la page"
        });
      });
    };

});

app.post("/addPost",(req,res)=>{
  if(req.body.image != null){
    var image = req.body.image ;
    var images = image.split("/");
    images = images[1].split(";")
    var data = image.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    var idImage = new ObjectID()+"." + images[0];
    image = __dirname + '/htmlpages/user/images/'+req.session.name+'/'+idImage ;
    fs.writeFile(image, buf);
  }else{
    var idImage =null;
  }
      var post = new Post();
      post.image = idImage ;
      post.text = req.body.text;
      post.user = new ObjectID(req.session.user);
      post.save().then((post)=>{
        res.render("./../htmlpages/views/detailAcceuil/post.hbs",{
          user : req.session.name,
          imageUser : req.session.image,
          imageId : post.id,
          iteration : req.body.iteration
        });
      });
    });

app.get("/addPost",(req,res)=>{
  res.redirect('/');
});

app.post('/addLike',(req,res)=>{
  var {LikePost}=require('./models/likePost');
  var likePost = new LikePost();
  likePost.idPost = new ObjectID(req.body.post);
  likePost.idUser = new ObjectID(req.session.user);
  likePost.save().then((post)=>{
    res.json("ok");
  });

});

app.get("/addLike",(req,res)=>{
  res.redirect('/');
});

app.post('/addComment',(req,res)=>{
  var {Commentaire}=require('./models/addComment');
  if(req.body.image != null){
    var image = req.body.image ;
    var images = image.split("/");
    images = images[1].split(";")
    var data = image.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    var idImage = new ObjectID()+"." + images[0];
    image = __dirname + '/htmlpages/user/images/'+req.session.name+'/comment/'+idImage ;
    fs.writeFile(image, buf);
  }else{
    var idImage =null;
  }
  var commentaire = new Commentaire();
  commentaire.image = idImage ;
  commentaire.comment = req.body.text;
  commentaire.idUser = new ObjectID(req.session.user);
  commentaire.idPost = new ObjectID(req.body.post);
  commentaire.save().then((post)=>{
    res.render("./../htmlpages/views/detailAcceuil/comment.twig",{
      user : req.session.name,
      imageUser : req.session.image,
      imageId : commentaire.image,
      text : commentaire.comment,
      date: commentaire.date
    });
  });
});

app.get("/addComment",(req,res)=>{
  res.redirect('/');
});

app.put('/ModifierPoste',(req,res)=>{
  var {Post}=require('./models/post');
    Post.findByIdAndUpdate(new ObjectID(req.body.idPost),{text:req.body.text}).then((post)=>{
      if(!post){
        return res.json({
          erreur : "Une erreur c'est produite",
          success : null
        });
      }
      return res.json({
        erreur : null,
        success : post.text
      });
    }).catch((e)=>{
      return res.json({
        erreur : "Une erreur c'est produite",
        success : null
      });
    });
});


app.delete('/SupprimerPoste',(req,res)=>{
  var {Post}=require('./models/post');
  Post.findByIdAndRemove(new ObjectID(req.body.idPost)).then((post)=>{
    if(!post){
      return res.json({
        erreur : "Une erreur c'est produite",
        success : null
      });
    }
    return res.json({
      erreur : null,
      success : "ok"
      });
    }).catch((e)=>{
      return res.json({
        erreur : e,
        success : null
      });
    });
  });

  };
