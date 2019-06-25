/**
*  Required imports
**/
const electron = require('electron');
const { execSync } = require('child_process');
var win;

/**
*  Creates the Electron Window
**/
function createWindow() {
  let GTK_THEME = execSync("gsettings get org.gnome.desktop.interface gtk-theme",
    {encoding: 'utf8'});

  // Create the browser window.
  win = new electron.BrowserWindow({
    title: "WeathRadr",
    titlebarstyle: 'hidden',
    width: 800,
    height: 600,
    icon: __dirname + '/resources/weather_icon_flat.png',
    webPreferences: {
      nodeIntegration: true
    }
  });

    /**
    *  Build Application Menu
    **/
    var appmenu = electron.Menu.buildFromTemplate([
      {
        label: 'Debug',
        submenu: [
          {
            label: 'Dev Tools',
            accelerator: 'Shift+F12',
            click() {
              win.webContents.openDevTools();
            }
          }
        ]
      }
    ]);

    electron.Menu.setApplicationMenu(appmenu);
  // and load the index.html of the app.
  win.loadFile('main.html');
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('GTK_THEME', GTK_THEME);
  });
}

/**
*  Creates the window when Electron.js is ready
**/
electron.app.on('ready', createWindow);
