import { app, BrowserWindow, ipcMain } from "electron";
import { oauthConfig } from "./config/config";
import AuthClient from "./services/auth";

let mainWindow: BrowserWindow;
const authClient: AuthClient = new AuthClient(oauthConfig);
const isDev: boolean = process.env.ELECTRON_ENV == "dev";

//Render main window w/ configuration settings
const renderWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    minWidth: 800,
    minHeight: 500,
    center: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: isDev,
    },
  });

  // Depending on the environment the frontend will either load from the react server or the static html file
  if (isDev) {
    mainWindow.loadURL("http://localhost:3000/");
  } else {
    mainWindow.loadFile("./build/index.html");
  }

  // Detect if devtools was somehow opened outside development
  mainWindow.webContents.on("devtools-opened", () => {
    if (!isDev) {
      mainWindow.webContents.closeDevTools();
    }
  });

  // Begin auth process
  beginAuth();
};

// Opens browser window with discord OAuth screen
const beginAuth = () => {
  authClient.openBrowser();
};

/**
 * Emits an event to the ipcRenderer, with the authorization result
 * @param status Discord authorization result
 */
export const setAuthResult = (status: boolean) => {
  mainWindow.webContents.send(
    "authChannel",
    status === true ? "success" : "failure"
  );

  authClient.stopListening();
};

// Renders main window
app.on("ready", renderWindow);

// Closes app once all windows closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Renders main window (But for MacOS!)
app.on("activate", () => {
  if (mainWindow === null) {
    renderWindow();
  }
});
