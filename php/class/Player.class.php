<?php

Class Player{
  // Attributs
    protected $name;
    protected $money;
    protected $color;
    protected $case_id;
  //

  // Setters & Getters

    // Name
    public function setName($arg){
      $this->name = $arg;
    }
    public function getName(){
      return $this->name;
    }

    // Money
    public function setMoney($arg){
      $this->money = $arg;
    }
    public function getMoney(){
      return $this->money;
    }

    // Color
    public function setColor($arg){
      $this->color = $arg;
    }
    public function getColor(){
      return $this->color;
    }

    // CaseId
    public function setCaseId($arg){
      $this->case_id = $arg;
    }
    public function getCaseId(){
      return $this->case_id;
    }
  //

  // Méthodes
    public function fillObjects($id, $db){
      $query = $db->prepare('SELECT * FROM `player` WHERE `id` = :id');
      $query->execute([
        'id' => $id
      ]);
      while($data = $query->fetch()){
        // Remplissage
        $this->setName($data['name']);
        $this->setMoney($data['money']);
        $this->setColor($data['color']);
        $this->setCaseId($data['case_id']);
      }
    }

    public function updateDb($db, $id){
      $query = $db->prepare('UPDATE `player` SET `money` = :money, `case_id` = :case_id WHERE `id` = :id');
      $query->execute([
        'money' => $this->getMoney(),
        'case_id' => $this->getCaseId(),
        'id' => $id
      ]);
    }
  //
}
