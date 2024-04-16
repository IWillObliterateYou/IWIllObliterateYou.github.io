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

let tileSize = 20;
let levelOneString;
let grassImage;
let highGroundImage;

function preload() {
  levelOneString = loadStrings("levelOne.txt");
  grassImage = loadImage("grass.jpg"); /// not indicating folder
  highGroundImage = loadImage("highGround.jpg");
}

// tiles
const HIGHGROUND = {
  isPassible: false,
  texture: highGroundImage,
};

const GRASS = {
  isPassible: true,
  texture: grassImage,
};


let levelOne = [[1, 1, 1, 1, 1, 1, 1, 1, 1 ,1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1 ,1]];



function convertTxtLevelToArray(txtName) {
// im giving up for now


  let levelOneArray = [];
  let tempArray = [];

  // for (let y = 0; y < txtName.length; y ++) {
  //   if (levelOneString[y] === "|") {
  //     levelOneArray.push([]);
  //     tempArray = levelOneArray.splice(0, y);

  //     for (let x = 0; x < txtName.length; x ++) {
  //       if (levelOneString[x] === ",") {
  //         levelOneArray[y].splice();
  //       }
  //       else if (levelOneString[x] === "0") {
  //         levelOneArray[y].push(0);
  //       }
  //       else if (levelOneString[x] === "1") {
  //         levelOneArray[y].push(1);
  //       }
  //     }
  //   }
  // }
  // return levelOneArray;

  // for (let y = 0; y < txtName.length; y ++) {
  //   for (let x = 0; x < txtName.length; x ++) { 
  //     if (txtName[y][x] === "1") {
  //       txtName[y].push(1);
  //     }
  //     else if (txtName[] === "0") {
  //       txtName.psuH(0);
  //     }
  //   }
  // }
}



function setup() {
  createCanvas(windowWidth, windowHeight);

  levelOne = convertTxtLevelToArray(levelOneString);
}

function draw() {
  background(220);

  drawLevel(levelOne);
}

function drawLevel(level) {
  let xTilePosition = Math.floor(mouseX / tileSize);
  let yTilePosition = Math.floor(mouseY / tileSize);

  noStroke();
  for (let y = 0; y < level.length; y ++) {
    for (let x = 0; x < level[y].length; x ++) {
      if (level[y][x] === HIGHGROUND) {
        image(HIGHGROUND.texture, x * tileSize, y * tileSize, tileSize, tileSize);
      }
      else if (grid[y][x] === GRASS) {
        image(GRASS.texture, x * tileSize, y * tileSize, tileSize, tileSize);
      }
      // else if (level[y][x] === PLAYER) {
      //   fill("red");
      //   square(x * tileSize, y * tileSize, tileSize);
      // }
    }
  }
}