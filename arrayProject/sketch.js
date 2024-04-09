// Array Project
// Seth Gardiner
// April 8th, 2024
//
// Extra for Experts:
// 
// - Audio being played, it sounds awful (intentionally, I'm sorry I thought it was funny)
// - A 2d array

let fieldMusic;
let enteringCombatSound;

function preload() {
  characterImage = loadImage("character.png");
  characterImageFlipped = loadImage("characterFlipped.png");
  knightImage = loadImage("knight.png");
  fieldMusic = loadSound("fieldMusic.mp3");
  enteringCombatSound = loadSound("enteringCombat.mp3");
}

// initializing variables
let terrain = [];
let numberOfLayers = 5;
let tileSize;
let tileY;
let characterXPos;
let characterYPos;
let amIHit;
let characterImage;
let knightImage;
let inCombat = false;
let victorious = false;
let attackButton;
let defendButton;
let characterImageFlipped;
let playerHealthBar;
let currentHealth = 100;
let enemyHealthBar;
let maximumEnemyHealth = 100;
let currentEnemyHealth = maximumEnemyHealth;
let isYourTurn = true;
let areYouDefending = false;
let enemyDamage = 15;
let betweenTurnsDelayValue = 1500;
let playerDamage = 25;
let delayBetweenCombats = -100;
let gameOver = false;
let delayBetweenTurnsTimer;
let gameState = false; // indicates if you are in the game (true) or in the menu screen (false)

function setup() {
  createCanvas(windowWidth, windowHeight);
  // decide on the size of tiles and decide where the enemies are placed with generateField()
  tileSize = height / 25;
  generateField();

  characterXPos = width / 2;
  characterYPos = height / 2;
}

function draw() {
  // all visible functionality is dependant upon not being in the gameOver state
  if (!gameOver && gameState) {
    // check whether or not to initiate the combat sequence, if not, display the enemies and do the check for if you hit an enemy, as well as the walls
    if (!inCombat) {
      background("green");
      for (let i = terrain.length - 1; i >= 0; i --) {
        fill("brown");
        image(knightImage, terrain[i].x, terrain[i].y, terrain[i].s, terrain[i].s);
      }

      for (let i = terrain.length - 1; i >= 0; i --) {
        detectCharacterTileCollision(terrain[i]);
      }

      drawCharacterInField();
    }
    else {
      battleScreen();
    }
  }
  else if (gameOver) {
    background("black");
    fill("black");
    stroke("white");
    text("Game Over", width / 2, height / 2);
  }
  else {
    background(50, 50, 200);
    textSize(100);
    fill("red");
    textAlign(CENTER, CENTER);
    text("Welcome", width / 2, height / 3);

    fill("grey");
    rect(width / 3, height / 3 * 2, width / 3, height / 6);
    fill("black");
    text("Begin", width / 2, height / 4 * 3);

    if (mouseIsPressed && mouseX > width / 3 && mouseX < width / 3 * 2 && mouseY > height / 3 * 2 && mouseY < height / 6 * 5) {
      gameState = true;
      fieldMusic.jump(0);
      fieldMusic.play();
      fieldMusic.setLoop(true);
    }
  }
}

function createTile(cornerX, cornerY) {
  let thisTile = {
    x: cornerX,
    y: cornerY,
    s: tileSize,
  };
  terrain.push(thisTile);
}

// decide where enemies are
function generateField() {
  for (let cornerY = 0; cornerY < height; cornerY +=  tileSize) { // generating columns
    for (let cornerX = 0; cornerX < width; cornerX += tileSize) { // generating rows
      if (random(1) >=  0.98) {
        createTile(cornerX, cornerY);
      } 
    }
  }
}

// draw the character and do the movement and wall collision detection
function drawCharacterInField() {
  image(characterImage, characterXPos, characterYPos, tileSize, tileSize);

  if (keyIsDown(68)) { // moves character right with "d"
    characterXPos += 10;
    if (characterXPos + tileSize > width) {
      characterXPos = width - tileSize;
    }
  }
  if (keyIsDown(65)) { // moves character left with "a"
    characterXPos -= 10;
    if (characterXPos < 0) {
      characterXPos = 0;
    }
  }
  if (keyIsDown(83)) { // moves character right with "s"
    characterYPos += 10;
    if (characterYPos + tileSize > height) {
      characterYPos = height - tileSize;
    }
  }
  if (keyIsDown(87)) { // moves character left with "w"
    characterYPos -= 10;
    if (characterYPos < 0) {
      characterYPos = 0;
    }
  }
}

