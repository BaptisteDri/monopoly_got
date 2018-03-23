/*
  ##############
    GAME LOGIC
  ##############
*/
function nextPlayer(){
  console.log('Argent joueur '+(i+1)+' : '+currentPlayer.money);
  i++;
  if(4 == i){
    i = 0;
  }

  currentPlayer = players[i];

  if(players[0].isPlaying == false && players[1].isPlaying == false && players[2].isPlaying == false){
    alert('Partie finie ! J4 l\'emporte !');
    location.reload();
    return;
  }else if (players[0].isPlaying == false && players[1].isPlaying == false && players[3].isPlaying == false) {
    alert('Partie finie ! J3 l\'emporte !');
    location.reload();
    return;
  }else if (players[0].isPlaying == false && players[2].isPlaying == false && players[3].isPlaying == false) {
    alert('Partie finie ! J2 l\'emporte !');
    location.reload();
    return;
  }else if (players[1].isPlaying == false && players[2].isPlaying == false && players[3].isPlaying == false) {
    alert('Partie finie ! J1 l\'emporte !');
    location.reload();
    return;
  }


  if(currentPlayer.isPlaying == false){
    currentPlayer.x = 100;
    currentPlayer.y = 100;
    nextPlayer();
  }
  
  console.log('Argent joueur '+(i+1)+' : '+currentPlayer.money);
  $('#controls-container').html('<h4>Début du tour, Joueur ' + (currentPlayer.name) + ' !</h4><a href="" class="btn-large" id="launchDice">Lancer les dés</a><p>Argent : ' + currentPlayer.money + '</p>');
}

// déplacer un joueur directement
function moveDirect(target, player){

  player.caseStanding = target;
  player.x = getX(target);
  player.y = getY(target);


  interactWithCase(target, player.id);
}

//get x
function getX($case) {
  var x = 0;
  if ($case >= 1 && $case <= 11) {
    x = 0;
  } else if ($case > 11 && $case <= 21) {
    x = $case - 11;
  } else if ($case > 21 && $case <= 31) {
    x = 10;
  } else if ($case > 31 && $case <41) {
    x = 41 - $case;
  }
  return x+1;
}

// and get y
function getY($case) {
  var y = 0;
  if ($case >= 1 && $case <= 11) {
    y = 11 - $case;
  } else if ($case > 11 && $case <= 21) {
    y = 0;
  } else if ($case > 21 && $case <= 31) {
    y = $case - 21;
  } else if ($case > 31 && $case <41) {
    y = 10;
  }
  return y+1;
}

// Afficher un modal materialize
function showModal(modal){
  modal.modal('open');
}

// Lancer un dé
function launchDice () {
  var stDice = (Math.floor((6)*Math.random()+1));
  var ndDice = (Math.floor((6)*Math.random()+1));
  var isDouble = false;
  if(stDice === ndDice){
    isDouble = true;
  }
  var movement = stDice + ndDice;

  var dice = {movement: movement, isDouble: isDouble};
  return dice;
}

// Déplacement
function move(dice, player){
  // A définir, le player se déplace (visuelement) et son x et y se modifient
  // il faut aussi modifier la case id dans la BDD
  // On execute interactWithCase(player)

  var newCase = parseInt(player.caseStanding) + parseInt(dice.movement);
  if(newCase > 40){
    newCase -= 40;
  }
  player.caseStanding = newCase;
  player.x = getX(newCase);
  player.y = getY(newCase);

  $.ajax({
    url: "../php/main.php",
    data: {
      functionToPhp: 'updateCurrentCase',
      id: player.id,
      case_id: newCase
    },
    type: "POST"
  }).done(function(data){
    console.log(data)
  }).fail(function(){

  });

  interactWithCase(newCase, player.id);
}

function interactWithCase(caseId, playerId){

  $.ajax({
    url: "../php/main.php",
    data: {
      function: 'showCaseDataFromdb',
      case_id: caseId,
      player_id: playerId
    },
    type: 'POST'
  }).done(function(data){
    console.log(data);
    $('#controls-container').html(data).append('<p>Argent : ' + currentPlayer.money + '</p>');

  }).fail(function(){
    alert('L\'opération a échoué');
  });
}



var players = new Array(player1, player2, player3, player4);
var i = 0;
var currentPlayer = players[i];



