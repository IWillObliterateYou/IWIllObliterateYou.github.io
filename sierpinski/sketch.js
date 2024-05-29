// Sierpinski triangle


function setup() {
  createCanvas(windowWidth, windowHeight);
}

let initialTriangle = [
  { x: 800, y: 20 },
  { x: 100, y: 750 },
  { x: 1500, y: 750 }
];

function draw() {
  background(220);

  sierpinski(initialTriangle, theDepth);
}

let theDepth = 0;
let theColours = ["black", "red", "blue", "yellow", "brown", "green", "purple", "orange"];

function sierpinski(points, depth) {
  fill(theColours[depth]);

  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);

  if (depth > 0) {
    // upper triangle
    sierpinski([points[0], midPoint(points[0], points[1]), midPoint(points[2], points[0])], depth - 1);
    // lower right triangle
    sierpinski([points[2], midPoint(points[0], points[2]), midPoint(points[1], points[2])], depth - 1);
    // lower left triangle
    sierpinski([points[1], midPoint(points[0], points[1]), midPoint(points[2], points[1])], depth - 1);
  }
}

function midPoint(p1, p2) {
  let newX = (p1.x + p2.x) / 2;
  let newY = (p1.y + p2.y) / 2;

  return { x: newX, y: newY };
}

function mousePressed() {
  if (theDepth < 7) {
    theDepth ++;
  }
}