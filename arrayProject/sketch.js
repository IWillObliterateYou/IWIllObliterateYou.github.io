// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// Stardew style terrain generators

let terrainLevelOne = [];
let numberOfLayers = 20;
let tileSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateLayer;
}

function draw() {
  background("green");
  for (let thisTile of terrainLevelOne) {
    square()
  }
}

function createTile(cornerX, tileSize) {
  let thisTile = {
    x: cornerX,
    y: 0,
    s: tileSize,
  }
  terrainLevelOne.push;
}

function generateLayer() {
  for (let i; i < width / tileSize; i ++) {
    createTile(i * tileSize, tileSize);
  }
}