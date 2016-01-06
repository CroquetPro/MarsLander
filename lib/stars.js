var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

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
