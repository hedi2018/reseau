$('.modifierPoste').on('click',function(){
  var idPost=$(this).attr('rel');
  var textPost = $('.textpostAdded'+idPost).text();
  $('.textpostAdded'+idPost).html('<textarea class="form-control TextPost textPostEdit textPostEdit'+idPost+'" rows="3">'+textPost+'</textarea><br><button class="btn btn-block btn-info col-lg-2 EditPostCo" rel="'+idPost+'">Modifier</button>')
  $('.EditPostCo').on('click',function(){
    var id = $(this).attr('rel');
    var data={};
    data.text = $('.textPostEdit'+id).val();
    data.idPost = id ;
    $.ajax({
      type: 'PUT',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/ModifierPoste',
        success: function(data) {
            if(data.erreur == null){
              $('.textpostAdded'+id).html($('.textPostEdit'+id).val());
            }else{
              $('.textpostAdded'+id).html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close claseAlert" data-dismiss="alert" aria-hidden="true">&times;</button><h4><i class="icon fa fa-ban"></i> Alerte!</h4>'+data.erreur+'</div>');
            };
          }
          });
  });
});

$(".supprimerPost").on('click',function(){
  var idPost=$(this).attr('rel');
      swal({
          title: "Êtes-vous sûr?",
          text: "Vous ne pourrez pas récupérer cette poste!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Oui, supprimez-le!",
          cancelButtonText: "Annuler",
          closeOnConfirm: false
      }, function(){
        var data={};
        data.idPost = idPost ;
        $.ajax({
          type: 'DELETE',
          data: JSON.stringify(data),
          contentType: 'application/json',
          url: '/SupprimerPoste',
            success: function(data) {
              if(data.erreur == null){
                $('.postCRUD'+idPost).remove();
                swal("Supprimé!", "Votre poste a été supprimé.", "success");
                  };
                }
              });
      });
});
