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

  decrementRadius() {
    this.radius -= 10;
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

  increaseOpacity() {
    if (this.opacity + 0.025 > 1) {
      this.opacity = 1;
    } else {
      this.opacity += 0.025;
    }
  }

  set setRadius(value) {
    this.radius = value;
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
    this.lineWidth = 1;
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

  increaseOpacity() {
    if (this.opacity + 0.025 > 1) {
      this.opacity = 1;
    } else {
      this.opacity += 0.025;
    }
  }

  increaseWidth() {
    this.width += 1.5;
    this.x = this.canvas.width / 2 - this.width / 2;
  }

  increaseHeight() {
    this.height += 1.5;
    this.y = this.canvas.height / 2 - this.height / 2;
  }

  set setHeight(height) {
    this.height = height;
  }

  set setWidth(width) {
    this.width = width;
  }

  increaseLineWidth() {
    if (this.lineWidth + 0.25 > 10) {
      this.lineWidth = 10;
    } else {
      this.lineWidth += 0.25;
    }
  }

  decreaseLineWidth() {
    if (this.lineWidth - 0.25 < 1) {
      this.lineWidth = 1;
    } else {
      this.lineWidth -= 0.25;
    }
  }

  setLineWidth(value) {
    this.lineWidth = value;
  }

  get getLineWidth() {
    return this.lineWidth;
  }

  drawBox(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.extractColor();
    ctx.fill();
    ctx.closePath();
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();
    ctx.lineWidth = 1;
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

  increaseOpacity() {
    if (this.opacity + 0.025 > 1) {
      this.opacity = 1;
    } else {
      this.opacity += 0.025;
    }
  }

  get getOpacity() {
    return this.opacity;
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
  this.startCanvasCancelled = true;
  console.log("Click");
  if (!this.animationDone) {
    secondAnimationCancelled = true;
    firstAnimationCancelled = false;
    animateCanvas();
  } else {
    firstAnimationCancelled = true;
    secondAnimationCancelled = false;
    this.animationDone = false;
    console.log("Another click");
    animateBackToStart();
  }
};

let frame;
let bigCircle;
let triangle;
let square;
let smallCircle;
let startCanvasCancelled = false;
let firstAnimationCancelled = false;
let secondAnimationCancelled = false;
let animationDone = false;

// Draw Canvas
const drawStartingCanvas = () => {
  if (this.startCanvasCancelled) {
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
  if (firstAnimationCancelled) {
    console.log("First animation cancelled");
    return;
  }
  var c = document.getElementById("main-canvas");
  var ctx = c.getContext("2d");
  // Small Circle
  ctx.clearRect(0, 0, c.width, c.height);
  let smallCircleDone = false;
  let bigCircleDone = false;
  let triangleDone = false;
  let squareDone = false;
  let frameDone = false;

  if (this.frame.getLineWidth < 10) {
    this.frame.increaseLineWidth();
    if (this.frame.getLineWidth > 10) {
      this.frame.setLineWidth(10);
    }
  }

  this.frame.drawBox(ctx);

  if (this.smallCircle.getRadius < 425) {
    this.smallCircle.incrementRadius();
  }
  if (this.smallCircle.getOpacity > 0) {
    this.smallCircle.decreaseOpacity();
  }

  // Big Circle
  if (this.bigCircle.getRadius <= 475) {
    this.bigCircle.incrementRadius();
  }
  if (this.bigCircle.getOpacity > 0) {
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

  if (this.smallCircle.getRadius >= 425 && this.smallCircle.getOpacity == 0) {
    smallCircleDone = true;
  }

  if (this.bigCircle.getRadius >= 475 && this.bigCircle.getOpacity == 0) {
    bigCircleDone = true;
  }

  if (this.triangle.getOpacity == 0) {
    triangleDone = true;
  }

  if (
    this.square.getWidth <= 13 &&
    this.square.getHeight <= 13 &&
    this.square.getOpacity == 0
  ) {
    squareDone = true;
  }

  // Add for frame;
  if (smallCircleDone && bigCircleDone && triangleDone && squareDone) {
    this.animationDone = true;
  }
  requestAnimationFrame(animateCanvas);
}

function animateBackToStart() {
  if (secondAnimationCancelled) {
    console.log("Second animation cancelled");
    return;
  }
  var c = document.getElementById("main-canvas");
  var ctx = c.getContext("2d");
  // Small Circle
  ctx.clearRect(0, 0, c.width, c.height);
  let smallCircleDone = false;
  let bigCircleDone = false;
  let triangleDone = false;
  let squareDone = false;
  let frameDone = false;

  if (this.smallCircle.getRadius > 22.5) {
    this.smallCircle.decrementRadius();
    if (this.smallCircle.getRadius < 22.5) {
      this.smallCircle.setRadius(22.5);
    }
  }
  if (this.smallCircle.getOpacity < 1) {
    this.smallCircle.increaseOpacity();
  }

  // Big Circle
  if (this.bigCircle.getRadius > 110) {
    this.bigCircle.decrementRadius();
    if (this.bigCircle.getRadius < 110) {
      this.bigCircle.setRadius(110);
    }
  }
  if (this.bigCircle.getOpacity < 0.77) {
    this.bigCircle.increaseOpacity();
  }
  this.triangle.increaseOpacity();

  // Square
  if (this.square.getHeight < 80) {
    this.square.increaseHeight();
    if (this.square.getHeight > 80) {
      this.square.setHeight(80);
    }
  }
  if (this.square.getWidth < 75) {
    this.square.increaseWidth();
    if (this.square.getWidth > 75) {
      this.square.setWidth(75);
    }
  }
  if (this.square.getOpacity < 1) {
    this.square.increaseOpacity();
  }

  if (this.frame.getLineWidth > 1) {
    this.frame.decreaseLineWidth();
    if (this.frame.getLineWidth < 1) {
      this.frame.setLineWidth(1);
    }
  }

  this.frame.drawBox(ctx);
  this.bigCircle.drawCircle(ctx);
  rotateTriangleAnimation(this.triangle);

  this.square.drawBox(ctx);

  this.smallCircle.drawCircle(ctx);

  if (this.smallCircle.getRadius == 22.5 && this.smallCircle.getOpacity == 1) {
    smallCircleDone = true;
  }

  if (this.bigCircle.getRadius == 110 && this.bigCircle.getOpacity == 1) {
    bigCircleDone = true;
  }

  if (this.triangle.getOpacity == 1) {
    triangleDone = true;
  }

  if (
    this.square.getWidth <= 75 &&
    this.square.getHeight <= 80 &&
    this.square.getOpacity == 1
  ) {
    squareDone = true;
  }

  // Add for frame;
  if (smallCircleDone && bigCircleDone && triangleDone && squareDone) {
    this.animationDone = true;
  }

  requestAnimationFrame(animateBackToStart);
}

drawStartingCanvas();
