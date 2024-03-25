// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - slicing arrays


// Stardew style terrain generators

let terrain = [];
let numberOfLayers = 5;
let tileSize;
let tileY;
let tileHeight;
let characterXPos;
let characterYPos;
let amIHit;

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
}

function createTile(cornerX, cornerY) {
  let thisTile = {
    x: cornerX,
    y: cornerY,
    s: tileSize,
    isHit: false,
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

  for (let thisTile of terrain) {
    let amIHit = collideRectRect(thisTile.x, thisTile.y, tileSize, tileSize, characterXPos, characterYPos, tileSize, tileSize);
    thisTile.isHit = amIHit;

    if (amIHit) {
      fill("red");
    }
  }

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

function tileKiller() {
// there is a command for this


  for (let i = 0; i < terrain.length; i ++) {
    if (terrain[i].isHit) {
      let deadStorage = terrain.splice(i);
      terrain.pop();
      terrain.push(deadStorage);
    }
  }
}