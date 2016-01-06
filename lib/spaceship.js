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
var spacex = new Image();
spacex.src = "http://seradata.com/SSI/wp-content/uploads/2014/01/SpaceXDragon.jpg";

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

  context.scale(.025, .025);
  context.rotate(-Math.PI/2);
  context.drawImage(spacex, -1500, 50);

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

function drawStats() {
  context.font = '20pt Calibri';
  context.fillStyle = 'white';
  context.textAlign = 'right'
  context.fillText( "altitude: " + (500 - Math.round(spaceship.position.y) - spaceship.height), canvas.width - 20, 30);
  context.fillText( "horizontal velocity: " + Math.round(spaceship.velocity.x * 5), canvas.width - 20, 60);
  context.fillText( "vertical velocity: " + Math.round(spaceship.velocity.y * 5), canvas.width - 20, 90);
}
