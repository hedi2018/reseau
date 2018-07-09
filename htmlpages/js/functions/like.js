$('.like').click(function(){
  var data = {};
  var LikePost = $(this).attr('rel');
  data.post = LikePost;
  $.ajax({
         type: 'POST',
         data: JSON.stringify(data),
         contentType: 'application/json',
         url: '/addLike',
           success: function(data) {
           var countLike=parseInt($(".countLike"+LikePost).html());
           $(".countLike"+LikePost).html(countLike+1);
          }
      });
});
