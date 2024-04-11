// 2D Grid
// Your Name
// April 9th
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// if hardcoding a level, I'd use something like this: 

// let grid = [[1, 0, 0, 1], 
//             [0, 1, 0, 1],
//             [0, 0, 0, 1],
//             [1, 1, 0, 0, 1, 0, 1, 0],
//             [1, 0, 1, 1],
//             [0, 0, 0, 1], 
//             [0, 0, 1, 1],
//             [0, 1, 0, 1]];

// if randomizing your grid, do this: 

let toggleType = "self";
let grid;
let squareSize;
const GRID_SIZE = 10; 

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

  // this absolutely works, but if you wanted to do something extra, like center the grid, 
  // it would be better to size it by scaling the whole canvas, rather than the grid to the canvas
  // as done above
  // if (height > width) {
  //   squareSize = width / grid.length;
  // }
  // else {
  //   squareSize = height / grid[0].length;
  // }
}

function draw() {
  background(220);

  drawGrid();
  labelGrid();
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

  if (x < GRID_SIZE && y < GRID_SIZE && toggleType === "others") {
    makeItBlack(x, y);
  }
  else if (toggleType === "self") {
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
    if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
    else {
      grid[y][x] = 1;
    }
  }
}

function labelGrid(cols, rows) {
  let x = Math.floor(mouseX / squareSize);
  let y = Math.floor(mouseY / squareSize);

  if (mouseX <= squareSize * GRID_SIZE && mouseY <= squareSize * GRID_SIZE)  {
    textSize(30);
    textAlign(CENTER, CENTER);
    if (grid[y][x] === 1) {
      fill("white");
    }
    else {
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
  if (key === "n") {
    toggleType = "others";
  }
  if (key === "s") {
    toggleType = "self";
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
      if (grid[y][x] === 1) {
        fill("black");
      }
      else {
        fill("white");
      }
      square(x * squareSize, y * squareSize, squareSize);
    }
  }
}