console.log("hello");
var c = document.getElementById("table");
var ctx = c.getContext("2d");

var game_on = true;
var ball_x = 250;
var ball_y = 450;
var x_dir = 1;
var y_dir = -1;
var control_x = 250;
var ai_x = 250;
var speed = 10;
var losses = 0;

var blank = function(e) {
  ctx.beginPath();
  ctx.fillStyle = "bbbbbb";
  ctx.fillRect(0,0,500,500);
}

var ball = function(e){
  ctx.beginPath();
  ctx.fillStyle = "rgb(150,255,150)";
  ctx.strokeStyle = "black";
  ctx.arc(ball_x, ball_y, 20, 0, 2*Math.PI);
  ctx.fill();
  ctx.stroke();
}

var bar = function(a,b){
  ctx.beginPath();
  ctx.fillStyle = "rgb(100,100,100)";
  ctx.strokeStyle = "black";
  ctx.fillRect(a-40, b, 80, 25);
  ctx.fill();
}

var bars = function(e){
  bar(control_x, 470);
  bar(ai_x, 5);
}

var setup = function(e){
  blank();
  ball();
  bar();
}

var go = function(e){

    window.setTimeout(10, console.log('one'));
    setup();
  
}
go();
