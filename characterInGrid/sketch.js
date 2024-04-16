// Character Movement in 2D Grid Demo
// Your Name
// April 15th

// if randomizing your grid, do this: 

let grid;
let squareSize;
const GRID_SIZE = 10; 
const PLAYER = 2;
const WALL = 1;
const GRASS = 0;
let player = {
  x: 0,
  y: 0,
};
let grassTexture;
let wallTexture;
let backgroundMusic;
let cantWalkThere;
let gameState = "startScreen";

function preload() {
  grassTexture = loadImage("grassTexture.png");
  wallTexture = loadImage("wallTexture.png");
  backgroundMusic = loadSound("TownTheme.mp3");
  cantWalkThere = loadSound("monster7.wav");
}


function setup() {
  // use the smaller window dimesion to scale the canvas
  if (windowHeight > windowWidth) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }

  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  squareSize = width / grid.length;

  // add player to grid
  grid[player.y][player.x] = PLAYER;


  // equalize sounds
  backgroundMusic.setVolume(0.5);
  cantWalkThere.setVolume(1.0);
}

function draw() {
  if (gameState === "startScreen") {
    background(0);
  }
  else if (gameState === "game") {
    background(220);
    drawGrid();
    // labelGrid();
  }
}

function windowResized() {
  // use the smaller window dimesion to scale the canvas
  if (windowHeight > windowWidth) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
        
  squareSize = width / grid.length;
}

function mouseClicked() {
  let x = Math.floor(mouseX / squareSize);
  let y = Math.floor(mouseY / squareSize);

  if (x < GRID_SIZE && y < GRID_SIZE) {
    toggleSquare(x, y);
  }
}

function makeItBlack(x, y) {
  toggleSquare(x, y); // clicked square

  toggleSquare(x + 1, y); // square to the right

  toggleSquare(x - 1, y); // square to the left

  toggleSquare(x, y + 1); // square above

  toggleSquare(x, y - 1); // square below
}

function toggleSquare(x, y) {
  if (x < GRID_SIZE && x >= 0 && y < GRID_SIZE && y >= 0) {
    if (grid[y][x] === WALL) {
      grid[y][x] = GRASS;
    }
    else if (grid[y][x] === GRASS) {
      grid[y][x] = WALL;
    }
  }
}

function labelGrid(cols, rows) {
  let x = Math.floor(mouseX / squareSize);
  let y = Math.floor(mouseY / squareSize);

  if (mouseX <= squareSize * GRID_SIZE && mouseY <= squareSize * GRID_SIZE)  {
    textSize(30);
    textAlign(CENTER, CENTER);
    if (grid[y][x] === WALL) {
      fill("white");
    }
    else if (grid[y][x] === GRASS) {
      fill("black");
    }
    text("x" + x + " " + "y" + y, (x + 0.5) * squareSize, (y + 0.5) * squareSize);
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "q") {
    grid = generateBlackGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e") {
    grid = generateWhiteGrid(GRID_SIZE, GRID_SIZE);
  }
  // if you wanted to be able to hold down the button you should put it in the draw loop and add a time restriction
  if (key === "w") {
    movePlayer(player.x + 0, player.y - 1);
  }
  if (key === "a") {
    movePlayer(player.x - 1, player.y - 0);
  }
  if (key === "s") {
    movePlayer(player.x, player.y + 1);
  }
  if (key === "d") {
    movePlayer(player.x + 1, player.y);
  }
  if (key === " "  && gameState === "startScreen") {
    gameState = "game";
    backgroundMusic.play();
    backgroundMusic.loop();
  }
}

function movePlayer(xToBe, yToBe) {
  // don't move off grid and only into grass
  if (xToBe < GRID_SIZE && xToBe >= 0 && yToBe < GRID_SIZE && yToBe >= 0 
    && grid[yToBe][xToBe] === GRASS) {
    // old location
    let oldPlayerX = player.x;
    let oldPlayerY = player.y;

    // move player in code
    player.x = xToBe;
    player.y = yToBe;

    // reset old location to be grass
    grid[oldPlayerY][oldPlayerX] = GRASS;

    // move player in drawing
    grid[player.y][player.x] = PLAYER;
  }
  else if (grid[yToBe][xToBe] === WALL) {
    cantWalkThere.play();
  }
}

function generateBlackGrid(rows, cols) {
  let emptyArray = [];

  for (let y = 0; y < rows; y ++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x ++) {
      emptyArray[y].push(1);
    }
  }

  return emptyArray;
}

function generateWhiteGrid(rows, cols) {
  let emptyArray = [];

  for (let y = 0; y < rows; y ++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x ++) {
      emptyArray[y].push(0);
    }
  }

  return emptyArray;
}

function generateRandomGrid(cols, rows) {
  let emptyArray = [];

  for (let y = 0; y < rows; y ++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x ++) {
      // half the time
      if (random(100) < 50) {
        emptyArray[y].push(0);
      }
      else {
        emptyArray[y].push(1);
      }
    }
  }
  
  return emptyArray;
}

function drawGrid() {
  noStroke();
  for (let y = 0; y < grid.length; y ++) {
    for (let x = 0; x < grid[y].length; x ++) {
      if (grid[y][x] === WALL) {
        image(wallTexture, x * squareSize, y * squareSize, squareSize, squareSize);
      }
      else if (grid[y][x] === GRASS) {
        image(grassTexture, x * squareSize, y * squareSize, squareSize, squareSize);
      }
      else if (grid[y][x] === PLAYER) {
        fill("red");
        square(x * squareSize, y * squareSize, squareSize);
      }
    }
  }
}