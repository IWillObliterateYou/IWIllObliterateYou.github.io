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

let grid;
let squareSize;
const GRID_SIZE = 10; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

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

// for future reference, a better way would be to divide the x/y value by squareSize and then Math.floor it, 
// that would would result in the appropriate row and coloumn in a simple number, 
// as opposed to regenerating the grid in another code piece to detect
function mouseClicked() {
  for (let y = 0; y < grid.length; y ++) {
    for (let x = 0; x < grid[y].length; x ++) {
      if (mouseX > x * squareSize && mouseX < (x + 1) * squareSize && mouseY > y * squareSize &&  mouseY < (y + 1) * squareSize) {
        toggleSquare(x, y);
      }
    }
  }

  // let x = Math.floor(mouseX / squareSize);
  // let y = Math.floor(mouseY / squareSize);

  // console.log(x, y);
  // if (mouseX <= squareSize * GRID_SIZE && mouseY <= squareSize * GRID_SIZE)  {
  //   if (grid[y][x] === 1) {
  //     grid[y][x].push(0);
  //   }
  //   else {
  //     grid[y][x].push(1);
  //   }
  // }
}

function toggleSquare(x, y) {
  if (grid[y][x] === 1) {
    grid[y][x] = 0;
  }
  else {
    grid[y][x] = 1;
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
    text(x, (x + 0.5) * squareSize, (y + 0.5) * squareSize);
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