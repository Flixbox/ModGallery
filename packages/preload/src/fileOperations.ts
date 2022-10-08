import {BrowserWindow, contextBridge, ipcRenderer} from 'electron'
import {outputFileSync} from 'fs-extra'
import {homedir} from 'os'
import settings from 'electron-settings'

contextBridge.exposeInMainWorld('electron', {
  pickModFolder: () => ipcRenderer.invoke('settings:pickModFolder'),
})

export {}
