const {
    app, 
    BrowserWindow, 
    } = require('electron')
const electron = require('electron')
const path = require('path')
const url = require('url')
var ipc = require('ipc');
const {ipcMain} = require('electron')  

function createWindow () {
    win = new BrowserWindow({
        width: 800, 
        height: 688, 
    })

    // loads home.html to the app
    win.loadURL(url.format({
        pathname: path.join(__dirname, './app/views/generic.html'),
        protocol: 'file:',
        slashes: true
        })
    )
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    app.quit()
})
