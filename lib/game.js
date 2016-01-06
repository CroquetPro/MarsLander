var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var message = "";

function checkLanding(){
  if (spaceship.falling){
    if (spaceship.position.y < platform.position.y + 50 - spaceship.height &&
      spaceship.position.y > platform.position.y - 50 - spaceship.height ){
      if  (spaceship.position.y > platform.position.y - spaceship.height) {
        if (spaceship.position.x < platform.position.x + platform.width - spaceship.width &&
            spaceship.position.x > platform.position.x){
          if (spaceship.velocity.x < 1 && spaceship.velocity.x > -1){
            if (spaceship.velocity.y > -1.2){
              if (spaceship.angle > -.1 && spaceship.angle < .1){
                spaceship.falling = false;
                message = "Nice Landing!";
                return true;
              } else {
                message = "Too much angle!";
                return true;
              }
            } else {
            message = "Too much vertical speed!";
            return true;
            } // end if
          } else {
            message = "Too much horizontal speed!";
            return true;
          }
        } else {
        message = "Not on platform!";
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
  context.font = '40pt Calibri';
  context.fillStyle = 'white';
  context.textAlign = 'center'
  context.fillText( message, canvas.width / 2 , 600);
}

function draw() {

  // clearing the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  drawGround();
  drawPlatform();
  drawStats();
  drawSpaceship();

  if ( checkLanding() ) {
    drawMessage();
    if ( spaceship.falling === false ) {
        // success
        requestAnimationFrame(draw);
    } else {
      //explode!
    }
  } else {
    updateSpaceship();
    requestAnimationFrame(draw);
  }
}


function keyPressed(event)
{
  switch(event.keyCode)
      {
          case 37:
              // Left Arrow key
              spaceship.rotatingLeft = true;
              break;
          case 39:
              // Right Arrow key
              spaceship.rotatingRight = true;
              break;
          case 38:
              // Up Arrow key
              spaceship.engineOn = true;
              break;
      }}

document.addEventListener('keydown', keyPressed);

function keyLetGo(event)
{
    switch(event.keyCode)
    {
        case 37:
            // Left Arrow key
            spaceship.rotatingLeft = false;
            break;
        case 39:
            // Right Arrow key
            spaceship.rotatingRight = false;
            break;
        case 38:
            // Up Arrow key
            spaceship.engineOn = false;
            break;
    }
}

document.addEventListener('keyup', keyLetGo);

draw();
// or
// requestAnimationFrame(draw);
