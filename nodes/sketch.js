// Connected nodes demo

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let steve = new MovingPoint(width / 2, height / 2);
  points.push(steve);
}

function draw() {
  background(0);

  let steve = new MovingPoint(mouseX, mouseY);
  points.push(steve);

  for (let point of points) {
    point.update();
    point.connectTo(points); // draw the lines first
  }
  for (let point of points) {
    point.display(); // draw the circles after so they're on top
  }
}

function mousePressed() {
  let steve = new MovingPoint(mouseX, mouseY);
  points.push(steve);
}

class MovingPoint {
  constructor(x, y) {
    this.speed = 5;
    this.radius = 15;
    this.maxSize = 50;
    this.minSize = 15;
    this.reach = 150;
    this.x = x;
    this.y = y;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.01;
    this.color = color(random(255), random(255), random(255));
  }
  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }
  update() {
    this.move();
    this.wrapAroundScreen();
    this.adjustSizeWithMouse();
  }
  connectTo(points) {
    for (let otherPoint of points) {
      if (this !== otherPoint) {
        let pointDistance = dist(this.x, this.y, otherPoint.x, otherPoint.y);
        if (pointDistance < this.reach) {
          stroke(this.color);
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
      }
    }
  }
  move() {
    // pick random direction of movement
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    // scale movement speed
    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);

    // move point
    this.x += this.dx;
    this.y += this.dy;

    // move on the graph
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }
  wrapAroundScreen() {
    // wrap around the screen if you fall off
    if (this.x > width) {
      this.x -= width;
    }
    else if (this.x < 0) {
      this.x += width;
    }
    else if (this.y > height) {
      this.y -= height;
    }
    else if (this.y < 0) {
      this.y += height;
    }
  }
  adjustSizeWithMouse() {
    let mouseDistance = dist(this.x, this.y, mouseX, mouseY);
    if (mouseDistance < 100) {
      let theSize = map(mouseDistance, 0, this.reach, this.maxSize, this.minSize);
      this.radius = theSize;
    }
    else {
      this.radius = this.minSize;
    }
  }
}