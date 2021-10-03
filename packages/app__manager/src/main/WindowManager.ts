import { BrowserWindow } from 'electron';
import PATH from 'path';

/**
 * Create a window and add it to the list.
 */
export const createNewWindow = (
  currentWindows: { [key: string]: BrowserWindow | null | undefined },
  windowType?: string,
  config4Window?: any
) => {
  const windowKey: string =
    windowType === 'sst' ? windowType : 'msm';

  if (currentWindows[windowKey] !== null) return;

  let pathChunk = 'index.html';
  let settingsFilePath = 'settings.json';

  if (windowType === 'sst') {
    pathChunk = 'sst/index.html';
    settingsFilePath = 'sst/settings.json';
  }

  const initialConfig4Window = {
    width: 800,
    height: 600,
    minWidth: 480,
    minHeight: 320,
    fullscreen: true,
    show: true,
    focus: false,
    resizable: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: true,
    }
  }

  const newWindow = new BrowserWindow(initialConfig4Window)

/**/
  newWindow.webContents.openDevTools({
    mode: 'right'
  });
/**/

  // The window identifier can be checked from the Renderer side.
  // `win.loadFile` will escape `#` to `%23`, So use `win.loadURL`
  const filePath = PATH.join(__dirname, pathChunk);
  newWindow.loadURL(`file://${filePath}#${windowKey}`);

  currentWindows[windowKey] = newWindow

  newWindow.on('ready-to-show', () => {
    console.log(`Window was created, id = ${windowKey}`)
    if (currentWindows.sco && windowKey !== 'sco') currentWindows.sco.focus();
  })

  newWindow.on('closed', () => {
    /// #if env == 'DEBUG'
    console.log(`Window was closed, id = ${windowKey}`)
    /// #endif
  })

  newWindow.webContents.on('dom-ready', (event)=> {
    let css = '* { cursor: none !important; }';
    newWindow.webContents.insertCSS(css);
  });

  return newWindow
}

export const showWindow = (
  windowKey: string,
  currentWindows: { [key: string]: BrowserWindow }
) => {
  currentWindows[windowKey].show()
}

export const closeWindow = (
  windowKey: any,
  currentWindows: { [key: string]: BrowserWindow }
) => {
  currentWindows[windowKey].close()
}
