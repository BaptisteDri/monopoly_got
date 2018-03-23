<?php

// Chargement automatique des fichiers de class selon les instanciations
    function __autoload($className){
      require_once('class/'.$className.'.class.php');
    }
//

// On se connecte à la BDD
  require_once('db.php');
//

// Initialisation
  $players = [
    'player1' => new Player(),
    'player2' => new Player(),
    'player3' => new Player(),
    'player4' => new Player(),
  ];
  $cases = [];
  $events = [3, 5, 8, 13, 18, 23, 29, 34, 37, 39];
  $corners = [1, 11, 21, 31];
  $dragons = [6, 16, 26, 36];


// Execute différentes fonctions selon la requête AJAX
    if(!empty($_POST['function']) && is_callable($_POST['function'])){
      echo call_user_func($_POST['function'], $_POST);
    }
//



  function initDataFromDB(){
    global $db;

    global $players;

    global $cases;
    global $events;
    global $corners;
    global $dragons;

    // Players
    $id = 1;
    foreach ($players as $key => $value) {
      $value->fillObjects($id, $db);
      $id++;
    }

    // Cases
    // Instanciation pour les 40 cases (de 1 à 40)
    for ($i=1; $i <= 40 ; $i++) {

      // Si la case est un event
      if(in_array($i, $events)){
        // On vérifie son type (allegeance ou double_face)
        if(in_array($i, [3, 18, 34])){
          $cases[$i] = new Event('allegeance');
        }elseif(in_array($i, [8, 23, 37])){
          $cases[$i] = new Event('double_face');
        }else{
          $cases[$i] = new Event('diverse');
        }

      // Si la case est un coin
      }elseif(in_array($i, $corners)){
        $cases[$i] = new Corner();

      // Si la case est un dragon
      }elseif(in_array($i, $dragons)){
        $cases[$i] = new Dragon();

      // Si la case est un Point d'interêt
      }else{
        $cases[$i] = new Poi();
      }

      // On remplit chaque instance avec la méthode fillObjects
      $cases[$i]->fillObjects($i, $db);
    }
  }
//
initDataFromDB();


// Fonction nouvelle partie
  function newGame(){
    // On récupère la connexion à la bdd, global $db ne fonctionne pas...
    // require_once('db.php');
    global $db;

    // On vide la BDD
    $query = $db->prepare('DROP TABLE `got`.`allegeance`, `got`.`case_plate`, `got`.`double_face`, `got`.`player`');
    $query->execute();

    // On la remplit avec les valeurs par défaut en faisant appel à un fichier externe
    $sql = file_get_contents('got.sql');
    $rq = $db->exec($sql);
    return 'DB successfully deleted';
  }
//

