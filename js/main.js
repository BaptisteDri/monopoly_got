$('document').ready(function(){


  // Désactiver lien "nouvelle partie"
    $('#newGame').click(function(e){
      e.preventDefault();
      $('#newGame').html('<marquee>...Chargement...</marquee>');
      // AJAX pour réinitialiser les tables modifiées (contenu des cases, caractéristiques des
      // joueurs ...).
      $.ajax({
        url: "../php/main.php",
        data: {
          function: 'newGame'
        },
        type: 'POST'
      }).done(function(data){
        // Recharger la page
        console.log(data);
        location.reload();
      }).fail(function(){
        alert('L\'opération a échoué');
      });

    });
  //

})
