<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Monopoly Game of Thrones</title>
    <link rel="stylesheet" href="../css/style.css">

    <!-- Materialize CDN CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">


    <script type="text/javascript" src="../js/jquery-3.2.1.min.js"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Materialize CDN JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js">
    </script>

    <script type="text/javascript" src="../js/main.js"></script>
  </head>

  <body>
    <nav>
      <a href="../index.php" class="brand-logo right"><img src="../assets/img/Monopoly.png" alt="logo monopoly game of thrones"></a>
      <ul class="left">
        <li><a href="../index.php">Accueil</a></li>
        <li><a href="../pages/game.php">Jouer</a></li>
        <li><a href="../pages/contact.php">Contact</a></li>
      </ul>
    </nav>

<main>
  <h4>Nous contacter :</h4>
  <div class="row">
    <div class="col s1"></div>
    <form class="col s10">
      <div class="row">
        <div class="input-field col s6">
          <input id="first_name" type="text" class="validate" required>
          <label for="first_name">First Name</label>
        </div>
        <div class="input-field col s6">
          <input id="last_name" type="text" class="validate" required>
          <label for="last_name">Last Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" class="validate" required>
          <label for="email">Email</label>
        </div>
      </div>
      <div class="row">
        <div class="row">
          <div class="input-field col s12">
            <textarea id="textarea1" class="materialize-textarea" required></textarea>
            <label for="textarea1">Textarea</label>
          </div>
        </div>
      </div>
      <div style="text-align: center;">
        <button class="btn waves-effect waves-light" type="submit" name="action">Envoyer</button>
      </div>
    </form>
    <div class="col s1">
    </div>
  </div>
</main>


    <footer class="page-footer">
      <div class="container">
        <div class="row">
          <div class="col l6 s12">
            <h5 class="white-text">Monopoly - Game of Thrones</h5>
            <p class="grey-text text-lighten-4">Jeu créé par Baptiste Drillien & Eliott Lambert, étudiants à SUPDEWEB Paris.</p>
            <br>
            <a href="game.php" class="waves-effect waves-light btn-large">JOUER</a>
          </div>
          <div class="col l4 offset-l2 s12">
            <h5 class="white-text">Contact (LinkedIn) :</h5>
            <ul>
              <li><a class="grey-text text-lighten-3" href="https://www.linkedin.com/in/baptiste-drillien/" target="_blank">Baptiste Drillien</a></li>
              <li><a class="grey-text text-lighten-3" href="https://www.linkedin.com/in/eliott-lambert/" target="_blank">Eliott Lambert</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <div class="container">
        © 2018 Baptiste Drillien & Eliott Lambert
        <a class="grey-text text-lighten-4 right" href="https://www.hbo.com/game-of-thrones" target="_blank">Game of Thrones - HBO</a>
        </div>
      </div>
    </footer>
  </body>
</html>
