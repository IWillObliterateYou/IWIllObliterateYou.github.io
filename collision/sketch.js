// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

let hit = false;

function draw() {
  background(255);
  rect(200, 200, 100, 150);
  rect(mouseX, mouseY, 50, 75);

  hit = collideRectRect(200, 200, 100, 150, mouseX, mouseY, 50, 75);

  if (hit) {
    stroke("red");
    color("red");
  } 
  else {
    stroke("black");
  }
  console.log("colliding?", hit);
}

  // Use vectors as input:
  // const rect_start = createVector(200, 200);
  // const rect_size  = createVector(100, 150);
  // const mouse      = createVector(mouseX, mouseY);
  // const rect2_size = createVector(50, 75);
  // hit = collideRectRectVector(rect_start, rect_size, mouse, rect2_size);