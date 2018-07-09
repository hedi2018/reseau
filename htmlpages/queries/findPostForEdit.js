var {Post}=require('./models/post');

module.exports = {
  findPostForEdit : function(id) {
   return new Promise(function(resolve, reject){
     Post.find({_id : id}).then((post)=>{
       resolve(post);
     }).catch((e)=>{
       reject(e);
     });
   });
 };
};
