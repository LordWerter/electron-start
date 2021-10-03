import FS from 'fs';
import PATH from 'path';

import { app } from 'electron';
import { createNewWindow } from './WindowManager';
import { initializeIpcEvents, releaseIpcEvents } from './IPCEvents';

/**
 * Current window list.
 */
export const currentWindows: any = {
  msm: null,
  sst: null,
};

const path2AllLogs = PATH.join(__dirname, './logs');
!FS.existsSync(path2AllLogs) ? FS.mkdirSync(path2AllLogs) : console.log(`${path2AllLogs} was existed`);

app.name = 'MSMClient';

app.on('ready', () => {
  /// #if env == 'DEBUG'
  console.log('Initialize Application');
  /// #endif

  const path = PATH.join(__dirname, 'settings/msm/microapps.json');
  const appsSettings = JSON.parse(FS.readFileSync(path).toString());
  console.log(appsSettings)

  for (let key in appsSettings) {
    if (appsSettings[key].enable) {
      const logDirPath = PATH.join(__dirname, `./logs/${key}`);
      if (!FS.existsSync(logDirPath)) {
        console.log(`Directory was not found and created with empty log files`);
        FS.mkdirSync(logDirPath);
        FS.openSync(`${logDirPath}/status.log`, 'w');
        FS.openSync(`${logDirPath}/error.log`, 'w');
      }

      if(key === 'msm') {
        currentWindows.msm = createNewWindow(currentWindows);
      } else {
        currentWindows[key] = createNewWindow(currentWindows, key);
      }
    }
  }

  initializeIpcEvents(currentWindows);
});

/// #if env == 'DEBUG'
app.on('quit', () => {
  console.log('Application is quit');
});
/// #endif

app.on('window-all-closed', () => {
  /// #if env == 'DEBUG'
  console.log('All of the window was closed.');
  /// #endif
  releaseIpcEvents();

  app.quit();
});
