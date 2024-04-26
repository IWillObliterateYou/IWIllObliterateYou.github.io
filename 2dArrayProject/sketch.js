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
let currentLevel;
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

function determineHowFarOffTheScreenIsFromCentered() {
  // vertical
  if (currentLevel.length > 21) {
    movementOfScreenX = -1 * Math.floor(currentLevel.length / 2 - 10);
  }
  // horizontal
  if (currentLevel[player.yPosition].length > 11) {
    movementOfScreenY = -1 * Math.floor(currentLevel[player.yPosition].length / 2 - 5);
  }
  else {
    movementOfScreenX = 0;
    movementOfScreenY = 0;
  }
}

function drawLevel(level) {
  // the only purpose of the local variable "level" is to make it easier to call the function drawLevel,
  // ex. now when you call it, that's all you need to do, as opposed to set the level and then call it
  currentLevel = level; // do to the reliance on the "currentLevel" variable, this is an incredibly important line
  if (firstIteration === true) {
    determineHowFarOffTheScreenIsFromCentered();
    firstIteration = false;
  }

  let xTilePosition = Math.floor(mouseX / tileSize);
  let yTilePosition = Math.floor(mouseY / tileSize);

  noStroke();
  // for every element of the level, check which type it is, numbers are converted to objects, and objects are displayed
  for (let y = 0; y < currentLevel.length; y++) {
    for (let x = 0; x < currentLevel[y].length; x++) {
      if (currentLevel[y][x] === HIGHGROUND) {
        // replace numbers with objects in the level array
        currentLevel[y][x] = highGround;
      }
      else if (currentLevel[y][x] === GRASS) {
        // replace numbers with objects in the level array
        currentLevel[y][x] = grass;
      }
      else if (currentLevel[y][x] === PLAYER) {
        // replace numbers with objects in the level array
        currentLevel[y][x] = player;
      }
      else if (currentLevel[y][x] === PATHWAY) {
        // replace numbers with objects in the level array
        currentLevel[y][x] = pathway;
      }
      else if (currentLevel[y][x] === highGround) {
        // places the image at the location
        image(highGround.texture, (x + movementOfScreenX) * tileSize, (y - 0.5 + movementOfScreenY) * tileSize, tileSize, tileSize * 1.5);
      }
      else if (currentLevel[y][x] === grass) {
        // places the image at the location
        image(grass.texture, (x + movementOfScreenX) * tileSize, (y + movementOfScreenY) * tileSize, tileSize, tileSize);
      }
      else if (currentLevel[y][x] === pathway) {
        image(pathway.texture, (x + movementOfScreenX) * tileSize, (y + movementOfScreenY) * tileSize, tileSize, tileSize);
      }
      // places the image at the location
      else if (currentLevel[y][x] === player) {
        image(player.texture, (x + movementOfScreenX) * tileSize, (y + movementOfScreenY) * tileSize, tileSize, tileSize);
      }
    }
  }
}

function movePlayer(xMovement, yMovement) {
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
  // currently very easy to de-center the character, in order to fix I need to determine if I'm close enough to stop screen scroll on a w, but not so close as to prevent a screen scrolled s


  // player movement keys
  // checks if you are too close to the edge of the screen to screen scroll
  if (player.yPosition - 5 < 0 || player.yPosition + 5 >= currentLevel.length) {
    if (key === "w") {
      movePlayer(0, -1);
    } 
    else if (key === "s" && player.yPosition - 5 === 0) {
      movementOfScreenY -= 1;
      movePlayer(0, 1);
    }
    else if (key === "s") {
      movePlayer(0, 1);
    }
  }
  // if you are stopped from moving by a solid object, the array is not stopped

  // bug /\

  else if (key === "w") {
    movementOfScreenY += 1;
    movePlayer(0, -1);
  }
  else if (key === "s") {
    movementOfScreenY -= 1;
    movePlayer(0, 1);
  }

  if (player.xPosition - 10 <= 0 || player.xPosition + 10 >= currentLevel[player.yPosition].length) { // are you close enough to the edge of the screen to prevent screen scroll
    if (key === "a") {
      movePlayer(-1, 0);
    }
    else if (key === "d") {
      movePlayer(1, 0);
    }
  }
  else {
    if (key === "a") {
      movementOfScreenX += 1;
      movePlayer(-1, 0);
    }
    if (key === "d") {
      movementOfScreenX -= 1;
      movePlayer(1, 0);
    }
  }
}