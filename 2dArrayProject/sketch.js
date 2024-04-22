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
const TILESONSCREENHORIZONTALLY = 10;
let tileSize;
let playerImage;
let player;
let pathway;
let pathwayImage;
const PLAYER = 5;
const HIGHGROUND = 1;
const GRASS = 0;
const PATHWAY = 3;
let movementOfScreenX = 0;
let movementOfScreenY = 0;
let previousPlayerTile = grass; // this reflects the type of tile the current location of the player used to be

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
  if (windowHeight < windowWidth / 20 * 11) {
    createCanvas(windowHeight / 11 * 20, windowHeight); // if the window height is smaller than the width would allow
  }
  else {
    createCanvas(windowWidth, windowWidth / 20 * 11); // the height of the window is enough to accomidate the maximum width off the width
  }

  tileSize = width / 20;

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
    xPosition: 4,
    yPosition: 4,
    texture: playerImage,
  };
}

function draw() {
  background(220);

  drawLevel(levels.levelOne);
}

function drawLevel(level) {
  let xTilePosition = Math.floor(mouseX / tileSize);
  let yTilePosition = Math.floor(mouseY / tileSize);

  noStroke();
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
        image(highGround.texture, x * tileSize + movementOfScreenX, (y - 0.5) * tileSize + movementOfScreenY, tileSize, tileSize * 1.5);
      }
      else if (level[y][x] === grass) {
        // places the image at the location
        image(grass.texture, x * tileSize + movementOfScreenX, y * tileSize + movementOfScreenY, tileSize, tileSize);
      }
      else if (level[y][x] === pathway) {
        image(pathway.texture, x * tileSize + movementOfScreenX, y * tileSize + movementOfScreenY, tileSize, tileSize);
      }
      // places the image at the location
      else if (level[y][x] === player) {
        image(player.texture, x * tileSize + movementOfScreenX, y * tileSize + movementOfScreenY, tileSize, tileSize);
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

  // idea, move the array instead of the player to achieve the moving with the player illusion

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

  // moving the array
  if (key === "w") {
    movementOfScreenY -= tileSize;
  }
  if (key === "s") {
    movementOfScreenY += tileSize;
  }
  if (key === "a") {
    movementOfScreenX -= tileSize;
  }
  if (key === "d") {
    movementOfScreenX += tileSize;
  }
}