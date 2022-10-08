import {BrowserWindow, contextBridge, ipcRenderer} from 'electron'
import {outputFileSync} from 'fs-extra'
import {homedir} from 'os'
import settings from 'electron-settings'

export const pickModFolder = () => ipcRenderer.invoke('settings:pickModFolder')
