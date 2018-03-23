// Mapping des assets
var IsometricMap = {
  tiles: [
    "../game_folder/images/landscape/grasslands.png", //0
    "../game_folder/images/landscape/desert.png", //1
    "../game_folder/images/landscape/snow.png", //2
    "../game_folder/images/landscape/ocean.png", //3
    "../game_folder/images/landscape/bog.png", //4
    "../game_folder/images/landscape/island.png",  //5

    "../game_folder/images/d1.png",  //6
    "../game_folder/images/d2.png",  // 7
    "../game_folder/images/d3.png",  // 8
    "../game_folder/images/f1.png",  //9
    "../game_folder/images/f2.png" , //10
    "../game_folder/images/inn.png" , //11
    "../game_folder/images/island1.png",  //12
    "../game_folder/images/island2.png",  //13
    "../game_folder/images/m1.png",  //14
    "../game_folder/images/s1.png",  //15
    "../game_folder/images/winterfell.png",  //16

    "../game_folder/images/case4/131.png",  //17
    "../game_folder/images/case4/132.png",  //18
    "../game_folder/images/case4/133.png",  //19
    "../game_folder/images/case4/134.png",  //20
    "../game_folder/images/case4/corneille1.png",  //21
    "../game_folder/images/case4/corneille2.png",  //22
    "../game_folder/images/case4/corneille3.png",  //23
    "../game_folder/images/case4/void.png",  // 24
    "../game_folder/images/case4/start1.png",  //25
    "../game_folder/images/case4/start2.png",  // 26
    "../game_folder/images/case4/start3.png",  // 27
    "../game_folder/images/case4/start4.png",  // 28

    "../game_folder/images/face.png",  // 29
    "../game_folder/images/coffre.png"  // 30
    ],
  map: [
 //     v   p                             p  v
        [2, 2, 13, 14, 29, 11, 0, 24, 11, 30, 9, 26, 25], // vilLess
        [2, 2, 2, 4, 4, 0, 0, 0, 0, 0, 0, 27, 28], // path
        [12, 2, 13, 14, 29, 11, 0, 24, 11, 30, 13, 1, 13],
        [30, 1, 30, 3, 3, 3, 3, 3, 0, 3, 30, 1, 30],
        [6, 1, 6, 1, 1, 3, 3, 3, 3, 3, 13, 1, 13],
        [7, 1, 7, 1, 1, 1, 3, 3, 3, 3, 29, 4, 29],
        [3, 1, 1, 1, 1, 1, 3, 1, 3, 4, 4, 4, 0],
        [8, 1, 8, 1, 1, 3, 3, 3, 3, 3, 9, 0, 9],
        [30, 1, 30, 1, 1, 3, 3, 3, 3, 2, 30, 2, 30],
        [13, 3, 13, 3, 3, 3, 1, 2, 2, 2, 10, 2, 10],
        [12, 3, 13, 29, 12, 8, 2, 15, 15, 30, 16, 2, 15],
        [21, 24, 3, 1, 1, 1, 2, 2, 2, 2, 2, 18, 17], // path
        [22, 23, 13, 29, 12, 8, 1, 15, 15, 30, 16, 19, 20], // villes

    ]
};

// pour l'instant ça marche pas
var IsometricCharacter = {
  tiles: [
    "../game_folder/images/characters/hamster.png", // 0 l'easter egg
    "../game_folder/images/characters/tyrion.png", // 1 Tyrion
    "../game_folder/images/characters/cersei.png", // 2 Cersei
    "../game_folder/images/characters/johnsnow.png", // 3 John Snow
    "../game_folder/images/characters/daenerys.png",  // 4 Daenery
    "../game_folder/images/characters/dragon.png",  // 5 Dragon1
    "../game_folder/images/characters/dragon2.png",  // 6 Dragon2
    "../game_folder/images/characters/dragon3.png",  // 7 Dragon3
    "../game_folder/images/characters/dragon4.png",  // 8 Dragon4
    "../game_folder/images/characters/wall.png"  // 8 Dragon4
  ],
            // 1
};
