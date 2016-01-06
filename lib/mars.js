var craters = []

for (var i = 0; i < 300; i++) {
  craters[i] = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height + 510,
    radius: Math.sqrt(Math.random() * 100),
    alpha: Math.random(),
    decreasing: true,
    dRatio: Math.random()*0.05
  };
}


function drawGround() {
  context.save();
  context.beginPath();
  context.rect(0, platform.position.y + 1, canvas.width, canvas.height - platform.position.y + 1);
  context.fillStyle = "red";
  context.fill();
  context.closePath();
  for (var i = 0; i < craters.length; i++) {
    var crater = craters[i];
    // context.scale(1, .1);
    context.beginPath();
    context.arc(crater.x, crater.y, crater.radius, 0, 2*Math.PI, false);
    context.closePath();
    context.strokeStyle = "rgba(128, 6, 0, " + crater.alpha + ")";
    context.stroke();
  }
  context.restore();
}
