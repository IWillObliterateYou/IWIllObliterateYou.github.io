// Traffic Light Starter Code
// Seth Gardiner
// Feb 28th

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let greenDuration = 3000;
let yellowDuration = 1000;
let redDuration = 5000;
let lastSwitch = 0;
let currentState = "green";

function setup() {
  createCanvas(100, 300);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  trafficLights();
}

function trafficLights() {
  // ideally, this would be a function calling three other functions, each drawing their light and nothing else to make it as simple and elegant as possible
  // the green light
  if (currentState === "green" && millis() >= greenDuration + lastSwitch) {
      currentState = "yellow";
      lastSwitch = millis();
    
  // the yellow light
  } else if (currentState === "yellow" && millis() >= yellowDuration + lastSwitch) {
      currentState = "red";
      lastSwitch = millis();
    
  // the red light
  } else if (millis() >= redDuration + lastSwitch) {
      currentState = "green";
      lastSwitch = millis();
      print("cycle complete"); // tells when a cycle is completed - pointless
    }
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, 75, 200, 10);

  //lights
  fill(currentState);
  if (currentState === "green") { 
    ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
  } else if (currentState === "yellow") { 
    ellipse(width / 2, height / 2, 50, 50); //middle
  } else {
    ellipse(width / 2, height / 2 - 65, 50, 50); //top
  }
}
