"use strict";

import { BrowserWindow, app, protocol, shell } from "electron";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";

import { createProtocol } from "vue-cli-plugin-electron-builder/lib";

const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  });
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return {action: "deny"};
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}

app.on("quit", () => {
  const { exec } = require("child_process");
  if (!isDevelopment) {
    if (process.platform === "win32") {
      exec("taskkill /f /t /im ankibackend.exe", function(err) {
        if (err) {
          console.log(err);
          return;
        }
      });
    } else {
      exec("killall ankibackend", function(err) {
        if (err) {
          console.log(err);
          return;
        }
      });
    }
  }else {
    console.log("Remember to kill the python process if needed!");
  }
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment) {
    console.log("In Development Mode");
    if (process.platform === "win32") {
      let ankibackend = require("child_process");
      await ankibackend.spawn("py", ["backend/backend.py"]);
      ankibackend.stdout.on("data", function (data) {
        console.log("data: ", data.toString("utf8"));
      });
      ankibackend.stderr.on("data", (data) => {
        console.log(`stderr: ${data}`); // when error
      });
    } else {
      let ankibackend = require("child_process").spawn("python3", ["backend/backend.py"]);
      ankibackend.stdout.on("data", function (data) {
        console.log("data: ", data.toString("utf8"));
      });
      ankibackend.stderr.on("data", (data) => {
        console.log(`stderr: ${data}`); // when error
      });
    }
  } else {
    // TODO: Change this to use pyinstaller instead
    console.log("In Production Mode");
    if (process.platform === "win32") {
      console.log("Current Directory: ", __dirname);
      let ankibackend = require("child_process").spawn("backend/ankibackend.exe");
      ankibackend.stdout.on("data", function (data) {
        console.log("data: ", data.toString("utf8"));
      });
      ankibackend.stderr.on("data", function (data) {
        console.log(`stderr: ${data}`); // when error
      });
    } else if (process.platform === "darwin") {
      // Hacky workaround for macOS
      console.log("Current Directory: ", __dirname);
      const dir = __dirname.toString();
      const backendPath = dir.replace("/Resources/app.asar", "/backend/ankibackend").replaceAll(" ","\\ ");
      let ankibackend = require("child_process").exec(backendPath);
      ankibackend.stdout.on("data", function (data) {
        console.log("data: ", data.toString("utf8"));
      });
      ankibackend.stderr.on("data", function(data) {
        console.log(`stderr: ${data}`); // when error
      });
    } else if (process.platform === "linux") {
      // Hacky workaround for macOS
      console.log("Current Directory: ", __dirname);
      const dir = __dirname.toString();
      let ankibackend = require("child_process").spawn("backend/ankibackend");
      ankibackend.stdout.on("data", function (data) {
        console.log("data: ", data.toString("utf8"));
      });
      ankibackend.stderr.on("data", function(data) {
        console.log(`stderr: ${data}`); // when error
      });
    }
  }
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  setTimeout(() => {
    createWindow();
  }, 15000);
  
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
