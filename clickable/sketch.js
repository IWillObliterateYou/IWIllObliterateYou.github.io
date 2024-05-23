// Demo of clickable and buttons

let startButton;
let state = "start";

function setup() {
  createCanvas(windowWidth, windowHeight);

  startButton = new Clickable();
  startButton.locate(300, 300);
  startButton.resize(150, 45);
  startButton.text = "Testing testing";
  startButton.onPress = startWasPressed;
}

function startWasPressed() {
  state = "gameplay";
}

function draw() {
  if (state === "start") {
    background(220);
  }
  else {
    background(0);
  }

  startButton.draw();
}
