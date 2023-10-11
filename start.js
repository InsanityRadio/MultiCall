const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    }
  })

  // and load the index.html of the app.
  win.loadURL('http://localhost:3000/?sip_stack_client=1')
}

app.allowRendererProcessReuse = true;
app.on('ready', createWindow)
