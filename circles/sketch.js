// Arrays and Objects Notation
// Circles demo

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();
  spawnBall(width / 2, height / 2);
}

function draw() {
  background(220);

  moveBalls();
  displayBalls();
}

function moveBalls() {
  for (let ball of ballArray) {
    // lateral teleporting if hitting the side
    if (ball.x >= width + ball.radius) {
      ball.x = 0 - ball.radius;
    } 
    else if (ball.x <= 0 - ball.radius) {
      ball.x = width + ball.radius;
    }
  
    // vertical teleporting if hitting the floor/ceiling
    if (ball.y >= height + ball.radius) {
      ball.y = 0 - ball.radius;
    } 
    else if (ball.y <= 0 - ball.radius) {
      ball.y = height + ball.radius;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

  }
}

function displayBalls() {
  for (let ball of ballArray) {
    fill(ball.color);
    circle(ball.x, ball.y, ball.radius * 2);
  }
}

function spawnBall(initialX, initialY) {
  let ball = {
    x: initialX,
    y: initialY,
    radius: random(15, 31),
    color: color(random(255), random(255), random(255)),
    dx: random(-5, 6),
    dy: random(-5, 6),
  };

  ballArray.push(ball);
}

function mousePressed() {
  spawnBall(mouseX, mouseY);
}