const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: path.resolve(__dirname, 'dist/icon-64x64.png'),
    webPreferences: {
      nodeIntegration: true
    }
  })

  // win.webContents.toggleDevTools();
  win.loadFile(path.resolve(__dirname, 'dist/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
	  app.quit()
	}
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
})
