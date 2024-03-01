// initiallizing variables
let initialStateStart;
let rectWidth;
let rectHeight;
let buttonX;
let buttonY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  initialStateStart = true; // is the game at its default state
  rectWidth = random(35, 101); // size range of button width-wise
  rectHeight = random(25, 71); // size range of button heigthwise
  buttonX = random(0, width - rectWidth); // x pos of initial button
  buttonY = random(0, height - rectHeight); // y pos of initial button
}

function draw() {
  background("black");
  startScreen();
}

// create and manage the starting screen
function startScreen() {
  fill("red");
  if (initialStateStart) {
    rect(buttonX, buttonY, rectWidth, rectHeight, 5);

    // is the button pressed
    if (mouseIsPressed && mouseX >= buttonX && mouseX <= buttonX + rectWidth && mouseY >= buttonY && mouseY <= buttonY + rectHeight) {
    //  initialStateStart = !initialStateStart; // trigger identifiable change to tell the button it can move now
      fill("blue")
    }
  }
}