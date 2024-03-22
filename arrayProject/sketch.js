// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// Stardew style terrain generators

let terrain = [];
let numberOfLayers = 5;
let tileSize;
let tileY;
let tileHeight;
let characterXPos;
let characterYPos;
let hit;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // generateField;
  tileHeight = height / tileSize;
  tileSize = height / 25;
  generateField();

  characterXPos = width / 2;
  characterYPos = height / 2;
}

function draw() {
  background("green");

  for (let thisTile of terrain) {
    fill("brown");
    square(thisTile.x, thisTile.y, thisTile.s);
  }

  drawCharacter();

  for (let thisTile of terrain) {
    hit = collideRectRect(thisTile.x, thisTile.y, thisTile.x + tileSize, thisTile.y + tileSize);
    console.log(hit);
  }
}

function createTile(cornerX, cornerY) {
  let thisTile = {
    x: cornerX,
    y: cornerY,
    s: tileSize,
  };
  terrain.push(thisTile);
}

function generateField() {
  for (let cornerY = 0; cornerY < height; cornerY +=  tileSize) { // generating columns
    for (let cornerX = 0; cornerX < width; cornerX += tileSize) { // generating rows
      if (random(1) >=  0.99) {
        createTile(cornerX, cornerY);
      } 
    }
  }
}

function drawCharacter() {
  fill("teal");
  square(characterXPos, characterYPos, tileSize);

  if (keyIsDown(68)) { // moves character right with "d"
    characterXPos += 10;
    if (characterXPos + tileSize > width) {
      characterXPos = width - tileSize;
    }
  }
  if (keyIsDown(65)) { // moves character left with "a"
    characterXPos -= 10;
    if (characterXPos < 0) {
      characterXPos = 0;
    }
  }
  if (keyIsDown(83)) { // moves character right with "s"
    characterYPos += 10;
    if (characterYPos + tileSize > height) {
      characterYPos = height - tileSize;
    }
  }
  if (keyIsDown(87)) { // moves character left with "w"
    characterYPos -= 10;
    if (characterYPos < 0) {
      characterYPos = 0;
    }
  }
}