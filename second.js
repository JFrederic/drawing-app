const {ipcRenderer} = require('electron')

var context
var newColor;
var newSize;
var newTool;
var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";

function getIdColor(id) {
    var id_color = id;

    if (id_color == "chooseGreenSimpleColors") {
        newColor = colorGreen
    }
    else if (id_color == "chooseBrownSimpleColors") {
        newColor = colorBrown
    }
    else if (id_color == "chooseYellowSimpleColors") {
        newColor = colorYellow
    }
    else if (id_color == "choosePurpleSimpleColors") {
        newColor = colorPurple
    }
    ipcRenderer.send('color',newColor);
}

function getIdSize(id){
    var size_id = id;
    
    if (size_id == "chooseSmallSimpleSizes") {
        newSize = "small"
    }
    else if (size_id == "chooseNormalSimpleSizes") {
        newSize = "normal"
    }
    else if (size_id == "chooseLargeSimpleSizes") {
        newSize = "large"
    }
    else if (size_id == "chooseHugeSimpleSizes") {
        newSize = "huge"
    }
    ipcRenderer.send('size',newSize);

}


// Clear the canvas

ipcRenderer.on('clear' , (event,context)=>{
    console.log(context)
})

function clearCanvas() {

  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  var clickX = new Array();
  var clickY = new Array();
  var clickDrag = new Array();
}

ipcRenderer.send('clearCanvas', clearCanvas())