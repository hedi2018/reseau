$('.commentImage').on('change',function ()
       {
       if (this.files && this.files[0] && this.files[0].name.match(/\.(jpg|jpeg|png|gif|PNG|JPEG)$/) ) {
         if(this.files[0].size<10000000) {
          var relCo= $(this).attr("rel");
          var file = this.files[0];
          var reader = new FileReader();
          reader.onloadend = function() {
         $('#hiddenEncode').val(reader.result);
         var data={};
         data.image = $('.hiddenEncode').val();
         data.post = relCo;
         data.text= $('.addComment'+relCo).val();
           $.ajax({
             type: 'POST',
             data: JSON.stringify(data),
             contentType: 'application/json',
             url: '/addComment',
               success: function(data) {
                 $(".addCommentJs"+relCo).append(data);
                 $(".commentImage"+relCo).html('');
                 $('.addComment'+relCo).val('');
                 var countComment=parseInt($(".countComment"+relCo).html());
                 $(".countComment"+relCo).html(countComment+1);
                 }
                 });
          };
          reader.readAsDataURL(file);

          }else{
            $(".instantImage").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close claseAlert" data-dismiss="alert" aria-hidden="true">&times;</button><h4><i class="icon fa fa-ban"></i> Alerte!</h4>La taille du fichier est supérieure à 10 Mo</div>');
            }
        }else{
          $(".instantImage").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close claseAlert" data-dismiss="alert" aria-hidden="true">&times;</button><h4><i class="icon fa fa-ban"></i> Alerte!</h4>veuillez télécharger une image valide</div>');

        };
       });
       $(".addCommentForm").submit(function(e){
                  e.preventDefault();
                  var idCommentPost = $(this).attr('rel');
                  var data={};
                  data.image = null;
                  data.post = idCommentPost;
                  data.text= $('.addComment'+idCommentPost).val();
                  $.ajax({
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    url: '/addComment',
                      success: function(data) {
                        $(".addCommentJs"+idCommentPost).append(data);
                        $(".commentImage"+idCommentPost).html('');
                        $('.addComment'+idCommentPost).val('');
                        var countComment=parseInt($(".countComment"+idCommentPost).html());
                        $(".countComment"+idCommentPost).html(countComment+1);
                        }
                        });
      });
