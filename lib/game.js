var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var message = "";

var tadaSound = new Audio('assets/tada.mp3');
var explosionSound = new Audio('assets/explosion.mp3');


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
  return true;
} // end checkLanding

function drawMessage(){
  context.font = '40pt Orbitron';
  context.fillStyle = 'red';
  context.textAlign = 'center'
  context.fillText( message, canvas.width / 2 , 600);
}

function draw() {

  // clearing the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  drawStats();
  drawFuel();
  drawSpaceship();
  drawGround();
  drawPlatform();

  if ( checkLanding() ) {
    drawMessage();
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
              spaceship.rotatingLeft = true;
              break;
          case 39:
              // Right Arrow key
              event.preventDefault();
              spaceship.rotatingRight = true;
              break;
          case 38:
              // Up Arrow key
              event.preventDefault();
              if(spaceship.fuel > 0){
                spaceship.engineOn = true;
              }
              break;
          case 32:
              // space bar
              event.preventDefault();
              if(!spaceship.falling){
                spaceship = new Spaceship;;
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
