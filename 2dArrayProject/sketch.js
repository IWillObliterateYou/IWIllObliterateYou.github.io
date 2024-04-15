// 2D Array Project
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// in the level arrays
// 0 is an empty space
// 1 is a wall
// 2 is a basic enemy
// 

let tileSize = 20;
let levelOneString;

function preload() {
  let levelOneArray = [];
  levelOneString = loadStrings("levelOne.txt");
  for (let x = 0; x < levelOneString.length; x ++) {
    if (levelOneString[x] === "|") {
levelOneString.splice() // left off here  fawefeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      for (let y = 0; y < levelOneString.length; y ++) {
        if (levelOneString[y] === ",") {

        }
      }
    }
  }
}





function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function drawLevel(level) {
  let xTilePosition = Math.floor(mouseX / tileSize);
  let yTilePosition = Math.floor(mouseY / tileSize);


}