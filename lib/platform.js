var platform = {
  width: 50,
  position: { x: 475, y: 500 },
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
