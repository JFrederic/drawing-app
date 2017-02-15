const $ = require('jquery')
context = document.getElementById('canvas').getContext("2d");

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var clickTool = new Array();
var clickColor = new Array();
var clickSize = new Array();
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array()
var paint;

var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";
var id_color;
var police = [{ huge: 39, large: 25, normal: 18, small: 16 }];
var id_size;
var radius;



var curColor = colorPurple;
var curSize = "normal";
var curTool = "crayon";

// Method for get mouse event

$('#canvas').mousedown(function (e) {
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#canvas').mousemove(function (e) {
  if (paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#canvas').mouseup(function (e) {
  paint = false;
});

$('#canvas').mouseleave(function (e) {
  paint = false;
});

function getIdColor(id) {
  id_color = id;
}
function getIdSize(id) {
  id_size = id;
  console.log(id_size)
}

// Here is the addClick function that will save the click position:

;
var paint;

function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);


  if (id_color == "chooseGreenSimpleColors") {
    curColor = colorGreen
  }
  else if (id_color == "chooseBrownSimpleColors") {
    curColor = colorBrown
  }
  else if (id_color == "chooseYellowSimpleColors") {
    curColor = colorYellow
  }
  else if (id_color == "choosePurpleSimpleColors") {
    curColor = colorPurple
  }

  if (curTool == "eraser") {
    clickColor.push("white");
  } else {
    clickColor.push(curColor)
  }


  if (id_size == "chooseSmallSimpleSizes") {
    curSize = "small"
  }
  else if (id_size == "chooseNormalSimpleSizes") {
    curSize = "normal"
  }
  else if (id_size == "chooseLargeSimpleSizes") {
    curSize = "large"
  }
  else if (id_size == "chooseHugeSimpleSizes") {
    curSize = "huge"
  }

  console.log(clickColor)
  clickSize.push(curSize);
}



//  Clears the canvas.

function clearCanvas() {
  
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  
}

function redraw() {

  clearCanvas();


  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;

  for (var i = 0; i < clickX.length; i++) {

    if (clickSize[i] == "small") {
      radius = 2;
    } else if (clickSize[i] == "normal") {
      radius = 5;
    } else if (clickSize[i] == "large") {
      radius = 10;
    } else if (clickSize[i] == "huge") {
      radius = 20;
    }

    context.beginPath();
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i - 1], clickY[i - 1]);
    } else {
      context.moveTo(clickX[i] - 1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColor[i];
    context.lineWidth = radius;
    context.stroke();

    if (curTool == "crayon") {
      context.globalAlpha = 0.4;
      // context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
    }
    context.globalAlpha = 1;

  }
  
}