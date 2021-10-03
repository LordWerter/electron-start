import { ipcMain, IpcMainInvokeEvent, BrowserWindow } from 'electron'
import { IPCKey } from '../common/Constants'
import { createNewWindow, showWindow, closeWindow } from './WindowManager'

/**
 * A value indicating that an IPC events has been initialized.
 */
let initialized = false

/**
 * Initialize IPC events.
 */
export const initializeIpcEvents = (currentWindows: {
  [key: string]: BrowserWindow
}) => {
  if (initialized) {
    return
  }
  initialized = true
}

/**
 * Release IPC events.
 */
export const releaseIpcEvents = () => {
  if (initialized) {
    ipcMain.removeAllListeners(IPCKey.showMSMManagerWindow)
  }

  initialized = false
}