// detect if your hitting an enemy
function detectCharacterTileCollision(i) {
  for (let i = terrain.length - 1; i >= 0; i --) {
    if (collideRectRect(terrain[i].x, terrain[i].y, tileSize, tileSize, characterXPos, characterYPos, tileSize, tileSize)) {
      // this delay is required because without it the inCombat = true; line gets called 15+ times instantly when it should only be called once
      // the delay is basically unnoticible so it shouldn't affect anything besides fixing that bug
      if (delayBetweenCombats + 100 <= millis()) {
        inCombat = true;
        victorious = false;
        isYourTurn = true;
        enteringCombatSound.jump(0);
        enteringCombatSound.play();
      }
      currentEnemyHealth = maximumEnemyHealth; // resets the singular enemy health bar to full because they all share one
      // quick check to remove the enemy from the array
      if (victorious) {
        terrain.splice([i], 1);
      }
    }
  }

  fill("teal");
}

// run the combat sequence
function battleScreen() {
  background("teal");
  // draw the attack button
  stroke("white");
  fill(40, 20, 20);
  attackButton = rect(width / 7, height / 8 * 6, width / 7 * 2, height / 8);
  stroke("black");
  textSize(100);
  textAlign(CENTER, CENTER);
  fill("White");
  text("Attack", width / 7 * 2, height / 16 * 13);

  // draw the defend button. 
  // For clarity, yes I'm aware that this button is pointless for strategy reasons and should never be used if you want to win. This game isn't complicated enough to warrent it. 
  fill(40, 20, 20);
  stroke("white");
  defendButton = rect(width / 7 * 4, height / 8 * 6, width / 7 * 2, height / 8);
  stroke("black");
  fill("White");
  text("Defend", width / 7 * 5, height / 16 * 13);

  // draw the character and enemy in the combat sequence
  image(characterImageFlipped, width / 7, height / 3, tileSize * 7, tileSize * 7);

  image(knightImage, width / 7 * 6 - tileSize * 7, height / 3, tileSize * 7, tileSize * 7);

  // draw your healthbar
  noStroke();
  fill("black");
  rect(width / 7, height / 8, width / 7 * 2, height / 16);
  fill("red");
  playerHealthBar = rect(width / 7, height / 8, currentHealth / 100 * width / 7 * 2, height / 16);

  // draw enemy healthbar
  fill("black");
  rect(width / 7 * 4, height / 8, width / 7 * 2, height / 16);
  fill("red");
  enemyHealthBar = rect(width / 7 * 4, height / 8, currentEnemyHealth / 100 * width / 7 * 2, height / 16);

  turnBasedBackAndForth();
}

// the actual combat functions
function turnBasedBackAndForth() {
  // the isYourTurn and button if statements are seperated into two if statements because its easier to manage and understand, they could be combined

  // this branch of the isYourTurn statement controls your turn
  if (isYourTurn) {
    // check if you're hitting the attack button on your turn and subtract 20 from the enemy healthbar
    if (mouseIsPressed && mouseX > width / 7 && mouseX < width / 7 * 3 && mouseY > height / 8 * 6 && mouseY < height / 8 * 7) {
      currentEnemyHealth -= playerDamage;
      isYourTurn = false; // this is not a != toggle because its easier to keep track of
      delayBetweenTurnsTimer = millis();
    }
    // check if you're hitting the defend button on your turn and tell the game you're defending
    else if (mouseIsPressed && mouseX > width / 7 * 4 && mouseX < width / 7 * 6 && mouseY > height / 8 * 6 && mouseY < height / 8 * 7) {
      areYouDefending = true;
      isYourTurn = false; // this is not a != toggle because its easier to keep track of
      delayBetweenTurnsTimer = millis();
    }
  }
  // this branch of the isYourTurn statement controls the enemy's turn
  else {
    // if enough time has passed as dictated by the betweenTurnsDelayValue (in milliseconds) the enemy takes their turn
    // this branch is the default enemy damage branch and does the regular amount of damage
    if (delayBetweenTurnsTimer + betweenTurnsDelayValue <= millis() && areYouDefending === false) {
      currentHealth -= enemyDamage;
      isYourTurn = true; // this is not a != toggle because its easier to keep track of
    }
    // this branch is for is you guarded the previous turn
    else if (delayBetweenTurnsTimer + betweenTurnsDelayValue <= millis() && areYouDefending === true) {
      currentHealth -= enemyDamage / 2;
      isYourTurn = true; // this is not a != toggle because its easier to keep track of
    }
  }

  // checking if the enemy is dead, if they are declare victory, remove you from combat, and because all enemies use the same health bar, reset said healthbar to maximums
  if (currentEnemyHealth <= 0) {
    victorious = true;
    inCombat = false;
    delayBetweenCombats = millis();
  }

  // are you dead check
  if (currentHealth <= 0) {
    gameOver = true;
  }
}