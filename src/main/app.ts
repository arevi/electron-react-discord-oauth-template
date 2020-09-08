import { app, BrowserWindow } from "electron";
import OAuthConfig from "./config/config";
import AuthClient from "./services/auth";

let mainWindow: BrowserWindow;
const authClient: AuthClient = new AuthClient(OAuthConfig);
const isDev: boolean = process.env.ELECTRON_ENV == "dev";

//Render main window w/ configuration settings
const renderWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
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
};

//
app.on("ready", renderWindow);

//
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

//
app.on("activate", () => {
  if (mainWindow === null) {
    renderWindow();
  }
});