// Fonction pour afficher les informations d'une case et récupérer un evenement
// aléatoire si besoin
  function showCaseDataFromdb($post){
    initDataFromDB();

    global $db;

    global $players;

    global $cases;
    global $events;
    global $corners;
    global $dragons;


    $id = $post['case_id'];

    // Si la case est un event
    if(in_array($id, $events)){
      // Allegeance
      if(in_array($id, [3, 18, 34])){
        ?>
            <h4>Case n°<?php echo $id; ?> : <?php echo $cases[$id]->getName(); ?></h4>
            <p style="text-align: center;">
              <?php $cases[$id]->getRandomEvent($db); ?><br><br>
              <a href="#!" class="modal-action modal-close waves-effect waves-green btn-large" id="sendEvent-all-dbf" data-id="<?php echo $id; ?>">
                ok
              </a>
            </p>
        <?php

      // Double Face
      }elseif(in_array($id, [8, 23, 37])){

        ?>
            <h4>Case n°<?php echo $id; ?> : <?php echo $cases[$id]->getName(); ?></h4>
            <p style="text-align: center;">
              <?php $cases[$id]->getRandomEvent($db); ?><br><br>
              <a href="#!" class="modal-action modal-close waves-effect waves-green btn-large" id="sendEvent-all-dbf" data-id="<?php echo $id; ?>">
                ok
              </a>
            </p>
        <?php

      // Divers
      }else{
        ?>
            <h4>Case n°<?php echo $id; ?> : <?php echo $cases[$id]->getName(); ?></h4>
            <p style="text-align: center;">
              <a href="#!" class="modal-action modal-close waves-effect waves-green btn-large" id="sendEvent-diverse" data-id="<?php echo $id; ?>">
                payez 150K Dragons d'or.
              </a>
            </p>
        <?php
      }

    // Si la case est un coin
    }elseif(in_array($id, $corners)){

      switch ($id) {
        case '1':
        // CASE DEPART
        ?>
            <h4>Case n°<?php echo $id; ?> : <?php echo $cases[$id]->getName(); ?></h4>
            <p style="text-align: center;">
              Vous êtes sur la case départ, recevez 200K dragons d'or !
              <a href="#!" class="modal-action modal-close waves-effect waves-green btn-large" id="startCase" data-id="<?php echo $id; ?>">
                passer son tour
              </a>
            </p>
        <?php


          break;
        case '11':
        // PRISON
        ?>
            <h4>Case n°<?php echo $id; ?> : <?php echo $cases[$id]->getName(); ?></h4>
            <p style="text-align: center;">
              Vous tombez du mur et restez de l'autre côté jusqu'à la fin du tour... <br><br>
              <a href="#!" class="modal-action modal-close waves-effect waves-green btn-large" id="theWall" data-id="<?php echo $id; ?>">
                passer son tour
              </a>
            </p>
        <?php


          break;
        case '21':
        // The 3 Eyes Raven
        ?>
            <h4>Case n°<?php echo $id; ?> : <?php echo $cases[$id]->getName(); ?></h4>
            <p style="text-align: center;">
              Vous rencontrez le corbeau aux 3 yeux et avez une vision... des marcheurs blancs ! <br><br>
              <a href="#!" class="modal-action modal-close waves-effect waves-green btn-large" id="theRaven" data-id="<?php echo $id; ?>">
                passer son tour
              </a>
            </p>
        <?php


          break;
        case '31':
        // Allez en prison
        ?>
            <h4>Case n°<?php echo $id; ?> : <?php echo $cases[$id]->getName(); ?></h4>
            <p style="text-align: center;">
                Vous êtes envoyé au-delà le mur... vous y restez jusqu'au prochain tour.<br><br>
              <a href="#!" class="modal-action modal-close waves-effect waves-green btn-large" id="goToTheWall" data-id="<?php echo $id; ?>">
                passer son tour
              </a>
            </p>
        <?php
          break;
      }


    // Si la case est un dragon
    }elseif(in_array($id, $dragons)){

      ?>
          <h4>Case n°<?php echo $id; ?> : <?php echo $cases[$id]->getName(); ?></h4>
          <p style="text-align: center;">

            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-large" id="buy" data-id="<?php echo $id; ?>">
              <?php
                if(null == $cases[$id]->getPlayerId()){
                  echo "Acheter pour ".$cases[$id]->getCost()."K Dragons d'or ?";
              ?>
            </a><br><br>
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-large" id="pass" data-id="<?php echo $id; ?>">
              passer son tour
              <?php
                }elseif($post['player_id'] == $cases[$id]->getPlayerId()){
              ?>
              passer son tour
              <?php
                }else{
                  echo "Payer (Propriété J".$cases[$id]->getPlayerId().")";
                }
              ?>
            </a>
          </p>
      <?php


    // Si la case est un Point d'interêt
    }else{
      ?>
          <h4>Case n°<?php echo $id; ?> : <?php echo $cases[$id]->getName(); ?></h4>
          <p style="text-align: center;">

            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-large" id="buy" data-id="<?php echo $id; ?>">
              <?php
                if(null == $cases[$id]->getPlayerId()){
                  echo "Acheter pour ".$cases[$id]->getCost()."K Dragons d'or ?";
              ?>
            </a><br><br>
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-large" id="upgrade" data-id="<?php echo $id; ?>">
              passer son tour
              <?php
                }elseif($post['player_id'] == $cases[$id]->getPlayerId()){
                  echo "Améliorer pour ".($cases[$id]->getCost()/2)."K Dragons d'or ?";
              ?>
            </a><br><br>
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-large" id="pass" data-id="<?php echo $id; ?>">
              passer son tour
              <?php
                }else{
                  echo "Payer (Propriété J".$cases[$id]->getPlayerId().")";
                }
              ?>
            </a>
          </p>
      <?php
    }
  }
//



// Fonction update Players (Double Face & Allegeance)
  // Retourner argent restant
function updatePlayers($post){

  initDataFromDB();

  global $db;

  global $players;


  $id = $post['currentPlayer'];
  $eventEffect = $post['eventEffect'];
  $effectType = $post['effectType'];

  if('1' == $effectType || '0' == $effectType){
    if(1 == $effectType){
      $players['player'.$id]->setMoney($players['player'.$id]->getMoney() + $eventEffect);
    }else{
      $players['player'.$id]->setMoney($players['player'.$id]->getMoney() - $eventEffect);
    }
  }else{
    $players['player'.$id]->setCaseId($eventEffect);
  }
  $players['player'.$id]->updateDb($db, $id);
  echo $players['player'.$id]->getMoney();
}
//