$(document).ready(function(){


  // Lancer la partie
  $('#launchGameBtn').click(function(e){
    e.preventDefault();
    $('#controls-container').html('<h4>Début du tour, Joueur ' + (currentPlayer.name) + ' !</h4><a href="" class="btn-large" id="launchDice">Lancer les dés</a><p>Argent : ' + currentPlayer.money + '</p>');
  });

  // Lancer les dés
  $(document).on('click', '#launchDice', function(e){
    e.preventDefault();
    var dice = launchDice();
    move(dice, currentPlayer);
  });


  // Allegeance update
  $(document).on('click', '#sendEvent-all-dbf', function(e){

    var eventEffect = $('#eventEffect').html();
    var effectType = $('#effectType').html();

    $.ajax({
      url: "../php/main.php",
      data: {
        function: 'updatePlayers',
        eventEffect: eventEffect,
        effectType: effectType,
        currentPlayer: currentPlayer.id
      },
      type: 'POST'
    }).done(function(data){

      console.log(data);
      currentPlayer.money = data;
      if(data <= 0){
        currentPlayer.isPlaying = false;
      }

      if('1' != effectType && '0' != effectType){
        // créer une fonction move direct
        moveDirect(eventEffect, currentPlayer);
        return;
      }

      nextPlayer();

    }).fail(function(){
      alert('L\'opération a échoué');
    });

  });


  $(document).on('click', '#sendEvent-diverse', function(e){
    e.preventDefault();

    $.ajax({
      url: "../php/main.php",
      data: {
        function: 'updatePlayersDiverse',
        currentPlayer: currentPlayer.id
      },
      type: 'POST'
    }).done(function(data){
      console.log(data);
      currentPlayer.money = data;
      if(data <= 0){
        currentPlayer.isPlaying = false;
      }
      nextPlayer();
    }).fail(function(){
      alert('L\'opération a échoué');
    });

  });

  $(document).on('click', '#startCase', function(e){
    e.preventDefault();

    $.ajax({
      url: "../php/main.php",
      data: {
        function: 'updatePlayersStartCase',
        currentPlayer: currentPlayer.id
      },
      type: 'POST'
    }).done(function(data){
      console.log(data);
      currentPlayer.money = data;
      if(data <= 0){
        currentPlayer.isPlaying = false;
      }
      nextPlayer();
    }).fail(function(){
      alert('L\'opération a échoué');
    });

  });

  $(document).on('click', '#theWall', function(e){
    e.preventDefault();

    nextPlayer();
  });

  $(document).on('click', '#theRaven', function(e){
    e.preventDefault();

    nextPlayer();
  });



  $(document).on('click', '#goToTheWall', function(e){
    e.preventDefault();

    $.ajax({
      url: "../php/main.php",
      data: {
        function: 'updatePlayersTheWall',
        currentPlayer: currentPlayer.id
      },
      type: 'POST'
    }).done(function(data){
      console.log(data);

    }).fail(function(){
      alert('L\'opération a échoué');
    });
    moveDirect(11, currentPlayer);
    //nextPlayer();
  });


  $(document).on('click', '#buy', function(e){
    e.preventDefault();

    var caseId = $(this).attr('data-id');
    var action = $(this).html();

    if(action.search('Acheter') == 15){
      var functionToPhp = 'updatePlayersAndCasesBuy';

    } else if (action.search('passer') == 29){
      var functionToPhp = '';

    } else if (action.search('Améliorer') == 15){
      var functionToPhp = 'upgradeCase';

    } else{
      var functionToPhp = 'updatePlayersAndCasesPay';
    }

    $.ajax({
      url: "../php/main.php",
      data: {
        function: functionToPhp,
        currentPlayer: currentPlayer.id,
        caseId: caseId
      },
      type: 'POST'
    }).done(function(data){
      console.log(data);

      currentPlayer.money = data;
      if(data <= 0){
        currentPlayer.isPlaying = false;
      }
      nextPlayer();
    }).fail(function(){
      alert('L\'opération a échoué');
    });

  });


  $(document).on('click', '#pass', function(e){
    e.preventDefault();

    nextPlayer();
  });

  $(document).on('click', '#upgrade', function(e){
    e.preventDefault();

    nextPlayer();
  });



});
