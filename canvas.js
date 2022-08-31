var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

class Circle {
  constructor(x, y, radius, fillColor, opacity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fillColor = fillColor;
    this.opacity = opacity;
  }
  get getOpacity() {
    return this.opacity;
  }
  get getRadius() {
    return this.radius;
  }

  incrementRadius() {
    this.radius += 10;
  }

  extractColor() {
    return "rgba(" + this.fillColor + ", " + this.opacity + ")";
  }

  decreaseOpacity() {
    if (this.opacity - 0.025 < 0) {
      this.opacity = 0;
    } else {
      this.opacity -= 0.025;
    }
  }

  drawCircle(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.extractColor();
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }

  animate(ctx) {
    var startRadius;
    for (let i = startRadius; i < 500; i++) {
      ctx.clearArc(ctx, this.x, this.y);
      this.radius += 1;
      drawCircle(ctx);
    }
  }
}

class Box {
  constructor(x, y, width, height, fillColor, opacity) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.fillColor = fillColor;
    this.opacity = opacity;
  }

  get getHeight() {
    return this.height;
  }

  get getWidth() {
    return this.width;
  }

  get getOpacity() {
    return this.opacity;
  }

  decreaseWidth() {
    this.width -= 1.5;
    this.x = canvas.width / 2 - this.width / 2;
  }

  decreaseHeight() {
    this.height -= 1.5;
    this.y = canvas.height / 2 - this.height / 2;
  }

  decreaseOpacity() {
    if (this.opacity - 0.025 < 0) {
      this.opacity = 0;
    } else {
      this.opacity -= 0.025;
    }
  }

  drawBox(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.extractColor();
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }

  extractColor() {
    return "rgba(" + this.fillColor + ", " + this.opacity + ")";
  }
}

class Triangle {
  constructor(points, fillColor, opacity) {
    this.points = points;
    this.fillColor = fillColor;
    this.opacity = opacity;
  }

  drawTriangle(ctx) {
    ctx.beginPath();
    var region = new Path2D();
    region.lineTo(this.points[0][0], this.points[0][1]);
    region.lineTo(this.points[1][0], this.points[1][1]);
    region.lineTo(this.points[2][0], this.points[2][1]);
    region.closePath();
    ctx.stroke(region);
    ctx.fillStyle = this.extractColor();
    ctx.fill(region);
  }

  extractColor() {
    return "rgba(" + this.fillColor + ", " + this.opacity + ")";
  }
}

// Draw on the Canvas

ctx.lineWidth = 1;
var frame = new Box(
  canvas.width / 2 - 400 / 2,
  canvas.height / 2 - 225 / 2,
  400,
  225,
  "255, 255, 255",
  1
);
frame.drawBox(ctx);
ctx.moveTo(600, 250);
var bigCircle = new Circle(500, 250, 100, "66, 194, 255", 0.77);
bigCircle.drawCircle(ctx);
ctx.moveTo(410, 290);
var trianglePoints = [
  [500, 155],
  [590, 290],
  [410, 290],
];
var triangle = new Triangle(trianglePoints, "133, 244, 255", 1);
triangle.drawTriangle(ctx);
ctx.moveTo(462.5, 290);
var square = new Box(462.5, 210, 75, 80, "184, 255, 249", 1);
square.drawBox(ctx);
ctx.moveTo(300, 135);
var smallCircle = new Circle(500, 250, 22.5, "239, 255, 253", 1);
smallCircle.drawCircle(ctx);

c.onclick = () => {
  console.log("Click");
  animateCanvas(ctx);
};

function animateCanvas() {
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  // Small Circle
  console.log(smallCircle);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (smallCircle.getRadius <= 425) {
    smallCircle.incrementRadius();
  }
  if (smallCircle.getOpacity >= 0) {
    smallCircle.decreaseOpacity();
  }

  // Big Circle
  if (bigCircle.getRadius <= 475) {
    bigCircle.incrementRadius();
  }
  if (bigCircle.getOpacity >= 0) {
    bigCircle.decreaseOpacity();
  }
  // Triangle

  // Square
  if (square.getHeight >= 13) {
    square.decreaseHeight();
  }
  if (square.getWidth >= 13) {
    square.decreaseWidth();
  }
  if (square.getOpacity >= 0) {
    square.decreaseOpacity();
  }

  smallCircle.drawCircle(ctx);
  bigCircle.drawCircle(ctx);
  console.log(square.getOpacity);
  square.drawBox(ctx);
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
