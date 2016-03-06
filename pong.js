var c = document.getElementById("table");
var ctx = c.getContext("2d");
var loss_count = document.getElementById('lossCount');

var game_on = false;
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
var timer_boolean = true;

//clears the screen
var blank = function(e) {
    ctx.beginPath();
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

//draws everything
var setup = function(e){
    blank();
    ball();
    bars();
}

var reset_everything = function() {
    game_on = false;
    timer_boolean = false;
    window.setTimeout(function(e){
      timer_boolean = true;
      console.log("aw");
    }, 1000);
    ball_x = 250;
    ball_y = 455;
      x_dir = 1;
      y_dir = -1;
      control_x = 250;
      ai_x = 250;
      losses++;
      move_left = false;
      move_right = false;
      loss_count.innerHTML = "You have 0 Wins and "+losses+" Losses";
}

//how the ball moves
var move_commands = function(){
    ball_x+=x_dir;
    ball_y+=y_dir;
    if(ball_x <= 15 || ball_x >= 485){
	     x_dir=x_dir*-1;
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
	reset_everything();
    }
    if(ball_y < 300)
	if(ball_x - ai_x > 20 && ai_x < 450){
	    ai_x+=1.2;
	}
    if(ball_x - ai_x < 20 && ai_x > 50){
	ai_x-=1.2;
    }
    if(move_right && (control_x<450)){
	control_x+=1.5;
	moveBar();
	//move_left = false;
    }
    if(move_left && (control_x>50)){
	control_x-=1.5;
	moveBar();
	//move_right = false;
    }
    if ((ball_y == 460) && ((ball_x > (control_x - 50)) && (ball_x < (control_x + 50)))){
	y_dir = -y_dir;
    }
    //100x25 - if ball goes beyond "control_y", and isnt in range of the bar, reset
    if((ball_y>480) && ((ball_x < (control_x - 50)) || (ball_x > (control_x + 50)))){
	reset_everything();
    }
    if(y_dir == -1){
	var pred_x = ball_x + x_dir*(ball_y - 45)
	if(pred_x <= 5){
	    pred_x = 10 - pred_x;
	}else if(pred_x >= 495){
	    pred_x = 990 - pred_x;
	}
	if(pred_x < ai_x && ai_x > 50){
	    ai_x -= Math.min(1.2, ai_x - pred_x);
	}else if(pred_x > ai_x && ai_x < 450){
	    ai_x += Math.min(1.2, pred_x - ai_x);
	}
    }
}

//user input
var moveBar = function(e){
    if (e.keyCode == 37){
	     move_left=true;
    } else if (e.keyCode == 39){
	move_right=true;
    } else if (e.keyCode == 32){
  if(timer_boolean && !game_on){
    game_on=true;
  }
}

}

var stopBar = function(e){
    move_left=false;
    move_right=false;
}

//commands that run every frame
var frame = function(e){
    if(timer_boolean){
        setup();
      }
    if(game_on){
	     move_commands();
    }
}
var go = setInterval(frame,speed);

window.addEventListener('keydown', moveBar);
window.addEventListener('keyup', stopBar);
