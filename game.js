//music by Goblin Refuge: https://goblinrefuge.com/mediagoblin/u/divjedrevo/m/autumn-s-tread/
//tik sound by DeepFrozenApps: http://soundbible.com/2044-Tick.html

var canvas = document.createElement("CANVAS");
canvas.style.background = "RGB(255, 255, 255)";
canvas.style.display = "block";
var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);
var ctx = canvas.getContext("2d");

var music = new Audio("assets/autumns-tread.wav");
music.loop = true;
var bing = new Audio("assets/a-tone.wav");
var tik = new Audio("assets/tick.mp3");
tik.volume = 0.5;

var resizeCanvas = function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

var keysDown = [];
$(document).keydown(function(event){
  if (!keysDown.includes(event.which)) {
    event.preventDefault();
    keysDown.push(event.which);
  }
});
$(document).keyup(function(event){
  keysDown.splice(keysDown.indexOf(event.which), 1);
});

var p1 = {
  x: 10,
	y: canvas.height / 2,
  targetY: this.y,
  ai: true,
  score: 0,
	getNearest: function() {
    let distance, targetY, thing, endY, travelTime, incompatible = 0, minDistance = null;
    if (ballField.length >= 1) {
		  for (let i in ballField) {
        thing = ballField[i];
        if (thing.moveX >= 0 || thing.dead === true) {
          incompatible++;
          continue;
        }
        distance = ((thing.x - thing.radius) - 20) / Math.abs(thing.moveX);
        targetY = thing.y + (thing.moveY * distance);
        while (targetY - thing.radius < 0 || targetY - thing.radius > canvas.height) {
          if (targetY - thing.radius < 0) {
            targetY = Math.abs(targetY - thing.radius) + thing.radius;
          }
          if (targetY + thing.radius > canvas.height) {
            targetY -= (((targetY + thing.radius) - canvas.height) * 2) - thing.radius;
          }
        }
        travelTime = Math.abs(targetY - this.y) / 10;
			  if((distance < minDistance || minDistance === null) && travelTime < distance + 5) {
          minDistance = distance;
          endY = targetY;
        }
      }
    }
    if (endY === undefined) {
			this.targetY = canvas.height / 2;
		} else {
      this.targetY = endY;
    }
	},
	tick: function() {
    if (this.ai) {
      this.getNearest();
      if (this.targetY < this.y && this.y - 40 > 0) {
        this.y -= 10;
      }
      if (this.targetY > this.y && this.y + 40 < canvas.height) {
        this.y += 10;
      }
    } else {
      if (keysDown.includes(87) && this.y - 40 > 0) {
      this.y -= 10;
    }
    if (keysDown.includes(83) && this.y + 40 < canvas.height) {
      this.y += 10;
    }
    }
    ctx.fillStyle = "RGB(255, 0, 0)";
	  ctx.fillRect(this.x - 4, this.y - 40, 8, 80);
  },
}

var p2 = {
	x: canvas.width - 16,
	y: canvas.height / 2,
  ai: true,
  targetY: this.y,
  score: 0,
  getNearest: function() {
    let distance, targetY, thing, endY, travelTime, incompatible = 0, minDistance = null;
    if (ballField.length >= 1) {
		  for (let i in ballField) {
        thing = ballField[i];
        if (thing.moveX <= 0 || thing.dead === true) {
          incompatible++;
          continue;
        }
        distance = (canvas.width - (thing.x + thing.radius) - 20) / thing.moveX;
        targetY = thing.y + (thing.moveY * distance);
        while (targetY - thing.radius < 0 || targetY - thing.radius > canvas.height) {
          if (targetY - thing.radius < 0) {
            targetY = Math.abs(targetY - thing.radius) + thing.radius;
          }
          if (targetY + thing.radius > canvas.height) {
            targetY -= (((targetY + thing.radius) - canvas.height) * 2) - thing.radius;
          }
        }
        travelTime = Math.abs(targetY - this.y) / 10;
			  if((distance < minDistance || minDistance === null) && travelTime < distance + 5) {
          minDistance = distance;
          endY = targetY;
        }
      }
    }
    if (endY === undefined) {
			this.targetY = canvas.height / 2;
		} else {
      this.targetY = endY;
    }
	},
	tick: function() {
    if (this.ai) {
      this.getNearest();
      if (this.targetY < this.y && this.y - 40 > 0) {
        this.y -= 10;
      }
      if (this.targetY > this.y && this.y + 40 < canvas.height) {
        this.y += 10;
      }
    } else {
      if (keysDown.includes(38) && this.y - 40 > 0) {
      this.y -= 10;
    }
    if (keysDown.includes(40) && this.y + 40 < canvas.height) {
      this.y += 10;
    }
    }
    this.x = canvas.width - 16;
    ctx.fillStyle = "RGB(255, 0, 0)";
	  ctx.fillRect(this.x - 4, this.y - 40, 8, 80);
  },
}

