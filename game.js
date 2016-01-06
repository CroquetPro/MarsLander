var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var spaceship =
{
  color: "white",
  width: 17,
  height: 44,
  position: { x: 0, y: 0 },
  angle: 0,
  velocity: { x: 1, y: 0 },
  thrust: 0.1,
  engineOn: false,
  rotatingLeft: false,
  rotatingRight: false,
  falling: true,
}

function drawSpaceship()
{
  context.save();
  context.beginPath();
  context.translate(spaceship.position.x, spaceship.position.y);
  context.rotate(spaceship.angle);
  // context.rect(spaceship.width * -0.5, spaceship.height * -0.5, spaceship.width, spaceship.height);
  context.arc(spaceship.width * 0.5, 2.5, 2.5, 0, 2*Math.PI)
  context.moveTo(10, 1.5);
  context.lineTo(12, 3);
  context.lineTo(13, 6);
  context.lineTo(16, 15);
  context.lineTo(spaceship.width, 22);
  context.lineTo(spaceship.width, spaceship.height - 3);
  context.lineTo(spaceship.width - 3, spaceship.height - 3);
  context.lineTo(spaceship.width, spaceship.height);
  context.lineTo(0, spaceship.height);
  context.lineTo(3, spaceship.height - 3);
  context.lineTo(0, spaceship.height - 3);
  context.lineTo(0, 22);
  context.lineTo(1, 15);
  context.lineTo(4, 6);
  context.lineTo(5, 3);
  context.lineTo(7, 1.5);
  context.fillStyle = spaceship.color;
  context.fill();
  context.closePath();

  if(spaceship.engineOn)
  {
    context.beginPath();
    context.moveTo(0, spaceship.height);
    context.lineTo(spaceship.width, spaceship.height);
    context.lineTo(spaceship.width * 0.5, spaceship.height + 5 + Math.random() * 10);
    context.lineTo(0, spaceship.height);
    context.closePath();
    context.fillStyle = "orange";
    context.fill();
  }
  context.restore();
}

var gravity = 0.05;

function updateSpaceship()
{
  spaceship.position.x += spaceship.velocity.x;
  spaceship.position.y -= spaceship.velocity.y;

  if(spaceship.rotatingRight) {
    spaceship.angle += Math.PI / 180;
  } else if(spaceship.rotatingLeft) {
    spaceship.angle -= Math.PI / 180;
  }
  if(spaceship.engineOn) {
    // spaceship.position.x += Math.sin(spaceship.angle);
    // spaceship.position.y -= Math.cos(spaceship.angle);
    spaceship.velocity.x += spaceship.thrust * Math.sin(spaceship.angle);
    spaceship.velocity.y += spaceship.thrust * Math.cos(spaceship.angle);

  }
  spaceship.velocity.y -= gravity;
}

var message = "";

var platform = {
  width: 50,
  position: { x: 500, y: 500 },
}

function drawPlatform()
{
  context.save();
  context.beginPath();
  context.rect(platform.position.x, platform.position.y, platform.width, 5);
  context.fillStyle = "green";
  context.fill();
  context.restore();
}

function drawGround() {
  context.save();
  context.beginPath();
  context.rect(0, platform.position.y + 1, canvas.width, canvas.height - platform.position.y + 1);
  context.fillStyle = "red";
  context.fill();
  context.restore();
}

function checkLanding(){
  if (spaceship.falling){
    if (spaceship.position.y < platform.position.y + 50 - spaceship.height &&
      spaceship.position.y > platform.position.y - 50 - spaceship.height ){
      if  (spaceship.position.y > platform.position.y - spaceship.height) {
        if (spaceship.position.x < platform.position.x + platform.width - spaceship.width &&
            spaceship.position.x > platform.position.x){
          if (spaceship.velocity.x < 1 && spaceship.velocity.x > -1){
            if (spaceship.velocity.y < .2){
              if (spaceship.angle > -.1 && spaceship.angle < .1){
                spaceship.velocity = { x: 0, y: 0};
                spaceship.falling = false;
                console.log("Nice Landing!");
                return true;
              } else {
                console.log("too much angle!");
                return true;
              }
            } else {
            console.log("too much vertical speed!");
            return true;
            } // end if
          } else {
            console.log("too much horizontal speed!");
            return true;
          }
        } else {
        console.log("not on platform!");
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

var stars = [];

for (var i = 0; i < 500; i++) {
  stars[i] = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.sqrt(Math.random() * 2),
    alpha: 1.0,
    decreasing: true,
    dRatio: Math.random()*0.05
  };
}

function drawStars() {
  context.save();
  context.fillStyle = "#111"
  context.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];
    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, 2*Math.PI);
    context.closePath();
    context.fillStyle = "rgba(255, 255, 255, " + star.alpha + ")";
    if (star.decreasing == true) {
      star.alpha -= star.dRatio;
      if (star.alpha < 0.1) {
        star.decreasing = false;
      }
    } else {
      star.alpha += star.dRatio;
      if (star.alpha > 0.95) {
        star.decreasing = true;
      }
    }
    context.fill();
  }
  context.restore();
}



function draw() {

  // clearing the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  drawSpaceship();
  drawGround();
  drawPlatform();
  if ( checkLanding() ) {
    if ( spaceship.falling === false ) {
        gravity = 0;
        spaceship.velocity = { x: 0, y: 0};
        requestAnimationFrame(draw);
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
