let initialStateStart = true; // is the game at its default state
function setup() {
  createCanvas(750, 600);
  
  let buttonX = width / 5; // x of initial button
  let buttonY = (height / 7) * 5; // y of initial button
}

function draw() {
  background("black");
  startScreen();
}

// create and manage the starting screen
function startScreen() {
  fill('red');
  if (initialStateStart) {
    rect(buttonX, buttonY, width / 5, height / 7, 5);

    // is the button pressed
    if (mouseIsPressed && mouseX >= width / 5 && mouseX <= (width / 5) * 2 && mouseY >= (height / 7) * 5 && mouseY <= (height / 7) * 6) {
      initialStateStart = !initialStateStart; // trigger identifiable change to tell the button it can move now
    }
  }
}
