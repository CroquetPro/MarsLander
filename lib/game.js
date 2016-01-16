var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var message = "";

function drawTitle(){
  context.font = '40pt Orbitron';
  context.fillStyle = 'red';
  context.textAlign = 'center'
  context.fillText( "Mars Lander", canvas.width / 2 , 50);
}


function drawInstructions(){
  context.font = '20pt Orbitron';
  context.fillStyle = 'green';
  context.textAlign = 'center'
  context.fillText( "Try to land on the green pad.", canvas.width / 2 , 150);
  context.fillText( "Use up arrow for thrust, left and right arrows to maneuver.", canvas.width / 2 , 180);
  context.fillText( "--Hint-- Velocity must be less than 5 to land safely.", canvas.width / 2 , 230);
}

function drawMessage(){
  context.font = '40pt Orbitron';
  context.fillStyle = 'yellow';
  context.textAlign = 'center'
  context.fillText( message, canvas.width / 2 , 550);
}

function drawRestart(){
  context.font = '40pt Orbitron';
  context.fillStyle = 'yellow';
  context.textAlign = 'center'
  context.fillText( "Press [spacebar] to start.", canvas.width / 2, 630);
  drawPortfolio();
}

function drawPortfolio(){
  context.font = '20pt Orbitron';
  context.fillStyle = 'yellow';
  context.textAlign = 'right'
  // context.fillText( "Check out my", canvas.width, 640);
  // context.fillText( "portfolio!", canvas.width - 5, 670);
  context.fillText( "Check out my portfolio ---> ", canvas.width, 690);
}

function drawScores(){
  var reverse = function(a, b) { return b - a; };

  context.font = '15pt Orbitron';
  context.fillStyle = 'white';
  context.textAlign = 'right'
  context.fillText( "High Scores:", canvas.width - 65, 350);
  for( var i = 0; i < scores.length && i < 5; i++ ){
    context.fillText((i+1) + ":", canvas.width - 180, 350 + 30*(i+1));
    context.fillText(+ scores.sort(function(a, b) {
      return b - a;
    })[i], canvas.width - 80, 350 + 30*(i+1));
  }
}

function drawStats() {
  context.font = '15pt Orbitron';
  context.fillStyle = 'white';
  context.textAlign = 'right'
  context.fillText( "Altitude: ", canvas.width - 80, 30);
  context.fillText((500 - Math.round(spaceship.position.y) - spaceship.height/2), canvas.width - 20, 30);
  context.fillText( "Horizontal Velocity: ", canvas.width - 80, 60);
  context.fillText( Math.round(spaceship.velocity.x * 5), canvas.width - 20, 60);
  context.fillText( "Vertical Velocity: ", canvas.width - 80, 90);
  context.fillText( Math.round(spaceship.velocity.y * 5), canvas.width - 20, 90);
}

function drawFuel() {
  context.font = '20pt Orbitron';
  context.fillStyle = 'white';
  if (spaceship.fuel < 100){
    context.fillStyle = 'red';
  }
  context.textAlign = 'center'
  context.fillText( "Fuel: " + spaceship.fuel, canvas.width/2, 90);
}

function drawLanding(){
  context.font = '40pt Orbitron';
  context.fillStyle = 'green';
  context.textAlign = 'center'
  context.fillText( "We have touchdown!", canvas.width / 2 , 300);
  drawMessage();
  drawRestart();
}

function drawExplosion(position){
  context.save();

  var explosion = new Image();
  explosion.src = 'assets/explosion3(transparent).gif';
  context.drawImage(explosion, position.x - 330, 180);

  context.restore();

  drawMessage();
  drawInstructions();
  drawRestart();
}

function draw() {

  // clearing the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  drawTitle();
  drawSpaceship();
  drawGround();
  drawStats();
  drawFuel();
  if (!spaceship.falling && !spaceship.landed){
    drawInstructions();
    drawRestart();
  }
  drawPlatform();

  if ( checkLanding() ) {
    drawStats();
    drawFuel();
    drawSpaceship();
  }
  updateSpaceship();
  requestAnimationFrame(draw);
}

draw();
