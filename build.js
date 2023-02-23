// // build.js
// const path = require("path");

var electronInstaller = require("electron-winstaller");
// In this case, we can use relative paths
var settings = {
  // Specify the folder where the built app is located
  appDirectory: "myApplicationBuilt-win32-x64",
  // Specify the existing folder where
  outputDirectory: "myApplication-installers",
  // The name of the Author of the app (the name of your company)
  authors: "nawan44",
  // The name of the executable of your built
  exe: "myApplicationBuilt.exe",
  description: "My first electron application",
};
console.log("111");
resultPromise = electronInstaller.createWindowsInstaller(settings);
console.log("22");

resultPromise.then(
  () => {
    console.log(
      "The installers of your application were succesfully created !"
    );
  },
  (e) => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`);
  }
);
