let snake;

function setup() {
    createCanvas(400, 400);
    snake = new Snake();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        snake.xdir = 0;
        snake.ydir = -1;
    } else if (keyCode === DOWN_ARROW) {
        snake.xdir = 0;
        snake.ydir = 1;
    } else if (keyCode === RIGHT_ARROW) {
        snake.xdir = 1;
        snake.ydir = 0;
    } else if (keyCode === LEFT_ARROW) {
        snake.xdir = -1;
        snake.ydir = 0;
    }
}
function draw() {
    background(220);
    snake.update();
    snake.show();
    
}