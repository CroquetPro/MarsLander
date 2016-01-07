var craters = []
for (var i = 0; i < 100; i++) {
  craters[i] = {
    x: Math.random() * canvas.width,
    y: Math.random() * 290 + 510,
    radius: Math.sqrt(Math.random() * 50 + 10),
    alpha: Math.random(),
  };
}
//
// var rocks = []
// for (var i = 0; i < 100; i++) {
//   rocks[i] = {
//     x: Math.random() * canvas.width,
//     y: Math.random() * 290 + 510,
//     radius: Math.sqrt(Math.random() * 30 + 10),
//     alpha: Math.random(),
//   };
// }
//
//
// function drawGround() {
//   context.save();
//
//   context.beginPath();
//   context.rect(0, platform.position.y + 1, canvas.width, canvas.height - platform.position.y + 1);
//   context.fillStyle = "red";
//   context.fill();
//   context.closePath();
//
//
//   for (var i = 0; i < rocks.length; i++) {
//     var rock = rocks[i];
//     context.beginPath();
//     context.rect(rock.x/3 - rock.radius * rock.alpha,
//                 rock.y - rock.radius * (1 - rock.alpha),
//                 rock.radius * rock.alpha,
//                 rock.radius * 3 * (1 - rock.alpha));
//     context.fillStyle = "rgba(148, 6, 0, " + rock.alpha + ")";
//     context.fill();
//     context.closePath();
//   }
//
//   context.restore();
// }

var mars = new Image();
drawGround = function() {
    context.drawImage(mars, 0, 500);

    // context.save();
    // context.scale(3, 1);
    // for (var i = 0; i < craters.length; i++) {
    //   var crater = craters[i];
    //   context.beginPath();
    //   context.arc(crater.x/3, crater.y, crater.radius, 0, 2*Math.PI, false);
    //   context.strokeStyle = "rgba(128, 6, 0, " + crater.alpha + ")";
    //   context.stroke();
    //   context.closePath();
    // }
    // context.restore();
};
mars.src = 'http://a.abcnews.go.com/images/Technology/HT_curiosity_mars_surface_nt_130923_33x16_1600.jpg';
