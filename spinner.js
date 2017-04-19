// Settings
var fps = 60; // Frames Per Second
var boards = ["board_four.png", "board_six.png", "board_ten.png"];
var spinners = ["spinner1.png", "spinner2.png"];
var currentBoard = 0;

var canvas;
var context;
var spinner;
var timer;

function Spinner () {
  this.image = new Image();
  this.image.src = "./images/spinner1.png";
  this.currentSpinner = 0;
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

  this.setSpinnerPrev = function() {
    this.currentSpinner = this.currentSpinner - 1 >= 0 ? this.currentSpinner - 1: spinners.length - 1;
    this.image.src = "./images/" + spinners[this.currentSpinner];
  }

  this.setSpinnerNext = function() {
      this.currentSpinner = this.currentSpinner + 1 < spinners.length ? this.currentSpinner + 1 : 0;
      this.image.src = "./images/" + spinners[this.currentSpinner];
    }
};

function setBoard() {
  document.getElementById("board").style.backgroundImage = "url('./images/" + boards[currentBoard] + "')";
}

function setBoardNext() {
    currentBoard = currentBoard + 1 < boards.length ? currentBoard + 1 : 0;
    setBoard();
}

function setBoardPrev() {
    currentBoard = currentBoard - 1 >= 0 ? currentBoard - 1: boards.length - 1;
    setBoard();
}

function spin() {
  spinner.spin();
}

function setSpinnerPrev(){
  spinner.setSpinnerPrev();
}

function setSpinnerNext(){
  spinner.setSpinnerNext();
}

function init() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  setBoard();
  document.getElementById("prev_board").addEventListener("click", setBoardPrev, false);
  document.getElementById("next_board").addEventListener("click", setBoardNext, false);

  document.getElementById("prev_spinner").addEventListener("click", setSpinnerPrev, false);
  document.getElementById("next_spinner").addEventListener("click", setSpinnerNext, false);

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
