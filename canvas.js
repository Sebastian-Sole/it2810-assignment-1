var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

class Circle {
  constructor(x, y, radius, fillColor) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fillColor = fillColor;
  }
  getRadius() {
    return this.radius;
  }

  incrementRadius() {
    this.radius += 1;
  }

  drawCircle(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }

  animate(ctx) {
    var startRadius;
    for (let i = startRadius; i < 5000; i++) {
      ctx.clearArc(ctx, this.x, this.y);
      this.radius += 1;
      drawCircle(ctx);
    }
  }

  clearArc() {
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.begin;
  }
}

class Box {
  constructor(x, y, width, height, fillColor) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.fillColor = fillColor;
  }

  drawBox(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }
}

class Triangle {
  constructor(points, fillColor) {
    this.points = points;
    this.fillColor = fillColor;
  }

  drawTriangle(ctx) {
    ctx.beginPath();
    var region = new Path2D();
    region.lineTo(this.points[0][0], this.points[0][1]);
    region.lineTo(this.points[1][0], this.points[1][1]);
    region.lineTo(this.points[2][0], this.points[2][1]);
    region.closePath();
    ctx.stroke(region);
    ctx.fillStyle = this.fillColor;
    ctx.fill(region);
  }
}

// Draw on the Canvas

ctx.lineWidth = 10;
ctx.moveTo(3000, 1350);
var frame = new Box(3000, 1350, 4000, 2250, "white");
frame.drawBox(ctx);
ctx.moveTo(6000, 2500);
var bigCircle = new Circle(5000, 2500, 1000, "#42C2FFC5");
bigCircle.drawCircle(ctx);
ctx.moveTo(4100, 2900);
var trianglePoints = [
  [5000, 1550],
  [5900, 2900],
  [4100, 2900],
];
var triangle = new Triangle(trianglePoints, "#85F4FFFF");
triangle.drawTriangle(ctx);
ctx.moveTo(4625, 2900);
var square = new Box(4625, 2100, 750, 800, "#b8fff9");
square.drawBox(ctx);
ctx.moveTo(3000, 1350);
var smallCircle = new Circle(5000, 2500, 225, "#EFFFFD");
smallCircle.drawCircle(ctx);

c.onclick = function () {
  console.log("Click");
  // smallCircle.animate();
  // bigCircle.animate();
  // triangle.animate();
  // frame.animate();
  // square.animate();
  animateCanvas(ctx, smallCircle);
};

function animateCanvas(ctx, smallCircle) {
  // Small Circle
  console.log(smallCircle);
  var smallCircleStartRadius = smallCircle.getRadius();
  for (let i = smallCircleStartRadius; i < 5000; i++) {
    if (smallCircle.getRadius() == 4500) {
      return;
    } else {
      ctx.clearRect(0, 0, ctx.width, ctx.height);
      smallCircle.incrementRadius();
      smallCircle.drawCircle(ctx);
    }
    if (bigCircle.getRadius() == 5000) {
      return;
    } else {
      ctx.clearRect(0, 0, ctx.width, ctx.height);
      bigCircle.incrementRadius();
      bigCircle.drawCircle(ctx);
    }
  }
  requestAnimationFrame(animateCanvas);

  // Big Circle
  // var bigCircleStartRadius = bigCircle.getRadius();
  // for (let i = bigCircleStartRadius; i < 5000; i++) {}

  // Square

  // Frame

  // Triangle
}

$(function () {
  $(".box").click(function () {});
});
