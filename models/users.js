const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _=require('lodash');
const bcrypt = require('bcryptjs');
const {MongoClient, ObjectID}=require('mongodb');


var UserSchema = new mongoose.Schema({
    user:{
      type:String,
      unique : true
    },
    image:{
      type:String,
      default:"default.jpg"
    },
    number:{
      type:Number,
      unique : true
    },
    email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  date : {
    type: Date,
    default : Date.now
  },
  valide : {
    type: Boolean,
    default : true
  },
  active : {
    type: Boolean,
    default : false
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

var checkNumber = function(num){
  MongoClient.connect('mongodb://localhost:27017/chieuse',(err,db)=>{
    if(err){
      return console.log('Unable to connect to server');
    }
  });

  db.collection('users').find({
    number: num
  }).toArray().then((docs)=>{
    db.close();
    return true ;

  },(err)=>{
    return false
  });
}

UserSchema.methods.generateAuthToken = function() {
  var user=this;
  var access='user';
  var token= jwt.sign({_id:user._id.toHexString(),access}, 'tokenpriverdehedi').toString();

  user.tokens= user.tokens.concat([{access,token}]);

  return user.save().then(()=>{
    return token;
  });
}


UserSchema.statics.findByCredentials = function(email,password){
  var User=this;

  return User.findOne({email}).then((user)=>{
    if(!user){
      return Promise.reject("Email n'existe pas");
    }
    return new Promise((resolve,reject)=>{

      bcrypt.compare(password,user.password,(err,res)=>{
        if(res){
          resolve(user);
        }else{

          reject("Email ou mot de passe est incorrect");
        }
      });
    });
  });
};


UserSchema.pre('save',function (next){
  var user=this;
  if(user.isModified('password'))
  {
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(user.password,salt,(err,hash)=>{
        user.password = hash;
        next();
      });
    });
  }else{
    next();
  }
})

var User = mongoose.model('User', UserSchema);
module.exports = {checkNumber,User};
