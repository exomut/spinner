var canvas;
var context;
var timer;

var spinner;

function Spinner () {
  this.speed = 0.0;
  this.image = new Image();
  this.image.src = "./frabby.png";

  this.draw = function(context){
    context.drawImage(this.image, -this.image.width/2, -this.image.height/2);
  };
};


function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  timer = setInterval(draw, 30);
  spinner = new Spinner();
  return timer;
}

function draw() {
  context.fillStyle = "#99CCFF";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.translate(canvas.width/2, canvas.height/2);
  context.rotate(.6);
  spinner.draw(context);
  context.translate(-canvas.width/2, -canvas.height/2);
}
