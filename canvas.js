var mainCanvas = document.getElementById("main-canvas");
var ctx = mainCanvas.getContext("2d");

let triangleCanvas = document.getElementById("triangle-canvas");
let triangleCtx = mainCanvas.getContext("2d");

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
  constructor(x, y, width, height, fillColor, opacity, canvas) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.fillColor = fillColor;
    this.opacity = opacity;
    this.canvas = canvas;
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
    this.x = this.canvas.width / 2 - this.width / 2;
  }

  decreaseHeight() {
    this.height -= 1.5;
    this.y = this.canvas.height / 2 - this.height / 2;
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

  getTriangleCentroid = () => {
    var x = (this.points[0][0] + this.points[1][0] + this.points[2][0]) / 3;
    var y = (this.points[0][1] + this.points[1][1] + this.points[2][1]) / 3;
    return [x, y];
  };

  decreaseOpacity() {
    if (this.opacity - 0.025 < 0) {
      this.opacity = 0;
    } else {
      this.opacity -= 0.025;
    }
  }
}

// Draw on the Canvas

const rotateTriangleAnimation = (triangle) => {
  var radians = (angle * Math.PI) / 180;
  triangleCtx.translate(triangleCanvas.width / 2, triangleCanvas.height / 2);
  triangleCtx.rotate(radians);
  triangle.drawTriangle(triangleCtx);
  triangleCtx.rotate(-radians);
  triangleCtx.translate(-triangleCanvas.width / 2, -triangleCanvas.height / 2);
  incrementAngle();
};
var angle = 0;

const incrementAngle = () => {
  angle++;
  if (angle > 360) {
    angle = 0;
  }
};

const toRadians = (degree) => {
  return degree * (Math.PI / 180);
};

triangleCanvas.onclick = () => {
  this.cancelled = true;
  console.log("Click");
  animateCanvas();
};

let frame;
let bigCircle;
let triangle;
let square;
let smallCircle;
let cancelled = false;

// Draw Canvas
const drawStartingCanvas = () => {
  if (this.cancelled) {
    console.log("cancelled");
    return;
  }
  var c = document.getElementById("main-canvas");
  var ctx = c.getContext("2d");
  let triangleCanvas = document.getElementById("triangle-canvas");
  let triangleCtx = triangleCanvas.getContext("2d");
  ctx.lineWidth = 1;
  var frame = new Box(
    c.width / 2 - 400 / 2,
    c.height / 2 - 225 / 2,
    400,
    225,
    "255, 255, 255",
    1,
    c
  );
  this.frame = frame;
  frame.drawBox(ctx);
  ctx.moveTo(600, 250);
  var bigCircle = new Circle(500, 250, 100, "66, 194, 255", 0.77);
  this.bigCircle = bigCircle;
  bigCircle.drawCircle(ctx);
  triangleCtx.moveTo(410, 290);
  var trianglePoints = [
    [-85, 50],
    [0, -100],
    [85, 50],
  ];

  var triangle = new Triangle(trianglePoints, "133, 244, 255", 1);
  this.triangle = triangle;
  rotateTriangleAnimation(triangle);

  ctx.moveTo(462.5, 290);
  var square = new Box(462.5, 210, 75, 80, "184, 255, 249", 1, c);
  this.square = square;
  square.drawBox(ctx);
  ctx.moveTo(300, 135);
  var smallCircle = new Circle(500, 250, 22.5, "239, 255, 253", 1);
  this.smallCircle = smallCircle;
  smallCircle.drawCircle(ctx);
  requestAnimationFrame(drawStartingCanvas);
};

function animateCanvas() {
  var c = document.getElementById("main-canvas");
  var ctx = c.getContext("2d");
  // Small Circle
  ctx.clearRect(0, 0, c.width, c.height);
  if (this.smallCircle.getRadius <= 425) {
    this.smallCircle.incrementRadius();
  }
  if (this.smallCircle.getOpacity >= 0) {
    this.smallCircle.decreaseOpacity();
  }

  // Big Circle
  if (this.bigCircle.getRadius <= 475) {
    this.bigCircle.incrementRadius();
  }
  if (this.bigCircle.getOpacity >= 0) {
    this.bigCircle.decreaseOpacity();
  }
  this.triangle.decreaseOpacity();

  rotateTriangleAnimation(this.triangle);

  // Square
  if (this.square.getHeight >= 13) {
    this.square.decreaseHeight();
  }
  if (this.square.getWidth >= 13) {
    this.square.decreaseWidth();
  }
  if (this.square.getOpacity >= 0) {
    this.square.decreaseOpacity();
  }

  this.smallCircle.drawCircle(ctx);
  this.bigCircle.drawCircle(ctx);
  this.square.drawBox(ctx);
  requestAnimationFrame(animateCanvas);
}

drawStartingCanvas();
// animateCanvas();
