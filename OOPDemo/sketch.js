// Walker OOP Demo

class Walker {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.stepSize = 15;
    this.color = color;
    this.radius = 3;
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
      line(this.x, this.y, this.x, this.y + this.stepSize);
    }
    else if (choice < 50) {
      // move down
      this.y += this.stepSize;
      line(this.x, this.y, this.x, this.y - this.stepSize);
    }
    else if (choice < 75) {
      // move right
      this.x += this.stepSize;
      line(this.x, this.y, this.x - this.stepSize, this.y);
    }
    else {
      // move down
      this.x -= this.stepSize;
      line(this.x, this.y, this.x + this.stepSize, this.y);
    }
  }
}

let theOne;
let theTwo;
let theThree;

function setup() {
  createCanvas(windowWidth, windowHeight);

  theOne = new Walker(width / 2, height / 2, "red");
  theTwo = new Walker(200, 400, "green");
  theThree = new Walker(800, 600, "blue");
}

function draw() {
  theOne.move();
  theOne.display();

  theTwo.move();
  theTwo.display();

  theThree.move();
  theThree.display();
}
