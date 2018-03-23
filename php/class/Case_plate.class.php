<?php

abstract Class Case_plate{
  // Attributs
    protected $level;
    protected $name;
  //

  // Setters & Getters

    // Name
    public function setName($arg){
      $this->name = $arg;
    }
    public function getName(){
      return $this->name;
    }

    // Level
    public function setLevel($arg){
      $this->level = $arg;
    }
    public function getLevel(){
      return $this->level;
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
        $this->setName($data['name']);
        $this->setLevel($data['level']);
      }
    }

    public function updateDb($db, $id){
      $query = $db->prepare('UPDATE `case_plate` SET `level` = :level WHERE `id` = :id');
      $query->execute([
        'level' => $this->getLevel(),
        'id' => $id
      ]);
    }
  //
}
