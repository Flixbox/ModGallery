import {BrowserWindow, dialog, ipcMain} from 'electron'
import {homedir} from 'os'
import settings from 'electron-settings'
import {pathExists, readdirSync, readFileSync} from 'fs-extra'
import {ModData, SettingsOperation} from '../../../types/types'
import util from 'util'
const exec = util.promisify(require('child_process').exec)

const execute = async (cmd: string, ignoreFailure = true) => {
  try {
    const {stdout, stderr, error} = await exec(cmd)
    error && console.error(error)
    stderr && console.error(stderr)
    stdout && console.log(stdout)
  } catch (e: any) {
    if (!ignoreFailure) throw e
  }
}

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

  ipcMain.handle('mods:pull', async () => {
    console.log('Pulling mods!')
    await execute(`git clone https://github.com/Flixbox/ModGallery-Mods.git ./mods`)
    await execute(`git --work-tree=./mods --git-dir=./mods/.git pull`, false)
    console.log('Done pulling!')
  })

  ipcMain.handle('mods:get', () => {
    console.log('Reading files')
    const contents = readdirSync('./mods/modFolders', {withFileTypes: true})
    const folders = contents.filter(dirent => dirent.isDirectory())
    const mods = folders.map(folder => {
      const localPath = `./mods/modFolders/${folder.name}`
      try {
        return {
          title: folder.name,
          localPath,
          ...JSON.parse(readFileSync(`${localPath}/mod.json`, {flag: 'r'}).toString()),
        }
      } catch (e) {
        return {localPath, title: folder.name}
      }
    })
    return {
      mods,
    } as ModData
  })
}

export default ipcHandlers
