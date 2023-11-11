const electron = require("electron");
const path = require("path");
const fs = require('fs');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  console.log(__dirname);
  mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
}

app.on("ready", createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('message-from-renderer', (event, data) => {
  console.log('Message from renderer:', data);
});

ipcMain.on("CheckAuth", (event, data) => {

  const tokenPath = path.join(__dirname, '../data/token.json');
  
  fs.access(tokenPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log("TokenExists")
      mainWindow.webContents.send("TokenExists", false);
    } else {
      console.log("TokenDoesNotExist")
      mainWindow.webContents.send("TokenExists", true);
    }
  });
});
