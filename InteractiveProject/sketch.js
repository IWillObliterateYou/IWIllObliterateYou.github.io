// Extra for Experts
// 



// initiallizing variables
let buttonSwitcher;
let rectWidth;
let rectHeight;
let buttonX;
let buttonY;
let buttonsToEnter;
let platWidth;
let platHeight;
let platX;
let platY;
let xPos = 0;
let yPos = 0;
let i = 0; // counter
let platformSet = false; // checks to see if the platform's varibles have been set yet
let character;
let canJump = false;
let hit;
let timer = -1000;
let timer2 = 0; // for the jumping "animation"
let gravityStrength = 0.4; // called every frame, keep low
let yVelocity = 0;
let stateChanged = false; // indicates whether in start screen or in game state



function preload() {
  character = loadImage("character.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight); // if the window running the code is too small, the jump will extend above the screen

  buttonSwitcher = true; // is the game at its default state
  rectWidth = width / 7; // size range of button width-wise
  rectHeight = height / 7; // size range of button heigthwise
  buttonX = width / 2 - rectWidth / 2; // x pos of initial button
  buttonY = height / 3 * 2 - rectHeight / 4; // y pos of initial button
  buttonsToEnter = floor(random(3, 9)); // number of times you must hit the button after the initial press for the game to load
}

function draw() {
  background("black");
  if (!stateChanged) {
    startScreen();
  } 
  else {
    platformerState();
  }
}

// create and manage the starting screen
function startScreen() {
  if (i === buttonsToEnter) {
    stateChanged = true;
  }
  fill("white");
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Welcome", width / 2, height / 2);

  drawButton();

  // detects buttons presses with the enclosed if statement and repeats moving and drawing the button a number of times equal to buttonsToEnter
  if (buttonSwitcher) {
    if (mouseIsPressed && mouseX >= buttonX && mouseX <= buttonX + rectWidth && mouseY >= buttonY && mouseY <= buttonY + rectHeight && i < buttonsToEnter) {
      i ++;
      if (i < buttonsToEnter) { // a second check to tell if we need to run this function again, this prevents flashing one frame of what would be the next startScreen before the platformerState
        buttonSwitcher = !buttonSwitcher; // trigger identifiable change to tell the program the button has been pressed for the first time
        moveButton();
        drawButton();
      }
    }
  }
}

function moveButton() { // moves the button to a new location 
  buttonX = random(0, width - rectWidth);
  buttonY = random(0, height - rectHeight);
  rectWidth = random(65, 121);
  rectHeight = random(25, 91);
  buttonSwitcher = !buttonSwitcher;
}

function drawButton() { // creating and positioning the button
  fill("red");
  rect(buttonX, buttonY, rectWidth, rectHeight, 5);
  fill("black");
  textAlign(CENTER, CENTER);
  text("Press", buttonX + rectWidth / 2, buttonY + rectHeight / 2);
}

function platformerState() {
//  for (let i = 0; i < 6 ; i++) { // draws 5 platforms
//    drawPlatform();
//  }
//  platformSet = true; // prevents platform movement
  drawCharacter();
}

// draws a platform at platX, platY, with a width of platWidth and a height of platHeight, all of which are contained to this function
function drawPlatform() {
  if (!platformSet) {
    platWidth = random(25, width / 2);
    platHeight = random(10, 40);
    platX = random(0, width - platWidth);
    platY = random(50,  height - platHeight);
  }
  rect(platX, platY, platWidth, platHeight);
}

function drawCharacter() { // draws and moves character
  image(character, width / 2 - character.width / 2 + xPos, height - character.height - yPos, character.width, character.height);

  if (keyIsDown(68) && xPos + 10 <= width / 2 - character.width / 4) { // moves character right with "d"
    xPos += 10;
    if (xPos + character.width > width / 2) {
      xPos = width / 2 - character.width / 2;
    }
  }
  if (keyIsDown(65) && xPos - 10 >= 0 - width / 2 + character.width / 4) { // moves character left with "a"
    xPos -= 10;
    if (xPos < 0 - width / 2 + character.width / 2) {
      xPos = 0 - width / 2 + character.width / 2;
    }
  }

  // for troubleshooting
  // if (keyIsDown(87)) { // moves character right with "w"
  //   yPos += 5;
  // }
  // if (keyIsDown(83)) { // moves character left with "s"
  //   yPos -= 5;
  // }

  if (canJump && keyIsDown(32) && millis() - 1000 >= timer) { // jumping
    yVelocity += 20;
    canJump = false;
    timer = millis();
  }

  gravity();
}

function gravity() { // makes character fall

  // checks to see if character hits ceiling, if it does, lower it to ceiling so gravity can take care of it
  // weird bug, if character hits the ceiling, when they hit the ground it seems to stop them prematurly at a distance of yVelocity, gravity fixes the problem but it persists nonetheless
  if (height - character.height - yPos >= 0) {
    yPos += yVelocity;
  } 
  else {
    yPos = height - character.height;
    yVelocity = 0;
  }

  // makes character stop falling when hitting the ground
  if (height - yPos - yVelocity < height) { 
    yVelocity -= gravityStrength;
    canJump = false;
  } 
  else {
    canJump = true;
    yVelocity = 0;
  }
}

function collision() { // detects if character is touching platform
// does not work, if ever collideRectRect is run, the character stops moving
//  hit = collideRectRect(platX, platY, platWidth, platHeight, width / 2 - character.width / 2 + xPos, height - character.height - yPos, character.width, character.height); 

  //  hit = hit || yPos + character.height >= height; // also detects if character is touching the bottom of the canvas
  // if (hit) {
  //   fill("red");
  // }

}