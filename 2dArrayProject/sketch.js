// 2D Array Project
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// ideas: 
// a map bigger than the canvas, use transformations to move the screen relative to the CharacterData, 
// except if you get too close to the edge, in which case it stops moveing in that direction




// in the level arrays
// 0 is a grass
// 1 is high ground (basically a wall)
// 2 is a basic enemy
// 3 is a pathway
// 5 is the player

let levelOneString;
let grassImage;
let highGroundImage;
let levels;
let highGround;
let grass;
let tileSize;
let playerImage;
let player;
let pathway;
let pathwayImage;
let firstIteration = true;
// these only are for the test level, there magic numbers that will change, but the ratio must be constant
const TILESONSCREENHORIZONTALLY = 21;
const TILESONSCREENVERTICALLY = 11;

const PLAYER = 5;
const HIGHGROUND = 1;
const GRASS = 0;
const PATHWAY = 3;
let movementOfScreenX;
let movementOfScreenY;
let previousPlayerTile = grass; // this reflects the type of tile the current location of the player used to be, by default its grass

function preload() {
  // levelOneString = loadStrings("levelOne.txt");
  grassImage = loadImage("tiles/grass.jpg");
  highGroundImage = loadImage("tiles/highGround.png");
  levels = loadJSON("levels.json");
  playerImage = loadImage("sprites/player.jpg");
  pathwayImage = loadImage("tiles/pathway.jpg");
}

function setup() {
  // make the biggest 20/11 tile display you can
  if (windowHeight < windowWidth / TILESONSCREENHORIZONTALLY * TILESONSCREENVERTICALLY) {
    createCanvas(windowHeight / TILESONSCREENVERTICALLY * TILESONSCREENHORIZONTALLY, windowHeight); // if the window height is smaller than the width would allow
  }
  else {
    createCanvas(windowWidth, windowWidth / TILESONSCREENHORIZONTALLY * TILESONSCREENVERTICALLY); // the height of the window is enough to accomidate the maximum width off the width
  }

  tileSize = width / TILESONSCREENHORIZONTALLY;

  givePropertiesToTiles();
  givePropertiesToNPCsAndPlayer();

  levels.levelOne[player.yPosition][player.xPosition] = 5; // where the player starts off
}

function givePropertiesToTiles() {
  // setting tiles as objects with all their properties
  highGround = {
    isPassible: false,
    texture: highGroundImage,
  };
  grass = {
    isPassible: true,
    texture: grassImage,
  };
  previousPlayerTile = grass; // despite not technically fitting the bill of the function, this is important. 
  // Grass does not exist before this point as an object, and I need an object for previousPlayerTile
  pathway = {
    isPassible: true,
    texture: pathwayImage,
  };
}

function givePropertiesToNPCsAndPlayer() {
  player = {
    yPosition: Math.floor(levels.levelOne.length / 2),
    xPosition: Math.floor(levels.levelOne[Math.floor(levels.levelOne.length / 2)].length / 2),
    texture: playerImage,
  };
}

function draw() {
  background(220);

  drawLevel(levels.levelOne);
}

function determineHowFarOffTheScreenIsFromCentered(level) {
  if (level.length > 21) {
    movementOfScreenX = -1 * (level.length / 2 - 11);
  }
  if (level[player.yPosition].length > 11) {
    movementOfScreenY = -1 * (level[player.yPosition].length / 2 - 6);
  }
  else {
    movementOfScreenX = 0;
    movementOfScreenY = 0;
  }
}

function drawLevel(level) {
  if (firstIteration === true) {
    determineHowFarOffTheScreenIsFromCentered(level);
    firstIteration = false;
  }

  let xTilePosition = Math.floor(mouseX / tileSize);
  let yTilePosition = Math.floor(mouseY / tileSize);

  noStroke();
  // for every element of the level, check which type it is, numbers are converted to objects, and objects are displayed
  for (let y = 0; y < level.length; y++) {
    for (let x = 0; x < level[y].length; x++) {
      if (level[y][x] === HIGHGROUND) {
        // replace numbers with objects in the level array
        level[y][x] = highGround;
      }
      else if (level[y][x] === GRASS) {
        // replace numbers with objects in the level array
        level[y][x] = grass;
      }
      else if (level[y][x] === PLAYER) {
        // replace numbers with objects in the level array
        level[y][x] = player;
      }
      else if (level[y][x] === PATHWAY) {
        // replace numbers with objects in the level array
        level[y][x] = pathway;
      }
      else if (level[y][x] === highGround) {
        // places the image at the location
        image(highGround.texture, (x + movementOfScreenX) * tileSize, (y - 0.5 + movementOfScreenY) * tileSize, tileSize, tileSize * 1.5);
      }
      else if (level[y][x] === grass) {
        // places the image at the location
        image(grass.texture, (x + movementOfScreenX) * tileSize, (y + movementOfScreenY) * tileSize, tileSize, tileSize);
      }
      else if (level[y][x] === pathway) {
        image(pathway.texture, (x + movementOfScreenX) * tileSize, (y + movementOfScreenY) * tileSize, tileSize, tileSize);
      }
      // places the image at the location
      else if (level[y][x] === player) {
        image(player.texture, (x + movementOfScreenX) * tileSize, (y + movementOfScreenY) * tileSize, tileSize, tileSize);
      }
    }
  }
}

