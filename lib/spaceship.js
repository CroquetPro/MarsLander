var Spaceship = function Spaceship(){
  this.color = "white";
  // width: 17,
  this.width = 20;
  // height: 44,
  this.height = 50;
  this.position = { x: 0, y: -25 };
  this.angle = 0;
  this.velocity = { x: 0, y: 0 };
  this.thrust = 0.1;
  this.fuel = 500;
  this.engineOn = false;
  this.rotatingLeft = false;
  this.rotatingRight = false;
  this.falling = false;
  this.landed = false;
  this.exploded = false;

}


var spaceship = new Spaceship;
spaceship.position = { x: 500, y: 350 };
// var spacex = new Image();
// spacex.src = "http://seradata.com/SSI/wp-content/uploads/2014/01/SpaceXDragon.jpg";

var rotateSound = new Audio('assets/rotation.mp3');
// rotateSound.currentTime = 1;
var thrustSound = new Audio('assets/thrust.mp3');
function drawSpaceship()
{
  context.save();
  context.beginPath();
  context.translate(spaceship.position.x, spaceship.position.y);
  context.rotate(spaceship.angle);
  // context.rect(spaceship.width * -0.5, spaceship.height * -0.5, spaceship.width, spaceship.height);
  // context.arc(spaceship.width * 0.5, 2.5, 2.5, 0, 2*Math.PI)
  // context.moveTo(10, 1.5);
  // context.lineTo(12, 3);
  // context.lineTo(13, 6);
  // context.lineTo(16, 15);
  // context.lineTo(spaceship.width, 22);
  // context.lineTo(spaceship.width, spaceship.height - 3);
  // context.lineTo(spaceship.width - 3, spaceship.height - 3);
  // context.lineTo(spaceship.width, spaceship.height);
  // context.lineTo(0, spaceship.height);
  // context.lineTo(3, spaceship.height - 3);
  // context.lineTo(0, spaceship.height - 3);
  // context.lineTo(0, 22);
  // context.lineTo(1, 15);
  // context.lineTo(4, 6);
  // context.lineTo(5, 3);
  // context.lineTo(7, 1.5);
  context.arc(0, -22.5, 2.5, 0, 2*Math.PI)
  context.moveTo(1.5, -23.5);
  context.lineTo(3.5, -21);
  context.lineTo(5, -16);
  context.lineTo(8, -5);
  context.lineTo(8.5, 0);
  context.lineTo(8.5, 22);
  context.lineTo(5.5, 22);
  context.lineTo(8.5, 25);
  context.lineTo(-8.5, 25);
  context.lineTo(-5.5, 22);
  context.lineTo(-8.5, 22);
  context.lineTo(-8.5, 0);
  context.lineTo(-8, -5);
  context.lineTo(-5, -16);
  context.lineTo(-3.5, -21);
  context.lineTo(-1.5, -23);
  context.fillStyle = spaceship.color;
  context.fill();
  context.closePath();

  if(spaceship.engineOn)
  {
    context.beginPath();
    context.moveTo(8.5, 25);
    context.lineTo(-8.5, 25);
    context.lineTo(0, 25 + 5 + Math.random() * 10);
    context.lineTo(8.5, 25);
    context.closePath();
    context.fillStyle = "orange";
    context.fill();
    thrustSound.play();
  }

  if(spaceship.rotatingRight)
  {
    context.beginPath();
    context.moveTo(-2, -23.5);
    context.lineTo(-2, -20.5);
    context.lineTo(-2 - Math.random() * 10, -22);
    context.lineTo(-2, -23.5);
    context.closePath();
    context.fillStyle = "white";
    context.fill();
    rotateSound.play();
    // if (rotateSound.currentTime === 0) { rotateSound.currentTime = 1; }
  }

  if(spaceship.rotatingLeft)
  {
    context.beginPath();
    context.moveTo(2, -23.5);
    context.lineTo(2, -20.5);
    context.lineTo(2 + Math.random() * 10, -22);
    context.lineTo(2, -23.5);
    context.closePath();
    context.fillStyle = "white";
    context.fill();
    rotateSound.play();
    // if (rotateSound.currentTime === 0) { rotateSound.currentTime = 1; }
  }

  // context.scale(.025, .025);
  // context.rotate(-Math.PI/2);
  // context.drawImage(spacex, -700, -300);

  context.restore();
}

function updateSpaceship()
{
  if(spaceship.landed){
    spaceship.angle = 0;
    spaceship.position.y = platform.position.y - spaceship.height/2;
    spaceship.engineOn = false;
    drawLanding();
    drawScores();
    return;
  } else if (spaceship.exploded){
    spaceship.engineOn = false;
    drawExplosion(spaceship.position);
    return;
  }

  if (spaceship.falling){
    var gravity = 0.05;
    spaceship.velocity.y -= gravity;
    spaceship.position.x += spaceship.velocity.x;
    spaceship.position.y -= spaceship.velocity.y;
  }

  if(spaceship.rotatingRight) {
    spaceship.angle += Math.PI / 180;
  } else if(spaceship.rotatingLeft) {
    spaceship.angle -= Math.PI / 180;
  }
  if(spaceship.engineOn && spaceship.falling) {
    // spaceship.position.x += Math.sin(spaceship.angle);
    // spaceship.position.y -= Math.cos(spaceship.angle);
    spaceship.velocity.x += spaceship.thrust * Math.sin(spaceship.angle);
    spaceship.velocity.y += spaceship.thrust * Math.cos(spaceship.angle);
    spaceship.fuel -= 1;
    if(spaceship.fuel === 0){
      spaceship.engineOn = false;
      thrustSound.pause();
    };
  }
}

function lowestPoint(){
  if(Math.pow(spaceship.angle, 2) >= Math.pow(Math.PI/4, 2)){
    return spaceship.position.y + 10;
  } else {
    return spaceship.position.y + 25;
  }
}
