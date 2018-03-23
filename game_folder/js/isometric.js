// Instanciation du render
var Isometric = {

  tileColumnOffset: 188, // pixels
  tileRowOffset: 94, // pixels
  originX: 0, // offset from left
  originY: 0, // offset from top
  Xtiles: 0, // Number of tiles in X-dimension
  Ytiles: 0, // Number of tiles in Y-dimension
  // selectedTileX: -1,
  // selectedTileY: -1,
  context: undefined,
  canvas: undefined,
  tileImages: undefined,
  showCoordinates: false,
  Xmov: 0, // camera X
  Ymov: -350, // camera Y
  cameraSpeed: 150,
  maxDist: 500,
  offsetChar: -43,
  offsetNameX: 50,
  offsetNameY: - 40,
  offsetDragonX: 30,
  offsetDragonY: -35,


  // Chargement des assets
  load: function() {
    this.tileImages = new Array();
    var loadedImages = 0;
    var totalImages = IsometricMap.tiles.length;
    var self = this; // stockage de l'objet

    this.CharImages = new Array();
    var loadedCharImages = 0;
    var totalCharImages = IsometricCharacter.tiles.length;

    // Images char
    for(var i = 0; i < IsometricCharacter.tiles.length; i++) {
      this.CharImages[i] = new Image();
      this.CharImages[i].src = IsometricCharacter.tiles[i];
    }

    // Images tiles
    for(var i = 0; i < IsometricMap.tiles.length; i++) {
      this.tileImages[i] = new Image();
      this.tileImages[i].onload = function() {
        if(++loadedImages >= totalImages) {
          self.run();
        }
      };
      this.tileImages[i].src = IsometricMap.tiles[i];
    }
  },

  // RENDER
  // Réécriture du canvas en fonction d'interactions jquery
  run: function() {
    this.canvas = $('#isocanvas');
    this.context = this.canvas[0].getContext("2d");

    this.Xtiles = IsometricMap.map.length;
    this.Ytiles = IsometricMap.map[0].length;

    var self = this;

    // Camera
    // Variables of Interest --> maxDist, cameraSpeed.
    $(document).keydown(function(e){
      switch(e.keyCode) {
        case 37:
          e.view.event.preventDefault();
          if (self.Xmov < self.maxDist) {
            self.Xmov = self.Xmov + self.cameraSpeed;
          }
          break;
        case 39:
          e.view.event.preventDefault();
          if (self.Xmov > self.maxDist * parseInt(-1)) {
            self.Xmov = self.Xmov - self.cameraSpeed;
          }
            break;
        case 38:
          e.view.event.preventDefault();
          if (self.Ymov < self.maxDist) {
            self.Ymov = self.Ymov + self.cameraSpeed;
          }
          break;
        case 40:
          e.view.event.preventDefault();
          if (self.Ymov > self.maxDist * parseInt(-1)) {
            self.Ymov = self.Ymov - self.cameraSpeed;
          }
          break;
        }

      self.updateCanvasSize();
      self.redrawTiles();
     console.log($('#isocanvas').is(":hover"));
    });

    $(window).on('resize', function(){
      self.updateCanvasSize();
      self.redrawTiles();
    });

   $(window).on('mousemove', function(e) {
     e.pageX = e.pageX - self.tileColumnOffset / 2 - self.originX;
     e.pageY = e.pageY - self.tileRowOffset / 2 - self.originY;
     tileX = Math.round(e.pageX / self.tileColumnOffset - e.pageY / self.tileRowOffset);
     tileY = Math.round(e.pageX / self.tileColumnOffset + e.pageY / self.tileRowOffset);

     self.selectedTileX = tileX;
     self.selectedTileY = tileY;
     self.redrawTiles();
     // console.log(self.selectedTileX + ", " + self.selectedTileY);
   });

    // $(window).on('click', function() {
    //   self.showCoordinates = !self.showCoordinates;
    //   self.redrawTiles();
    // });
    this.updateCanvasSize();
    this.redrawTiles();
  },



  updateCanvasSize: function() {
    var width = ($(window).width() - ($(window).width() * 0.1));
    var height = ($(window).height() - ($(window).height() * 0.1));
    //console.log(width);

    this.context.canvas.width  = width;
    this.context.canvas.height = height;

    this.originX = width / 2 - this.Xtiles * this.tileColumnOffset / 2 + this.Xmov;
    this.originY = height / 2 + this.Ymov;
    console.log(this.Xmov);
  },

  //  Logic de l'affichage :
  // Gestion de l'ordre de l'affichage des éléments. (IMPORTANT)
  redrawTiles: function() {
    this.context.canvas.width = this.context.canvas.width;


    // Affichage des tiles
    for(var Xi = (this.Xtiles - 1); Xi >= 0; Xi--) {
      for(var Yi = 0; Yi < this.Ytiles; Yi++) {
        this.drawTile(Xi, Yi);
      }
    }

    // Affichage du nom du joueur qui joue
    this.context.fillStyle = currentPlayer.color;
    this.context.font = '15pt Arial';
    this.context.fillText('Tour du joueur ' + currentPlayer.id + ', ' + currentPlayer.name, 20, 30);

    // Rectangle curseur
    //this.drawDiamond(this.selectedTileX, this.selectedTileY, 'white');

    this.drawDragon(10, 6, 6);
    this.drawDragon(2, 6, 7);
    this.drawDragon(6, 10, 5);
    this.drawDragon(6, 2, 8);
    this.drawWall(1, 0);

    // Loop logic de render des personnages
    player = [player1, player2, player3, player4];
    for (var i = 0, len = player.length; i < len; i++) {
      this.drawDiamond(player[i].x, player[i].y, player[i].color);
      this.drawChar(player[i].x, player[i].y, player[i].id);
      this.drawCharName(player[i].x, player[i].y, player[i].name, player[i].color);
    }
 },

  drawCharName: function(Xi, Yi, text, color) {
    if (text.length < 7) { offsetNameX = 70} else { offsetNameX = 50};
    var offX = Xi * this.tileColumnOffset / 2 + Yi * this.tileColumnOffset / 2 + this.originX + offsetNameX;
    var offY = Yi * this.tileRowOffset / 2 - Xi * this.tileRowOffset / 2 + this.originY + this.offsetNameY;
    this.context.fillStyle = color;
    this.context.font = '15pt Arial';
    this.context.fillText(text, offX, offY);
  },

  // Affichage d'une case
  drawTile: function(Xi, Yi) {
    var offX = Xi * this.tileColumnOffset / 2 + Yi * this.tileColumnOffset / 2 + this.originX;
    var offY = Yi * this.tileRowOffset / 2 - Xi * this.tileRowOffset / 2 + this.originY;

    var imageIndex = IsometricMap.map[Xi][Yi];
    this.context.drawImage(this.tileImages[imageIndex], offX, offY);
    this.context.drawImage(this.tileImages[imageIndex], offX, offY);

    if(this.showCoordinates) {
      this.context.fillStyle = 'orange';
      this.context.fillText(Xi + ", " + Yi, offX + this.tileColumnOffset/2 - 9, offY + this.tileRowOffset/2 + 3);
    }
  },

  // Affichage d'un personnage
  drawChar: function(Xi, Yi, iArray) {
    var offX = Xi * this.tileColumnOffset / 2 + Yi * this.tileColumnOffset / 2 + this.originX + 45;
    var offY = Yi * this.tileRowOffset / 2 - Xi * this.tileRowOffset / 2 + this.originY + this.offsetChar;

    this.context.drawImage(this.CharImages[iArray], offX, offY);
    this.context.drawImage(this.CharImages[iArray], offX, offY);
  },

  drawDragon: function(Xi, Yi, iArray) {
    var offX = Xi * this.tileColumnOffset / 2 + Yi * this.tileColumnOffset / 2 + this.originX + this.offsetDragonX;
    var offY = Yi * this.tileRowOffset / 2 - Xi * this.tileRowOffset / 2 + this.originY + this.offsetDragonY;

    this.context.drawImage(this.CharImages[iArray], offX, offY);
    this.context.drawImage(this.CharImages[iArray], offX, offY);
  },

  drawWall: function(Xi, Yi) {
    var offX = Xi * this.tileColumnOffset / 2 + Yi * this.tileColumnOffset / 2 + this.originX + 25;
    var offY = Yi * this.tileRowOffset / 2 - Xi * this.tileRowOffset / 2 + this.originY - 25;

    this.context.drawImage(this.CharImages[9], offX, offY);
    this.context.drawImage(this.CharImages[9], offX, offY);
  },

  // Affichage d'un rectangle autour d'une case
  drawDiamond: function(Xi, Yi, color) {
    var offX = Xi * this.tileColumnOffset / 2 + Yi * this.tileColumnOffset / 2 + this.originX;
    var offY = Yi * this.tileRowOffset / 2 - Xi * this.tileRowOffset / 2 + this.originY;

    this.drawLine(offX, offY + this.tileRowOffset / 2, offX + this.tileColumnOffset / 2, offY, color);
    this.drawLine(offX + this.tileColumnOffset / 2, offY, offX + this.tileColumnOffset, offY + this.tileRowOffset / 2, color);
    this.drawLine(offX + this.tileColumnOffset, offY + this.tileRowOffset / 2, offX + this.tileColumnOffset / 2, offY + this.tileRowOffset, color);
    this.drawLine(offX + this.tileColumnOffset / 2, offY + this.tileRowOffset, offX, offY + this.tileRowOffset / 2, color);
  },

  // Créer le rectangle en question
  drawLine: function(x1, y1, x2, y2, color) {
    color = typeof color !== 'undefined' ? color : 'blue';
    this.context.strokeStyle = color;
    this.context.beginPath();
    this.context.lineWidth = 1;
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
   },
};

