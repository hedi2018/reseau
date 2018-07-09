function mofigierPic(id,image,file){
  if (image.match(/\.(jpg|jpeg|png|gif|PNG|JPEG)$/) ) {
    if(file.size<10000000) {
      var data = {};
      data.image = $('.hiddenEncode').val();
      data.idUser = id;
      $.ajax({
             type: 'POST',
             data: JSON.stringify(data),
             contentType: 'application/json',
             url: '/changeProfilPic',
               success: function(data) {
                 if(data.erreur != null){
                   $(".imageInsert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close claseAlert" data-dismiss="alert" aria-hidden="true">&times;</button><h4><i class="icon fa fa-ban"></i> Alerte!</h4>'+data.erreur+'</div>');
                 }else{
                   $('.newImage').attr('style','background-image: url(avatar/'+data.success+')');
                   $('.userImageProfil').attr("src",'avatar/'+data.success);
                   $('.UserSidebarPorfilPic').attr("src",'avatar/'+data.success);
                 };
              }
          });
    }else{
      $(".imageInsert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close claseAlert" data-dismiss="alert" aria-hidden="true">&times;</button><h4><i class="icon fa fa-ban"></i> Alerte!</h4>La taille du fichier est supérieure à 10 Mo</div>');
    }
  }else{
    $(".imageInsert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close claseAlert" data-dismiss="alert" aria-hidden="true">&times;</button><h4><i class="icon fa fa-ban"></i> Alerte!</h4>veuillez télécharger une image valide</div>');

  };

};
