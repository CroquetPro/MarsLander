var platforms = [];

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
