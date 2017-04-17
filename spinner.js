var canvas;
var context;
var spinner;
var timer;

function Spinner () {
  this.image = new Image();
  this.image.src = "./spinner.png";
  this.speed = 1.0;
  this.isSpinning = false;

  // Make animation adjustments between frames
  this.act = function(){
    this.speed -= this.speed / 100;
    if(this.speed < 0.02) this.isSpinning = false;
  };

  this.draw = function(context){
    this.act();
    // Translate the canvas so it rotates around the center
    context.translate(canvas.width/2, canvas.height/2);

    if (this.isSpinning) context.rotate(this.speed);

    context.drawImage(this.image, -this.image.width/2, -this.image.height/2);
    context.translate(-canvas.width/2, -canvas.height/2);
  };

};

function spin() {
  spinner.isSpinning = spinner.isSpinning ? false : true;
  spinner.speed = 1.0;
}

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  // Setup touch and mouse support to call the spin function
  document.body.addEventListener("mouseup", spin, false);
  document.body.addEventListener("touchup", spin, false);

  spinner = new Spinner();

  // Call the draw function 30 times a second
  setInterval(draw, 1000/30);
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  spinner.draw(context);
}
