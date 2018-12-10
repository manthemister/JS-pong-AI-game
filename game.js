var canvas = document.createElement("CANVAS");
var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);
var ctx = canvas.getContext("2d");

var resizeCanvas = function() {
  canvas.width = window.innerWidth;
  canvas.hieght = window.innerHeight;
}
resizeCanvas();

var id = 0
function Circle() {
  this.id = id++;
  this.x = Math.ceil(Math.random() * canvas.width);
  this.y = Math.ceil(Math.random() * canvas.height);
  this.radius = Math.ceil(Math.random() * 10 + 10);
  this.moveX =  Math.ceil(Math.random() * -5 + 2.5);
  this.moveY =  Math.ceil(Math.random() * -5 + 2.5);
  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
  this.tick = function() {
    this.x += this.moveX;
    this.y += this.moveY;
    if(this.x <= 0 + this.radius) {
      this.moveX = Math.abs(this.moveX);
    }
    if(this.x >= canvas.width - this.radius) {
      this.moveX = Math.abs(this.moveX) * -1;
    }
    if(this.y <= 0 + this.radius) {
      this.moveY = Math.abs(this.moveY);
    }
    if(this.y >= canvas.height - this.radius) {
      this.moveY = Math.abs(this.moveY) * -1;
    }
    this.draw();
  }
}

var circleField = [];
for (let i = 0; i < 5; i++) {
  circleField.push(new Circle);
}

for (let i in circleField) {
  thing = circleField[i];
  if (typeof thing.init === "function") {
    thing.init();
  }
}

var simulate = function() {
  resizeCanvas();
  for (let i in circleField) {
    thing = circleField[i];
    if (typeof thing.tick === "function") {
      thing.tick();
    }
  }
}
var interval = setInterval(simulate, 25);
