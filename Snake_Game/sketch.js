// Snake Game
let w;
let h;
let food;
let snake;
var eatSound;
var dieSound;
let fr = 4;
let rez = 20;
var status = 'init';
check = true;

function preload() {
  eatSound = loadSound('Input-04a.mp3');
  dieSound = loadSound('pixel-death.wav');
}

function setup() {
  createCanvas(600, 600);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(fr);
}

function initGame() {
  background(0, 76, 153);
  var name = 'Snake Game';
  textSize(50);
  //peach-moccasin color
  fill(255, 228, 181);
  nameWidth_ = textWidth(name);
  text(name, (width - nameWidth_) / 2, height / 2 - 40);
  startBtn = createButton('Start Game');
  startBtn.position(width / 2 - startBtn.width / 2, height / 2);
  startBtn.mousePressed(startGame);
  noLoop();
}


function startGame() {
  removeElements();
  status = 'started';
  snake = new Snake();
  foodLocation();
  fr = 2;
  frameRate(fr);
  snake.update();
  loop();
}

function runGame() {
  background(0, 76, 153);
  textSize(12);
  fill(255);
  text("score: " + snake.body.length, 2, 12);
  // scale the snake & food, leaving out score.
  scale(rez);
  if (snake.eat(food)) {
    eatSound.play();
    fr += 1;
    frameRate(fr);
    print(fr);
    foodLocation();
  }
  snake.update();
  snake.show();
  snake.checkDeath();
  noStroke();
  // food color - Brown
  fill(222, 184, 135);
  rect(food.x, food.y, 1, 1);
}

function endGame() {
  background(0, 76, 153);
  textSize(32);
  dieSound.play();
  var display = 'Game Over';
  var score = 'Your Score is ' + snake.body.length;
  displayWidth_ = textWidth(display);
  scoreWidth_ = textWidth(score);
  // red - game over
  fill(255, 51, 51);
  text(display, (width - displayWidth_) / 2, height / 2 - 40);
  // white - score print
  fill(255);
  text(score, (width - scoreWidth_) / 2, height / 2);
  startBtn = createButton('Restart Game');
  startBtn.position(width / 2 - startBtn.width / 2, height / 2 + 40);
  startBtn.mousePressed(startGame);
  noLoop();
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    snake.setDir(-1, 0);
  } else if (keyCode == RIGHT_ARROW) {
    snake.setDir(1, 0);
  } else if (keyCode == UP_ARROW) {
    snake.setDir(0, -1);
  } else if (keyCode == DOWN_ARROW) {
    snake.setDir(0, 1);
  }
}


function draw() {
  if (status == 'init') {
    initGame();
  } else if (status == 'started') {
    runGame();
  } else if (status == 'dead') {
    endGame();
  }
}