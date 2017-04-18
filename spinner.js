// Settings
var fps = 60; // Frames Per Second

var canvas;
var context;
var spinner;
var timer;

function Spinner () {
  this.image = new Image();
  this.image.src = "./spinner.png";
  this.isSpinning = false;

  // Make animation adjustments between frames
  this.act = function(){
    this.speed -= this.speed / (fps * 1.5);
    if(this.speed < 0.05) this.isSpinning = false;
  };

  this.draw = function(context){
    this.act();
    // Translate the canvas so it rotates around the center
    context.translate(canvas.width/2, canvas.height/2);

    if (this.isSpinning) context.rotate(this.speed);

    context.drawImage(this.image, -this.image.width/2, -this.image.height/2);
    context.translate(-canvas.width/2, -canvas.height/2);
  };

  this.spin = function(){
    this.isSpinning = this.isSpinning ? false : true;
    this.speed = Math.random() + 1.0;
  };
};

function spin() {
  spinner.spin();
}

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  document.getElementById("board").style.backgroundImage = "url('./board_four.png')";

  // Setup touch and mouse support to call the spin function
  canvas.addEventListener("mousedown", spin, false);
  canvas.addEventListener("touchdown", spin, false);

  spinner = new Spinner();

  // Call the draw function x times a second
  setInterval(draw, 1000/fps);
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  spinner.draw(context);
}
