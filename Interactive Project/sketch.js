// initiallizing variables
let initialStateStart;
let rectWidth;
let rectHeight;
let buttonX;
let buttonY;
let buttonsToEnter;
let i;

function setup() {
  createCanvas(windowWidth, windowHeight);

  initialStateStart = true; // is the game at its default state
  rectWidth = width / 7; // size range of button width-wise
  rectHeight = height / 7; // size range of button heigthwise
  buttonX = width / 2 - rectWidth / 2; // x pos of initial button
  buttonY = height / 3 * 2 - rectHeight / 4; // y pos of initial button
  buttonsToEnter = random(1, 7); // number of times you must hit the button after the initial press for the game to load
}

function draw() {
  background("black");
  startScreen();

}

// create and manage the starting screen
function startScreen() {
  fill("white");
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Welcome", width / 2, height / 2);

  drawButton();

  // is the button pressed
  if (initialStateStart) {
// add to if statement \/ checking if button pressed less than number of times


//    for (i = 0; i < buttonsToEnter; i ++) {
      if (mouseIsPressed && mouseX >= buttonX && mouseX <= buttonX + rectWidth && mouseY >= buttonY && mouseY <= buttonY + rectHeight) {
        initialStateStart = !initialStateStart; // trigger identifiable change to tell the program the button has been pressed for the first time
        moveButton();
        drawButton();
      }
    console.log("done");
  }
}

function moveButton() { // moves the button to a new location 
  buttonX = random(0, width - rectWidth);
  buttonY = random(0, height - rectHeight);
  rectWidth = random(65, 121);
  rectHeight = random(25, 91);
  initialStateStart = !initialStateStart;
}

function drawButton() {
  fill("red");
  rect(buttonX, buttonY, rectWidth, rectHeight, 5);
  fill("black");
  textAlign(CENTER, CENTER);
  text("Press", buttonX + rectWidth / 2, buttonY + rectHeight / 2);
}