function movePlayer(xMovement, yMovement, currentLevel) {
  if (player.xPosition + xMovement >= 0 && player.xPosition + xMovement < currentLevel[player.yPosition].length // checks if you're trying to run off the map horizontally
    && player.yPosition + yMovement >= 0 && player.yPosition + yMovement < currentLevel.length // checks if you're trying to run off the map vertically
    && currentLevel[player.yPosition + yMovement][player.xPosition + xMovement].isPassible === true) { // checks if you're trying to enter a passible tile
    // old location
    let oldPlayerX = player.xPosition;
    let oldPlayerY = player.yPosition;

    // reset old location to be grass
    currentLevel[oldPlayerY][oldPlayerX] = previousPlayerTile;

    previousPlayerTile = currentLevel[player.yPosition + yMovement][player.xPosition + xMovement];

    // move player in code
    player.xPosition += xMovement;
    player.yPosition += yMovement;

    // move player in drawing
    currentLevel[player.yPosition][player.xPosition] = player;
  }
}

function keyPressed() {
  // player movement keys
  // the levelOne is temporary, only for testing. Its basically a magic number

  // moving the player
  // if (key === "w") {
  //   movePlayer(0, -1, levels.levelOne);
  // }
  // if (key === "s") {
  //   movePlayer(0, 1, levels.levelOne);
  // }
  // if (key === "a") {
  //   movePlayer(-1, 0, levels.levelOne);
  // }
  // if (key === "d") {
  //   movePlayer(1, 0, levels.levelOne);
  // }

  // // moving the array
  // if (key === "w") {
  //   movementOfScreenY -= tileSize;
  //   movePlayer(0, 1, levels.levelOne);
  // }
  // if (key === "s") {
  //   movementOfScreenY += tileSize;
  //   movePlayer(0, -1, levels.levelOne);
  // }
  // if (key === "a") {
  //   movementOfScreenX -= tileSize;
  //   movePlayer(1, 0, levels.levelOne);
  // }
  // if (key === "d") {
  //   movementOfScreenX += tileSize;
  //   movePlayer(-1, 0, levels.levelOne);
  // }

  // player.yPosition + 10 >= levels.levelOne.length

  // the levels.levelOne is a magic number

  if (player.yPosition - 5 <= 0 || player.yPosition + 5 >= levels.levelOne.length - 1) {
    if (key === "w") {
      movePlayer(0, -1, levels.levelOne);
    }
    else if (key === "s") {
      movePlayer(0, 1, levels.levelOne);
    }
  }
  else if (key === "w") {
    movementOfScreenY += 1;
    movePlayer(0, -1, levels.levelOne);
  }
  else if (key === "s") {
    movementOfScreenY -= 1;
    movePlayer(0, 1, levels.levelOne);
  }

  // left off here working on stopping moving the array and instead moving the character when you reach the screens edge

  if (player.xPosition - 10 <= 0 || player.xPosition + 10 >= levels.levelOne[player.yPosition].length - 1) { // are you close enough to the edge of the screen to prevent screen scroll
    if (key === "a") {
      movePlayer(-1, 0, levels.levelOne);
    }
    else if (key === "d") {
      movePlayer(1, 0, levels.levelOne);
    }
  }
  else {
    if (key === "a") {
      movementOfScreenX += 1;
      movePlayer(-1, 0, levels.levelOne);
    }
    if (key === "d") {
      movementOfScreenX -= 1;
      movePlayer(1, 0, levels.levelOne);
    }
  }
}