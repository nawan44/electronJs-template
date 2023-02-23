const { app, BrowserWindow, Menu } = require("electron");

// const { BrowserWindow, Menu } = require("electron");

// const path = require("path");
// var isDev = require("electron-is-dev");
// const url = require("url");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require("electron-squirrel-startup")) {
//   app.quit();
// }
// let mainWindow;

const mainMenuTemplate = [
  // {
  //   label: "File",
  //   submenu: [
  //     {
  //       label: "Custom Undo",
  //       role: "undo",
  //     },
  //   ],
  // },
  // {
  //   label: "View",
  //   submenu: [
  //     {
  //       role: "reload",
  //     },
  //   ],
  // },
];

// Build menu from template
const menu = Menu.buildFromTemplate(mainMenuTemplate);

// Module to control application life. (this variable should already exist)
// const app = electron.app;
if (handleSquirrelEvent(app)) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}
// this should be placed at top of main.js to handle setup events quickly
function handleSquirrelEvent(application) {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require("child_process");
  const path = require("path");

  const appFolder = path.resolve(process.execPath, "..");
  const rootAtomFolder = path.resolve(appFolder, "..");
  const updateDotExe = path.resolve(path.join(rootAtomFolder, "Update.exe"));
  const exeName = path.basename(process.execPath);

  const spawn = function (command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {
        detached: true,
      });
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = function (args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case "--squirrel-install":
    case "--squirrel-updated":
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(["--createShortcut", exeName]);

      setTimeout(application.quit, 1000);
      return true;

    case "--squirrel-uninstall":
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(["--removeShortcut", exeName]);

      setTimeout(application.quit, 1000);
      return true;

    case "--squirrel-obsolete":
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      application.quit();
      return true;
  }
}
// const setupEvents = require("./installers/setupEvents");
// if (setupEvents.handleSquirrelEvent()) {
//   // squirrel event handled and app will exit in 1000ms, so don't do anything else
//   return;
// }

// const electron = require("electron");
// Module to control application life.
// const app = electron.app;
const { ipcMain } = require("electron");
// var path = require('path')

// Insert
Menu.setApplicationMenu(menu);
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  // mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // if (isDev) {
  //   // In development
  //   // modify existing menu
  // } else {
  //   // In production
  //   // construct menu from scratch
  //   var template = [
  //     {
  //       label: "File",
  //       submenu: [
  //         {
  //           label: "Exit",
  //           click: function () {
  //             quit();
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       label: "Project",
  //       submenu: [
  //         {
  //           label: "Delete",
  //           click: function () {
  //             deleteProject();
  //           },
  //         },
  //         {
  //           label: "Build",
  //           click: function () {
  //             buildProject();
  //           },
  //         },
  //       ],
  //     },
  //   ];
  //   // build menu from template
  //   var menu = Menu.buildFromTemplate(template);
  //   // set menu for main window
  //   mainWindow.setMenu(menu);
  // }
  mainWindow.loadURL("https://vercel.com/nawan44/bapenda-pajak-y8hm");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
