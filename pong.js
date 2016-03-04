console.log("hello");
var c = document.getElementById("table");
var ctx = c.getContext("2d");

var game_on = true;
var ball_x = 250;
var ball_y = 455;
var x_dir = 1;
var y_dir = -1;
var control_x = 250;
var ai_x = 250;
var speed = 10;
var losses = 0;

//clears the screen
var blank = function(e) {
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,500,500);
}
//puts the ball at the ball's x & y coordinates
var ball = function(e){
  ctx.beginPath();
  ctx.fillStyle = "rgb(150,255,150)";
  ctx.strokeStyle = "black";
  ctx.arc(ball_x, ball_y, 15, 0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();
}

//makes corners for the bar
var make_ball = function (a,b) {
  ctx.beginPath();
  ctx.arc(a, b, 3, 0, 2*Math.PI);
  ctx.fill();
}

//builds a bar whose top middle is at (a,b)
var bar = function(a,b){
  ctx.beginPath();
  ctx.fillStyle = "rgb(130,130,130)";
  ctx.strokeStyle = "black";
  ctx.fillRect(a-45, b, 90, 25);
  ctx.fillRect(a-50, b+5, 100, 15);
  make_ball(a-47,b+3);
  make_ball(a+47,b+3);
  make_ball(a-47,b+22);
  make_ball(a+47,b+22);
  ctx.fill();
}
//puts the bars at the locations indicated by their x coordinates
var bars = function(e){
  bar(control_x, 470);
  bar(ai_x, 5);
}

var setup = function(e){
  blank();
  ball();
  bars();
}


var frame = function(e){
    setup();
    console.log('x');
}
var go = setInterval(frame,speed);
