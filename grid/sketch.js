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
            // [1, 1, 0, 0, 1, 0, 1, 0],
            // [1, 0, 1, 1, 1, 0, 0],
            // [0, 0, 0, 1], 
            // [0, 0, 1, 1],
            // [0, 1, 0, 1]];

// if randomizing your grid, do this: 

let grid;
let squareSize;
const GRID_SIZE = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  // this is dumb, should check whether to use height or width
  if (height > width) {
    squareSize = width / grid.length;
  }
  else {
    squareSize = height / grid[0].length;
  }
}

function draw() {
  background(220);

  drawGrid();
}

function mouseClicked() {
  for (let y = 0; y < grid.length; y ++) {
    for (let x = 0; x < grid[y].length; x ++) {
      if (mouseX > x * squareSize && mouseX < (x + 1) * squareSize && mouseY > y * squareSize && (y + 1) * squareSize) {
        if (grid[y][x] === 1) {
          grid[y][x] = 0;
        }
        else {
          grid[y][x] = 1;
        }
      }
    }
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
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
