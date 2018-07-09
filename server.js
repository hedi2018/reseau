const express=require('express');
const hbs=require('hbs');
var {mongoose}=require('./assets/db/mongoose');
var rn = require('random-number');
var {User}=require('./models/users');
var ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var session = require('express-session');


var app =express();
require('./accueil')(app);
require('./monProfil')(app);
app.disable('x-powered-by');
hbs.registerPartials(__dirname + '/htmlpages/user/partials');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret: "Shh, c'est un secret!", cookie: { maxAge: 60000 }}));
app.set('view engine','hbs');

const port=process.env.PORT || 3000 ;

app.get('/signup',(req,res)=>{
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/htmlpages'));
  res.render('./../htmlpages/register.hbs',{
    pageTitle : "Sign Up"
  });
});

app.post('/signup',(req,res)=>{
  var options = {
  min:  0
, max:  100000
, integer: true
}
var num=rn(options);
var user = new User();
user.user = "utlisateur"+num;
user.number = num ;
user.email = req.body.email;
user.password = req.body.pwd;
user.save().then(()=>{
  user.generateAuthToken();
  res.json("ok");
}).catch((e)=>{
  console.log(e);
});

});

app.get('/login',(req,res)=>{
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/htmlpages'));

res.render('./../htmlpages/login.hbs',{
  pageTitle : "Log In"
});
})

app.post('/login',(req,res)=>{

  User.findByCredentials(req.body.email,req.body.pwd).then((user)=>{
    req.session.token = user.tokens[0].token;
    req.session.name = user.user;
    req.session.image = user.image ;
    req.session.email = user.email ;
    req.session.user = user.id ;
    req.session.grade = user.tokens[0].access;

    res.json("ok");
  }).catch((e)=>{
    res.json(e);
  });

})

app.listen(port,()=>{
  console.log(`Started on port ${port}`);
});

module.exports ={app};
