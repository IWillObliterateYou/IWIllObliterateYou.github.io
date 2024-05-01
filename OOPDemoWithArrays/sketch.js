// Walker OOP Demo

class Walker {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.stepSize = 5;
    this.color = color;
    this.radius = 5;
  }

  display() {
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      // move up
      this.y -= this.stepSize;
    }
    else if (choice < 50) {
      // move down
      this.y += this.stepSize;
    }
    else if (choice < 75) {
      // move right
      this.x += this.stepSize;
    }
    else {
      // move down
      this.x -= this.stepSize;
    }
  }
}

let theStriders = [];
let theOne;
let theTwo;
let theThree;

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();
}

function draw() {
  let theColour = color(random(255), random(255), random(255));
  let walkyBoi = new Walker(mouseX, mouseY, theColour);
  theStriders.push(walkyBoi);

  for (let aWalker of theStriders) {
    aWalker.move();
    aWalker.display();
  }
}

function mousePressed() {
  let theColour = color(random(255), random(255), random(255));
  let walkyBoi = new Walker(mouseX, mouseY, theColour);
  theStriders.push(walkyBoi);
}