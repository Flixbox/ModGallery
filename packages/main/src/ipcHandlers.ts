import {BrowserWindow, dialog, ipcMain} from 'electron'
import {homedir} from 'os'
import settings from 'electron-settings'
import {pathExists} from 'fs-extra'
import {SettingsOperation} from '../../../types/types'

const getDefaultModPath = () => {
  let defaultPath = homedir()
  if (process.platform === 'win32')
    defaultPath = `${defaultPath}\\AppData\\Local\\Hero_s_Hour\\mods`
  console.log(defaultPath)
  if (!pathExists(defaultPath)) defaultPath = homedir()
  return defaultPath
}

const ipcHandlers = (browserWindow: BrowserWindow) => {
  ipcMain.handle('settings:pickModFolder', async (e, defaultPath = getDefaultModPath()) => {
    const {canceled, filePaths} = await dialog.showOpenDialog(browserWindow, {
      properties: ['openDirectory', 'showHiddenFiles'],
      defaultPath,
    })
    if (canceled) {
      return
    } else {
      console.log(filePaths[0])
      // settings.setSync('modFolder', filePaths[0])
      return filePaths[0]
    }
  })

  ipcMain.handle('settings:get', () => {
    let currentSettings = settings.getSync()
    if (!currentSettings.modFolder) settings.setSync('modFolder', getDefaultModPath())
    currentSettings = settings.getSync()
    return currentSettings
  })

  ipcMain.handle('settings:set', (e, {key, value}: SettingsOperation) => {
    settings.setSync(key, value)
  })

  ipcMain.handle('mods:pull', () => {
    console.log('Pulling mods!')
  })
}

export default ipcHandlers
