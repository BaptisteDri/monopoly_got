<?php

require_once('Case_plate.class.php');

Class Event extends Case_plate{
  // Attributs
    protected $eventType;
  //

  // Setters & Getters
    public function setEventType($arg){
      $this->eventType = $arg;
    }
    public function getEventType(){
      return $this->eventType;
    }
  //

  // Méthodes
    public function __construct($eventType){
      $this->setEventType($eventType);
    }

    public function getRandomEvent($db){
      // Requête pour obtenir un événement aléatoire
      switch ($this->getEventType()) {
        case 'allegeance':
          $query = $db->prepare('SELECT * FROM `allegeance` ORDER BY RAND() LIMIT 1');
          $query->execute();
          while($data = $query->fetch()){
            echo $data['content'].'<span id="eventEffect" style="display: none;">'.$data['effect'].'</span><span id="effectType" style="display: none;">'.$data['effect_type'].'</span>';
          }
          break;

        case 'double_face':
          $query = $db->prepare('SELECT * FROM `double_face` ORDER BY RAND() LIMIT 1');
          $query->execute();
          while($data = $query->fetch()){
            echo $data['content'].'<span id="eventEffect" style="display: none;">'.$data['effect'].'</span><span id="effectType" style="display: none;">'.$data['effect_type'].'</span>';
          }
          break;
      }
    }
  //
}
