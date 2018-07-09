$('.MonProfil').on("click",function(){
  $('.contentEdit').html('<div class="box">Patientez s\'il-vous-plait ... <br><div class="progress"><div class="progress-bar progress-bar-danger progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%"><span class="sr-only">60% Complete (warning)</span></div></div></div>');
  data = {};
  data.accueil="Mon Profil";

  $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/mon-profil',
      success: function(data) {
        $('.contentEdit').html(data);
      }
  });
});


$('.ParametreCompte').on("click",function(){
  $('.contentEdit').html('<div class="box">Patientez s\'il-vous-plait ... <br><div class="progress"><div class="progress-bar progress-bar-danger progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%"><span class="sr-only">60% Complete (warning)</span></div></div></div>');
  data = {};
  data.accueil="Parametre Compte";

  $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/parametre-compte',
      success: function(data) {
        $('.contentEdit').html(data);
      }
  });
});
