var canvas;
var context;
var timer;
var pin = new Image();


function init() {
  pin.src = "./frabby.png";
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  timer = setInterval(draw, 10);
  return timer;
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.translate(canvas.width/2, canvas.height/2);
  context.rotate(.1);
  context.drawImage(pin, -pin.width/2, -pin.height/2);
  context.translate(-canvas.width/2, -canvas.height/2);
}
