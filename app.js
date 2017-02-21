//app.js
const electron= require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain;
const path = require('path')
const url = require('url')

let mainWindow
let secondWindow
                        
function createWindow () {
  // Create 1st window
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.webContents.openDevTools()

  mainWindow.on('close', function () {
    mainWindow = null
  })

  //Create 2nd window
  secondWindow = new BrowserWindow({
    width: 75,
    height: 500,
    show: false
  })
  secondWindow.setAlwaysOnTop(true)

  secondWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'second.html'),
    protocol: 'file:',
    slashes: true
  }))
  secondWindow.on('close', function (event) {
    secondWindow.hide();
    event.preventDefault();
})

}
app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

//Listen to 'show-second' event from rendered process
ipcMain.on('show-second',(event, arg)=>{
  secondWindow.show()
})

ipcMain.on('color', (event,newColor)=>{
  mainWindow.webContents.send('color', newColor)
})

ipcMain.on('size', (event,newSize)=>{
  mainWindow.webContents.send('size',newSize)
})

ipcMain.on('clear', (event,context)=>{
  mainWindow.webContents.send('clear',context)
})

ipcMain.on('clearCanvas', (event,clearCanvas) =>{
  mainWindow.webContents.send('clearCanvas',clearCanvas())
})