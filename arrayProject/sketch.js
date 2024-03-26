// Project Title
// Your Name
// Date
//
// Extra for Experts:
//


// Stardew style terrain generators

let terrain = [];
let numberOfLayers = 5;
let tileSize;
let tileY;
let tileHeight;
let characterXPos;
let characterYPos;
let amIHit;
let i;

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

  for (let i = terrain.length - 1; i >= 0; i --) {
    fill("brown");
    square(terrain[i].x, terrain[i].y, terrain[i].s);
    detectCharacterTileCollision(terrain[i]);
  }

  drawCharacter();
}

function createTile(cornerX, cornerY) {
  let thisTile = {
    x: cornerX,
    y: cornerY,
    s: tileSize,
    isTileHit: false,
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

function detectCharacterTileCollision(i) {
  for (let i = terrain.length - 1; i >= 0; i --) {
    let amIHit = collideRectRect(terrain[i].x, terrain[i].y, tileSize, tileSize, characterXPos, characterYPos, tileSize, tileSize);
    terrain[i].isTileHit = amIHit;


    // broke colour again
    
    if (amIHit) {
      fill("red");
    }
    else {
      fill("teal");
    }
  }
}