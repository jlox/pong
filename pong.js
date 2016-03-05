var c = document.getElementById("table");
var ctx = c.getContext("2d");

var game_on = true;
var ball_x = 250;
var ball_y = 455;
var x_dir = 1;
var y_dir = -1;
var control_x = 250;
var ai_x = 250;
var speed = 5;
var losses = 0;
var move_left = false;
var move_right = false;

//clears the screen
var blank = function(e) {
    ctx.fillStyle = "#333333";
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
var reset = function() {
    game_on = false;
    ball_x = 250;
    ball_y = 455;
    x_dir = 1;
    y_dir = -1;
    control_x = 250;
    ai_x = 250;
    losses++;
    move_left = false;
    move_right = false;
}

//how the ball moves
var move_commands = function(){
    ball_x+=x_dir;
    ball_y+=y_dir;
    if(ball_x <= 5 || ball_x >= 495){
	x_dir=x_dir*-1;
    }
    if(ball_y >= 470){
	y_dir=-1;
    }
    if(ball_y <= 45){
	y_dir = 1;
    }
    if(move_right && control_x < 450){
	control_x++;
    }
    if(move_left && control_x > 50){
	control_x--;
    }
    if(ball_y >= 495){
	reset();
    }
    if(y_dir == -1){
	var pred_x = Math.abs(ball_x + x_dir*(ball_y - 45))
	if(pred_x > 495){
	    pred_x = 990 - pred_x;
	}
	if(pred_x < ai_x && ai_x > 50){
	    ai_x -= Math.min(1.2, ai_x - pred_x);
	}else if(pred_x > ai_x && ai_x < 450){
	    ai_x += Math.min(1.2, pred_x - ai_x);
	}
    }
}

//commands that run every frame
var frame = function(e){
    setup();
    console.log('losses:'+losses);
    if(game_on){
	move_commands();
    }
}

var go = setInterval(frame,speed);
