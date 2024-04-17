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
// 0 is an empty space
// 1 is a wall
// 2 is a basic enemy
// 

let levelOneString;
let grassImage;
let highGroundImage;
let levels;
let highGround;
let grass;
const TILESONSCREENHORIZONTALLY = 10;
let tileSize;

function preload() {
  // levelOneString = loadStrings("levelOne.txt");
  grassImage = loadImage("tiles/grass.jpg");
  highGroundImage = loadImage("tiles/highGround.jpg");
  levels = loadJSON("levels.json");
}

function setup() {
  // make the biggest 16/9 display you can
  if (windowHeight < windowWidth / 16 * 9) {
    createCanvas(windowHeight / 9 * 16, windowHeight); // if the window height is smaller than the width would allow
  }
  else {
    createCanvas(windowWidth, windowWidth / 16 * 9); // the height of the window is enough to accomidate 16/9 off the width
  }

  tileSize = width / 20;

  givePropertiesToTiles();
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
}

function draw() {
  background(220);

  drawLevel(levels.levelOne);
}

function drawLevel(level) {
  let xTilePosition = Math.floor(mouseX / tileSize);
  let yTilePosition = Math.floor(mouseY / tileSize);

  noStroke();
  for (let y = 0; y < level.length; y ++) {
    for (let x = 0; x < level[y].length; x ++) {
      if (level[y][x] === 1) {
        image(highGround.texture, x * tileSize, y * tileSize, tileSize, tileSize);
      }
      else if (level[y][x] === 0) {
        image(grass.texture, x * tileSize, y * tileSize, tileSize, tileSize);
      }
      // else if (level[y][x] === PLAYER) {
      //   fill("red");
      //   square(x * tileSize, y * tileSize, tileSize);
      // }
    }
  }
}