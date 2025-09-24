var Snake;
var scl = 20;
var food;
var foodBounceAmp = 50;    // amplitude in pixels (how far up/down)
var foodBounceSpeed = 0.25; // how fast it bounces (radians per frame)

function setup() {
    createCanvas(600, 600);
    Snake = new Snake();
    frameRate(10);
    // place food in pixel coordinates (multiples of scl)
    pickLocation();
}

function pickLocation() {
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    // choose a random grid cell and convert to pixel coordinates
    var fx = floor(random(cols)) * scl;
    var fy = floor(random(rows)) * scl;
    food = createVector(fx, fy);
}   

function draw() {
background(50);
Snake.update();
Snake.show();


if (Snake.eat(food)) {
    // pickLocation already assigns to the global `food`
    pickLocation();
}

fill(255, 0, 100);
var offsetY = sin(frameCount * foodBounceSpeed) * foodBounceAmp;
rect(food.x, food.y + offsetY, scl, scl);
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        Snake.xspeed = 0;
        Snake.yspeed = -1;
    } else if (keyCode === DOWN_ARROW) {
        Snake.xspeed = 0;
        Snake.yspeed = 1;
    } else if (keyCode === RIGHT_ARROW) {
        Snake.xspeed = 1;
        Snake.yspeed = 0;
    } else if (keyCode === LEFT_ARROW) {
        Snake.xspeed = -1;
        Snake.yspeed = 0;
    }
}



function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;

    this.eat = function(pos) {
  // compute the same vertical offset used for drawing the food
  var offsetY = sin(frameCount * foodBounceSpeed) * foodBounceAmp;

  // snake head rectangle
  var headLeft = this.x;
  var headTop = this.y;
  var headRight = this.x + scl;
  var headBottom = this.y + scl;

  // food rectangle (with visual offset)
  var foodLeft = pos.x;
  var foodTop = pos.y + offsetY;
  var foodRight = pos.x + scl;
  var foodBottom = pos.y + scl + offsetY;

  // axis-aligned rectangle overlap test
  if (headRight > foodLeft && headLeft < foodRight &&
      headBottom > foodTop && headTop < foodBottom) {
    return true;
  }
  return false;
}

    this.update = function() {
        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    }
   
    this.show = function() {
        fill(255);
        rect(this.x, this.y, scl, scl);
    }
}