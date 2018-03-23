<?php

require_once('Case_plate.class.php');

Class Poi extends Case_plate{
  // Attributs
    protected $player_id;
    protected $cost;
  //

  // Setters & Getters
    // PlayerId
    public function setPlayerId($arg){
      $this->player_id = $arg;
    }
    public function getPlayerId(){
      return $this->player_id;
    }

    // Cost
    public function setCost($arg){
      $this->cost = $arg;
    }
    public function getCost(){
      return $this->cost;
    }
  //

  // Méthodes
    public function fillObjects($id, $db){
      $query = $db->prepare('SELECT * FROM `case_plate` WHERE `id` = :id');
      $query->execute([
        'id' => $id
      ]);
      while($data = $query->fetch()){
        // Remplissage
        $this->setPlayerId($data['player_id']);
        $this->setCost($data['cost']);
      }

      parent::fillObjects($id, $db);
    }

    public function updateDb($db, $id){
      $query = $db->prepare('UPDATE `case_plate` SET `player_id` = :player_id, `level` = :level WHERE `id` = :id');
      $query->execute([
        'player_id' => $this->getPlayerId(),
        'level' => $this->getLevel(),
        'id' => $id
      ]);
    }

  //
}
