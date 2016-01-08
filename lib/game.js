var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var message = "";

var tadaSound = new Audio('assets/tada.mp3');
var explosionSound = new Audio('assets/explosion.mp3');

var scores = [];


function checkLanding(){
  if (spaceship.falling){
    if (lowestPoint() < platform.position.y + 150 &&
      lowestPoint() > platform.position.y - 50){
      if  (lowestPoint() > platform.position.y ) {
        if (spaceship.position.x < platform.position.x + platform.width - spaceship.width/2 &&
            spaceship.position.x > platform.position.x + spaceship.width/2){
          if (spaceship.velocity.x < 1 && spaceship.velocity.x > -1){
            if (spaceship.velocity.y > -1){
              if (spaceship.angle > -.1 && spaceship.angle < .1){
                spaceship.falling = false;
                spaceship.landed = true;
                message = "Nice Landing!";
                scores.push(spaceship.fuel);
                tadaSound.play();
                return true;
              } else {
                spaceship.falling = false;
                spaceship.exploded = true;
                message = "Too much angle!";
                explosionSound.play();
                return true;
              }
            } else {
            spaceship.falling = false;
            spaceship.exploded = true;
            message = "Too much vertical speed!";
            explosionSound.play();
            return true;
            } // end if
          } else {
            spaceship.falling = false;
            spaceship.exploded = true;
            message = "Too much horizontal speed!";
            explosionSound.play();
            return true;
          }
        } else {
        spaceship.falling = false;
        spaceship.exploded = true;
        message = "Missed the platform!";
        explosionSound.play();
        return true;
        }
        } else {
          return false;
      } // end within 1 of platform
   } // check for landing
   return false
  } // end 'are we falling?' if
  // return true;
} // end checkLanding

function drawTitle(){
  context.font = '40pt Orbitron';
  context.fillStyle = 'red';
  context.textAlign = 'center'
  context.fillText( "Mars Lander", canvas.width / 2 , 50);
}

function drawMessage(){
  context.font = '40pt Orbitron';
  context.fillStyle = 'red';
  context.textAlign = 'center'
  context.fillText( message, canvas.width / 2 , 600);
}

function drawInstructions(){
  context.font = '20pt Orbitron';
  context.fillStyle = 'green';
  context.textAlign = 'center'
  context.fillText( "Try to land on the green pad.", canvas.width / 2 , 150);
  context.fillText( "Use up arrow for thrust, left and right arrows to maneuver.", canvas.width / 2 , 180);
  context.fillText( "[Hint] Velocity must be less than 5 to land safely.", canvas.width / 2 , 230);
}

function drawRestart(){
  context.font = '40pt Orbitron';
  context.fillStyle = 'red';
  context.textAlign = 'center'
  context.fillText( "Press [spacebar] to start.", canvas.width / 2 , 700);
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


function keyPressed(event)
{
  switch(event.keyCode)
      {
          case 37:
              // Left Arrow key
              event.preventDefault();
              if(spaceship.falling){
                spaceship.rotatingLeft = true;
              }
              break;
          case 39:
              // Right Arrow key
              event.preventDefault();
              if(spaceship.falling){
                spaceship.rotatingRight = true;
              }
              break;
          case 38:
              // Up Arrow key
              event.preventDefault();
              if(spaceship.falling && spaceship.fuel > 0){
                spaceship.engineOn = true;
              }
              break;
          case 32:
              // space bar
              event.preventDefault();
              if(!spaceship.falling){
                spaceship = new Spaceship;
                spaceship.falling = true;
              }
      }}

document.addEventListener('keydown', keyPressed);

function keyLetGo(event)
{
    switch(event.keyCode)
    {
        case 37:
            // Left Arrow key
            spaceship.rotatingLeft = false;
            rotateSound.pause();
            rotateSound.currentTime = 1;
            break;
        case 39:
            // Right Arrow key
            spaceship.rotatingRight = false;
            rotateSound.pause();
            rotateSound.currentTime = 1;

            break;
        case 38:
            // Up Arrow key
            spaceship.engineOn = false;
            thrustSound.pause();
            break;
    }
}

document.addEventListener('keyup', keyLetGo);

draw();
// or
// requestAnimationFrame(draw);
