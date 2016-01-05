var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var spaceship =
{
  color: "black",
  width: 8,
  height: 22,
  position:
  {
    x: 100,
    y: 100
  },
  angle: 0,
  engineOn: true,
  rotatingLeft: false,
  rotatingRight: false
}

function drawSpaceship()
{
  context.save();
  context.beginPath();
  context.translate(spaceship.position.x, spaceship.position.y);
  context.rotate(spaceship.angle);
  context.rect(spaceship.width * -0.5, spaceship.height * -0.5, spaceship.width, spaceship.height);
  context.fillStyle = spaceship.color;
  context.fill();
  context.closePath();

  if(spaceship.engineOn)
  {
    context.beginPath();
    context.moveTo(spaceship.width * -0.5, spaceship.height * 0.5);
    context.lineTo(spaceship.width * 0.5, spaceship.height * 0.5);
    context.lineTo(0, spaceship.height * 0.5 + Math.random() * 5);
    context.lineTo(spaceship.width * -0.5, spaceship.height * 0.5);
    context.closePath();
    context.fillStyle = "orange";
    context.fill();
  }
  context.restore();
}

function updateSpaceship()
{
  if(spaceship.rotatingRight) {
    spaceship.angle += Math.PI / 180;
  } else if(spaceship.rotatingLeft) {
    spaceship.angle -= Math.PI / 180;
  }
  if(spaceship.engineOn) {
    spaceship.position.x += Math.sin(spaceship.angle);
    spaceship.position.y -= Math.cos(spaceship.angle);
  }
}

function draw() {

  // clearing the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  updateSpaceship();
  drawSpaceship();
  requestAnimationFrame(draw);
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
