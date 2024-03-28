// Project Title
// Your Name
// Date
//
// Extra for Experts:
//

function preload() {
  characterImage = loadImage("character.png");
  characterImageFlipped = loadImage("characterFlipped.png");
  knightImage = loadImage("knight.png");
}

// Stardew style terrain generators

let terrain = [];
let numberOfLayers = 5;
let tileSize;
let tileY;
let tileHeight;
let characterXPos;
let characterYPos;
let amIHit;
let characterImage;
let knightImage;
let inCombat = false;
let victorious;
let attackButton;
let defendButton;
let characterImageFlipped;

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
  if (!inCombat) {
    background("green");
  }
  else {
    background("teal");
  }

  if (!inCombat) {
    for (let i = terrain.length - 1; i >= 0; i --) {
      fill("brown");
      image(knightImage, terrain[i].x, terrain[i].y, terrain[i].s, terrain[i].s);
    }

    for (let i = terrain.length - 1; i >= 0; i --) {
      detectCharacterTileCollision(terrain[i]);
    }

    drawCharacterInField();
  }
  else {
    battleScreen();
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
      if (random(1) >=  0.98) {
        createTile(cornerX, cornerY);
      } 
    }
  }
}

function drawCharacterInField() {
  image(characterImage, characterXPos, characterYPos, tileSize, tileSize);

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
    if (collideRectRect(terrain[i].x, terrain[i].y, tileSize, tileSize, characterXPos, characterYPos, tileSize, tileSize)) {
      inCombat = true;
      if (victorious) {
        terrain.splice([i], 1);
      }
    }
  }

  fill("teal");
}

function battleScreen() {
  inCombat = true;

  stroke("white");
  fill(40, 20, 20);
  attackButton = rect(width / 7, height / 8 * 6, width / 7 * 2, height / 8);
  defendButton = rect(width / 7 * 4, height / 8 * 6, width / 7 * 2, height / 8);

  image(characterImageFlipped, width / 6, height / 3, tileSize * 7, tileSize * 7);

  image(knightImage, width / 5 * 3.5, height / 3, tileSize * 7, tileSize * 7);
}