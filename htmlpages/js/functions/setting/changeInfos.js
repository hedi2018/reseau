$('.cmdp').on("keyup",function(){
  var text = $(this).val();
  var mdp = $(".mdp").val();
  if(text != mdp){
    $('.textCmdp').text("Ne sont pas identique !");
    $('.btnModifier').prop( "disabled", true );
  }else{
    $('.textCmdp').text("");
    $('.btnModifier').prop( "disabled", false );
  }
});

$(".btnModifier").on("click",function(e){
  e.preventDefault();
  var id = $(this).attr("rel");
  var userrr = $('.userrr').val();
  var email = $('.email').val();
  var mdp = $('.mdp').val();
  data={};
  data.user = userrr ;
  data.email = email ;
  if( mdp != "")
  {
    data.mdp = mdp ;
  }else{
    data.mdp = null;
  }

  data.Iduser = id ;
  $.ajax({
         type: 'POST',
         data: JSON.stringify(data),
         contentType: 'application/json',
         url: '/changeProfilInfos',
           success: function(data) {
             if(data.erreur != null){
               $(".textCmdpT").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close claseAlert" data-dismiss="alert" aria-hidden="true">&times;</button><h4><i class="icon fa fa-ban"></i> Alerte!</h4>'+data.erreur+'</div>');
             }else{

             };
          }
      });
});
