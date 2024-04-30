// 2D Array Project
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

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
const PLAYER = 5;
const HIGHGROUND = 1;
const GRASS = 0;
const PATHWAY = 3;
let movementOfScreenX;
let movementOfScreenY;
let previousPlayerTile = grass; // this reflects the type of tile the current location of the player used to be, by default its grass

// these only are for the test level, there magic numbers that will change, but the ratio must be constant
const TILES_ON_SCREEN_HORIZONTALLY = 21;
const TILES_ON_SCREEN_VERTICALLY = 11;


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
  if (windowHeight < windowWidth / TILES_ON_SCREEN_HORIZONTALLY * TILES_ON_SCREEN_VERTICALLY) {
    createCanvas(windowHeight / TILES_ON_SCREEN_VERTICALLY * TILES_ON_SCREEN_HORIZONTALLY, windowHeight); // if the window height is smaller than the width would allow
  }
  else {
    createCanvas(windowWidth, windowWidth / TILES_ON_SCREEN_HORIZONTALLY * TILES_ON_SCREEN_VERTICALLY); // the height of the window is enough to accomidate the maximum width off the width
  }

  tileSize = width / TILES_ON_SCREEN_HORIZONTALLY;

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
  if (currentLevel.length > TILES_ON_SCREEN_HORIZONTALLY) {
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
    && player.yPosition + yMovement >= 0 && player.yPosition + yMovement < currentLevel.length) { // checks if you're trying to run off the map vertically

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

  // screen scroll

  if (yMovement === 1 && // if you are moving down and one of the following are true, scroll activate screen scroll
    (player.yPosition === Math.floor(TILES_ON_SCREEN_VERTICALLY / 2 + 1) // you are on the cross line at the top (the cross line is the line where you deactivate screen scroll)
      || 
      player.yPosition > Math.floor(TILES_ON_SCREEN_VERTICALLY / 2)  // you are before the cross line at the top and before the cross line on the bottom
      && player.yPosition < currentLevel.length - Math.floor(TILES_ON_SCREEN_VERTICALLY / 2))) {

    movementOfScreenY -= 1;
  }
  // I think I've found an honest to goodness bug beyond my expertise. When I am in a position where I try to move down and the 
  // player.yPosition is 5 the screen does not scroll and when the player.yPosition is 4 it does. I am baffled
  // if (yMovement === 1 && 
  //    player.yPosition === 5) {

  //   movementOfScreenY -= 1;
  // }

  else if (yMovement === -1 &&
    (player.yPosition === Math.floor(TILES_ON_SCREEN_VERTICALLY / 2) // on the top cross line
    || 
    player.yPosition > Math.floor(TILES_ON_SCREEN_VERTICALLY / 2)  // you are before the cross line at the top and before the cross line on the bottom
    && player.yPosition < currentLevel.length - Math.floor(TILES_ON_SCREEN_VERTICALLY / 2 + 1))) {

    movementOfScreenY += 1;
  }

  else if (xMovement === 1 &&
    (player.xPosition === Math.floor(TILES_ON_SCREEN_HORIZONTALLY / 2 + 1)
      || 
      player.xPosition > Math.floor(TILES_ON_SCREEN_HORIZONTALLY / 2)
      && player.xPosition < currentLevel[player.yPosition].length - Math.floor(TILES_ON_SCREEN_HORIZONTALLY / 2))) {

    movementOfScreenX -= 1;
  }

  else if (xMovement === -1 &&
    (player.xPosition === currentLevel[player.yPosition].length - Math.floor(TILES_ON_SCREEN_HORIZONTALLY / 2 + 1)
      || 
      (player.xPosition > Math.floor(TILES_ON_SCREEN_HORIZONTALLY / 2)
      && player.xPosition < currentLevel[player.yPosition].length - Math.floor(TILES_ON_SCREEN_HORIZONTALLY / 2 + 2)))) {

    movementOfScreenX += 1;
  }

  // again I have encountered this bizarre bug, if I input my if statement into the console at a player.xPosition of 21 it returns false, 
  // yet when I run the code, it moves the screen as if that exact statement decided to turn itself on when it shouldn't
  // else if (xMovement === -1 &&
  //   (player.xPosition === 20
  //     || 
  //     player.xPosition > 10
  //     && player.xPosition < 20)) {

  //   movementOfScreenX += 1;
  // }
}

function keyPressed() {
  // player movement keys
  // checks if you are too close to the edge of the screen to screen scroll

  // vertical movement 
  // to be clear: the cross line is the exact line at which the movement switches from a screen scroll to non-centered movement

  // behind cross line 
  if (key === "w") {
    movePlayer(0, -1);
  }
  else if (key === "s") {
    movePlayer(0, 1);
  }

  // horizontal movement

  if (key === "a" && currentLevel[player.yPosition][player.xPosition - 1].isPassible === true) { // are you trying to enter a nonsolid tile to your left
    movePlayer(-1, 0);
  }
  else if (key === "d" && currentLevel[player.yPosition][player.xPosition + 1].isPassible === true) { // are you trying to enter a nonsolid tile to your right
    movePlayer(1, 0);
  }
}