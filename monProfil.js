const express=require('express');
var {mongoose}=require('./assets/db/mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var Twig = require("twig").twig;
var {Post}=require('./models/post');
var path = require("path");
var ObjectID = require('mongodb').ObjectID;
var split = require("split");
var	fs = require("file-system");

module.exports = function(app){
  var twig = Twig.twig;
  app.use(session({secret: "Shh, c'est un secret!"}));
  app.set('view engine','twig');
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser({limit: '52428800'}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/assets'));
  app.use(express.static(__dirname + '/images'));
  app.use(express.static(__dirname + '/htmlpages'));
app.post('/mon-profil',(req,res)=>{
  if(req.body.accueil==="Mon Profil"){
    var {findUserPosts}=require('./htmlpages/queries/findUserPosts');
    findUserPosts(req.session.user).then((result)=>{
      res.render("./../htmlpages/views/monProfil.twig",{
        posts : result,
        userImage : req.session.image,
        userEmail : req.session.email,
        users : req.session.name,
        userId : req.session.user
      });
    }).catch((e)=>{
      res.render("./../htmlpages/views/erreur.hbs",{
        erreur : e
      });
    })

  };
})
app.get('/mon-profil',(req,res)=>{

});
app.post('/parametre-compte',(req,res)=>{
  if(req.body.accueil==="Parametre Compte"){

    res.render("./../htmlpages/views/setting.twig",{
      userImage : req.session.image,
      userId : req.session.user,
      users : req.session.name,
      userEmail : req.session.email
    });
  };
});

app.post('/changeProfilPic',(req,res)=>{
  var image = req.body.image ;
  var images = image.split("/");
  images = images[1].split(";")
  var data = image.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');
  var idImage = new ObjectID()+"." + images[0];
  image = __dirname + '/images/avatar/'+idImage ;
  fs.writeFile(image, buf);
  var {User}=require('./models/users');
  User.findByIdAndUpdate(new ObjectID(req.body.idUser),{image:idImage}).then((user)=>{
    if(!user){
      return res.json({
        erreur : "Une erreur c'est produite",
        success : null
      });
    }
    return res.json({
      erreur : null,
      success : idImage
    });
  }).catch((e)=>{
    return res.json({
      erreur : "Une erreur c'est produite",
      success : null
    });
  });
});

app.get('/changeProfilPic',(req,res)=>{
  res.redirect('/');
});
app.post('/changeProfilInfos',(req,res)=>{
  var {User}=require('./models/users');
  const bcrypt = require('bcryptjs');
  console.log('next');
  User.findByIdAndUpdate(new ObjectID(req.body.Iduser),{user:req.body.user,email:req.body.email}).then((user)=>{
    if(!user){
      return res.json({
        erreur : "Une erreur c'est produite",
        success : null
      });
    }
    console.log('next');
    return res.json({
      erreur : null,
      success : "Modifier avec succée"
    });
  }).catch((e)=>{
    console.log(e);
    return res.json({
      erreur : "Une erreur c'est produite",
      success : null
    });
  });
});
app.get('/changeProfilInfos',(req,res)=>{
  res.redirect('/');
});
};
