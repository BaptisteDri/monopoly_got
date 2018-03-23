function fillBackupPlayers(name, money, color, caseid, player){
  player.x = getX(caseid);
  player.y = getY(caseid);
  player.name = name;
  player.money = money;
  player.color = color;
  player.caseStanding = caseid;
}


  $.ajax({
    url: "../php/main.php",
    data: {
      function: "initPlayers"
    },
    type: "POST"
  }).done(function(data){
    $('body').append(data);
    var nameP1 = $('#players-info1 #name').html();
    var moneyP1 = $('#players-info1 #money').html();;
    var colorP1 = $('#players-info1 #color').html();;
    var caseIdP1 = $('#players-info1 #case_id').html();;
    fillBackupPlayers(nameP1, moneyP1, colorP1, caseIdP1, player1);
    console.log(player1);

    var nameP2 = $('#players-info2 #name').html();
    var moneyP2 = $('#players-info2 #money').html();;
    var colorP2 = $('#players-info2 #color').html();;
    var caseIdP2 = $('#players-info2 #case_id').html();;
    fillBackupPlayers(nameP2, moneyP2, colorP2, caseIdP2, player2);
    console.log(player2);

    var nameP3 = $('#players-info3 #name').html();
    var moneyP3 = $('#players-info3 #money').html();;
    var colorP3 = $('#players-info3 #color').html();;
    var caseIdP3 = $('#players-info3 #case_id').html();;
    fillBackupPlayers(nameP3, moneyP3, colorP3, caseIdP3, player3);
    console.log(player3);

    var nameP4 = $('#players-info4 #name').html();
    var moneyP4 = $('#players-info4 #money').html();;
    var colorP4 = $('#players-info4 #color').html();;
    var caseIdP4 = $('#players-info4 #case_id').html();;
    fillBackupPlayers(nameP4, moneyP4, colorP4, caseIdP4, player4);
    console.log(player4);


  }).fail(function(){
    alert('operation failed');
  });


var player1 = {id: 1, x: 1, y: 11, name: '', money: 200000, color: '', isPlaying: 'false', caseStanding: 1};
var player2 = {id: 2, x: 1, y: 11, name: '', money: 200000, color: '', isPlaying: 'false', caseStanding: 1};
var player3 = {id: 3, x: 1, y: 11, name: '', money: 200000, color: '', isPlaying: 'false', caseStanding: 1};
var player4 = {id: 4, x: 1, y: 11, name: '', money: 200000, color: '', isPlaying: 'false', caseStanding: 1};