// Fonction update Players Diverse
  // Retourner argent restant
function updatePlayersDiverse($post){

  initDataFromDB();

  global $db;

  global $players;


  $id = $post['currentPlayer'];
  $players['player'.$id]->setMoney($players['player'.$id]->getMoney() - 150000);
  $players['player'.$id]->updateDb($db, $id);

  echo $players['player'.$id]->getMoney();
}
//

// Fonction update Players Case Départ
function updatePlayersStartCase($post){

  initDataFromDB();

  global $db;

  global $players;


  $id = $post['currentPlayer'];
  $players['player'.$id]->setMoney($players['player'.$id]->getMoney() + 200000);
  $players['player'.$id]->updateDb($db, $id);

  echo $players['player'.$id]->getMoney();
}
//

// Fonction update Players Allez au mur
function updatePlayersTheWall($post){

  initDataFromDB();

  global $db;

  global $players;


  $id = $post['currentPlayer'];
  $players['player'.$id]->setCaseId(11);
  $players['player'.$id]->updateDb($db, $id);
}
//

// Fonction update Players et Cases Achat
  // Retourner argent restant
function updatePlayersAndCasesBuy($post){

  initDataFromDB();

  global $db;

  global $players;
  global $cases;

  $id = $post['currentPlayer'];
  $caseId = $post['caseId'];

  $players['player'.$id]->setMoney($players['player'.$id]->getMoney() - $cases[$caseId]->getCost()*1000);
  $players['player'.$id]->setCaseId($caseId);
  $players['player'.$id]->updateDb($db, $id);

  $cases[$caseId]->setPlayerId($id);
  $cases[$caseId]->updateDb($db, $caseId);


  echo $players['player'.$id]->getMoney();
}
//

// Fonction update Players et Cases Paiement
  // Retourner argent restant
function updatePlayersAndCasesPay($post){

  initDataFromDB();

  global $db;

  global $players;
  global $cases;
  global $dragons;

  $id = $post['currentPlayer'];
  $caseId = $post['caseId'];

  // Si le loyer à payer est pour un dragon
  if(in_array($caseId, $dragons)){
    // Récupérer l'id du propriétaire
    $idProp = $cases[$caseId]->getPlayerId();

    // Récupérer le prix du loyer
    $price = $cases[$caseId]->priceToPay($db, $idProp);

    // Set money
    $players['player'.$id]->setMoney($players['player'.$id]->getMoney() - $price);

  // Sinon pour un POI
  }else{
    // Le joueur paie selon le level de la case (1 = 10%, 2 = 20%...  5 = 50%)
    $percent = $cases[$caseId]->getLevel() / 10;
    $price = $cases[$caseId]->getCost() * $percent;
    $players['player'.$id]->setMoney($players['player'.$id]->getMoney() - $price*1000);
  }

  // Update la BDD
  $players['player'.$id]->updateDb($db, $id);

  echo $players['player'.$id]->getMoney();
}
//


// Fonction pour upgrade un POI
  // Retourner argent restant
function upgradeCase($post){
    initDataFromDB();

    global $db;

    global $players;
    global $cases;

    $id = $post['currentPlayer'];
    $caseId = $post['caseId'];


    $newMoney = $players['player'.$id]->getMoney() - ($cases[$caseId]->getCost() / 2) * 1000;
    $players['player'.$id]->setMoney($newMoney);

    $newLevel = $cases[$caseId]->getLevel() + 1;
    $cases[$caseId]->setLevel($newLevel);

    // Update la BDD
    $players['player'.$id]->updateDb($db, $id);
    $cases[$caseId]->updateDb($db, $caseId);


    echo $players['player'.$id]->getMoney();
}
//


// Fonction d'initialisation des Players
  function initPlayers($post){
    initDataFromDB();

    global $db;

    global $players;
    global $cases;

    $i = 1;
    foreach ($players as $key => $value) {
      ?>
      <div id="players-info<?php echo $i; ?>"  style="display:none;">
        <span id="name"><?php echo $players[$key]->getName(); ?></span>
        <span id="money"><?php echo $players[$key]->getMoney(); ?></span>
        <span id="color"><?php echo $players[$key]->getColor(); ?></span>
        <span id="case_id"><?php echo $players[$key]->getCaseId(); ?></span>
      </div>
<?php
      $i++;
    }
  }
//


// Fonction updateCurrentCase
  function updateCurrentCase($post){
    initDataFromDB();

    global $db;

    global $players;

    $id = $post['id'];
    $caseId = $post['case_id'];

    $players['player'.$id]->setCaseId($case_id);

    $players['player'.$id]->updateDb($db, $id);
  }
//
