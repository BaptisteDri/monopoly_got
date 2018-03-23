<?php

  try{
    $user = 'root';
    $pass = '';
    $db = new PDO('mysql:host=localhost;dbname=got;charset=utf8', $user, $pass);

  } catch(PDOException $e){
    var_dump($e->getMessage());
  }
