const { app, BrowserWindow } = require('electron') 
const path = require('path')
const url = require('url')
const cp =  require('child_process')

let serverStarted = false;
let appReady = false;
let browserWindow = null;

// Start process to serve manifest file
const server = cp.fork(__dirname + '/server.js');

server.on('message', (m) => {
    console.log('message: ' +  m);
    if (m === 'started') {
        serverStarted = true;
        createWindow();
    }
});

// Quit server process if main app quits
app.on('will-quit', () => {
    server.send('quit');
});

function createWindow() {
    if (serverStarted && appReady) {
        browserWindow = new BrowserWindow(
            {
                width: 800, 
                height: 600
            })
        browserWindow.loadURL(`file://${__dirname}/index.html`)
        browserWindow.webContents.openDevTools()

        browserWindow.on('close', () => {
            browserWindow = null
        })
    }
}

// Set default protocol client for redirect
app.setAsDefaultProtocolClient('blockstack-electron');


app.on('ready', function () {
    appReady = true;
    createWindow();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (browserWindow === null) {
        createWindow()
    }
})

app.on('open-url', function (ev, redirect) {
    ev.preventDefault();
    browserWindow.focus();
    const token = redirect.replace('blockstack-electron://redirect?authResponse=', '')
    browserWindow.webContents.send('signed-in', token)
});

