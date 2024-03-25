// Bubble Movement demo
// Object Notation and arrays
// March 25th, 2024

let theBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (let i = 0; i < 5; i ++) {
    spawnBubble();
  }

  // spawn a neew bubble every half second
  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(255);

  // move bubbles with noise
  moveBubblesWithNoise();
  displayBubbles();
}

function spawnBubble() {
  let someBubble = {
    size: random(10, 30),
    x: random(width),
    y: random(height),
    speed: 3, 
    r: random(255),
    g: random(255), 
    b: random(255),
    a: random(255), // opacity (alpha)
    timeX: random(100000),
    timeY: random(100000),
    deltaTime: 0.01,
  };

  theBubbles.push(someBubble);
}

function displayBubbles() {
  for (let bubble of theBubbles) {
    fill(bubble.r, bubble.g, bubble.b, bubble.a);
    circle(bubble.x, bubble.y, bubble.size);
  }
}

function moveBubblesRandomly() {
  for (let bubble of theBubbles) {
    let choice = random(100);
    if (choice < 25) {
      // move up
      bubble.y += bubble.speed;
    }
    else if (choice < 50) {
      // move down
      bubble.y -= bubble.speed;
    }
    else if (choice < 75) {
      // move left
      bubble.x -= bubble.speed;
    }
    else {
      // move right
      bubble.x += bubble.speed;
    }
  }
}

function moveBubblesWithNoise() {
  for (let bubble of theBubbles) {
    // find where to be
    let x = noise(bubble.timeX) * width;
    let y = noise(bubble.timeY) * height;

    // set bubble location
    bubble.x = x;
    bubble.y = y;

    // increment time
    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;
  }
}