var id = 0;
function Ball() {
  this.id = id++;
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
  this.radius = 12;
	this.color = "RGB(" + Math.round(Math.random() * 225) + "," + Math.round(Math.random() * 225) + "," + Math.round(Math.random() * 225) + ")";
  this.speed = Math.round(Math.random() * 5 + 5);
	let temp = Math.random() * 2 - 1;
  this.moveX = temp * this.speed;
  if (temp > 0) {
    this.moveY = (1 - temp) * this.speed;
  } else {
    this.moveY = (1 + temp) * this.speed
  }
  this.getNearest = function() {
    let distance, nearest, thing, minDistance = null;
    if (ballField.length > 1) {
		  for  (let i in ballField) {
        thing = ballField[i];
        if(thing.id == this.id) {
          continue;
        }
        distance = Math.sqrt(Math.pow(thing.x - this.x, 2) + Math.pow(thing.y - this.y, 2)) - (thing.radius + this.radius);
			  if(distance < minDistance || minDistance === null) {
          minDistance = distance;
          nearest = thing;
        }
      }
      this.distance = minDistance;
      this.nearest = nearest;
    } else {
			this.nearest = undefined;
			this.distance = this.radius + 1;
		}
	}
  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
    ctx.fill();
  }
  this.tick = function() {
    if(this.x <= 0 + this.radius) {
      p2.score++;
      this.dead = true;
      this.x = -32
      bing.play();
      return;
    } else {
      if(this.x >= canvas.width - this.radius) {
        p1.score++;
        this.dead = true;
        this.x = -32
        bing.play()
        return;
      }
    }
    if(this.y <= 0 + this.radius) {
      this.moveY = Math.abs(this.moveY);
      tik.play();
    } else {
      if(this.y >= canvas.height - this.radius) {
        this.moveY = Math.abs(this.moveY) * -1;
        tik.play();
      }
    }
    this.getNearest();
    if(this.distance <= 0) {
      let run = this.nearest.x - this.x;
      let rise = this.nearest.y - this.y;
			let length = Math.sqrt((run * run) + (rise * rise));
      this.moveX = (run / length) * this.speed * -1;
      this.moveY = (rise / length) * this.speed * -1;
      tik.play();
    }
    if(this.x < 32 && this.y < p1.y + 40 && this.y > p1.y - 40) {
      let run = p1.x - this.x;
      let rise = p1.y - this.y;
			let length = Math.sqrt((run * run) + (rise * rise));
      this.moveX = Math.abs((run / length) * this.speed);
      this.moveY = (rise / length) * this.speed * -1;
      tik.play();
    }
    if(this.x > canvas.width - 32 && this.y < p2.y + 40 && this.y > p2.y - 40) {
      let run = p2.x - this.x;
      let rise = p2.y - this.y;
			let length = Math.sqrt((run * run) + (rise * rise));
      this.moveX = Math.abs((run / length) * this.speed) * -1;
      this.moveY = (rise / length) * this.speed * -1;
      tik.play();
    }
  }
	this.move = function() {
		this.x += this.moveX;
    this.y += this.moveY;
    this.draw();
	}
}

var ballField = [];
var step = 0;
var simulate = function() {
  resizeCanvas();
  (function drawUI() {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.font = "20px arial";
    ctx.fillStyle = "RGB(255, 0, 0)";
    ctx.fillText(p1.score, 10, 20);
    ctx.fillText(p2.score, canvas.width / 2 + 10, 20);
    ctx.font = "10px arial";
    ctx.fillStyle = "RGB(200, 200, 200)";
    ctx.fillText('Music: Autunms Tread by Goblin Refuge. "tik" sound by DeepFrozenApps. "bing" sound by His Self', 10, canvas.height - 10);
  }).call(this);
  if(step % 100 == 0) {
    ballField.push(new Ball());
  }
  for (let i in ballField) {
    thing = ballField[i];
    if (typeof thing.tick === "function" && !thing.dead) {
      thing.tick();
    }
  }
  for (let i in ballField) {
    thing = ballField[i];
    if (typeof thing.move === "function" && !thing.dead) {
      thing.move();
    }
  }
  p1.tick();
  p2.tick();
  step++;
}

var players = prompt("How many players? (enter an integer between 0 and 2)");
switch(players) {
  case "0":
    p1.ai = true;
    p2.ai = true;
    break;
  case "1":
    p1.ai = false;
    p2.ai = true;
    break;
  default:
    p1.ai = false;
    p2.ai = false;
    break;
}

var interval = setInterval(simulate, 50);

$(music).ready(function() {
  music.play();
})
