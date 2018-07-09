var a=0;
var i=0;
var j=0;
$('.uploadImage').on('change',function ()
     {
       if (this.files && this.files[0] && this.files[0].name.match(/\.(jpg|jpeg|png|gif|PNG|JPEG)$/) ) {
         if(this.files[0].size<10000000) {
       $(".imageInsert").html('<div class="timeline-body col-md-12 col-lg-3 fx-card-avatar fx-overlay-1 imageContainer"><img class="card-img-top img-responsive margin imageHover imageImage" alt="Card image cap" src="'+URL.createObjectURL(event.target.files[0])+'"><div class="middleImage"><i class="fa fa-window-close deleteImage" aria-hidden="true" style="cursor:pointer"></i></div></div><br><br>');
       i++;
       $('.deleteImage').click(function(){
         i=0;
         $(".imageInsert").html('');
         $('.uploadImage').val('');
         $('.hiddenEncode').val('')
         $('.publierPost').prop( "disabled", false );
       });
       $('.publierPost').prop( "disabled", false );
      encodeImagetoBase64(element);

        }else{
          i=0;
          $(".imageInsert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close claseAlert" data-dismiss="alert" aria-hidden="true">&times;</button><h4><i class="icon fa fa-ban"></i> Alerte!</h4>La taille du fichier est supérieure à 10 Mo</div>');
          $('.publierPost').prop( "disabled", true );
        }
        }else{
          i=0;
          $(".imageInsert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close claseAlert" data-dismiss="alert" aria-hidden="true">&times;</button><h4><i class="icon fa fa-ban"></i> Alerte!</h4>veuillez télécharger une image valide</div>');
          $('.publierPost').prop( "disabled", true );
        };

       $(".claseAlert").click(function(){
         $('.publierPost').prop( "disabled", false );
       });
});
$(".addPostForm").submit(function(e){
           e.preventDefault();
           var data = {};
           var imageCheck =$('.uploadImage').val();
           if(imageCheck != ''){
            data.image = $('.hiddenEncode').val();
          }else{
            data.image = null
          }
            data.text = $('.TextPost').val();
            data.iteration = j ;
            $.ajax({
                   type: 'POST',
                   data: JSON.stringify(data),
                   contentType: 'application/json',
                   url: '/addPost',
                     success: function(data) {
                       $(".AddPost").prepend(data);
                       var imageCheck =$('.uploadImage').val();
                       if(imageCheck != ''){
                         var attr =$('.checkPostAdded').attr("rel");
                         $('.checkPostAdded'+attr).html('<img src="" alt="..." class="imagePostAdded imagePostAdded'+j+'">')
                       $('.imagePostAdded'+j).attr("src",$('.hiddenEncode').val());
                       j++;
                       }
                       $('.textpostAdded').html($('.TextPost').val());
                       $(".imageInsert").html('');
                       $('.uploadImage').val('');
                       $('.hiddenEncode').val('');
                       $('.TextPost').val('');
                    }
                });
       });
