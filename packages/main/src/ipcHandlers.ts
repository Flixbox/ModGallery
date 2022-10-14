import type {BrowserWindow} from 'electron'
import {dialog, ipcMain} from 'electron'
import {homedir} from 'os'
import settings from 'electron-settings'
import fs, {
  copySync,
  emptyDirSync,
  existsSync,
  pathExists,
  readdirSync,
  readFileSync,
  mkdirSync,
  removeSync,
} from 'fs-extra'
import type {
  ModData,
  ModDeleteOperation,
  ModInstallOperation,
  SettingsOperation,
  UnpopulatedMod,
} from '../../../types/types'
import path from 'path'
import git from 'isomorphic-git'
import http from 'isomorphic-git/http/node'

const getDefaultRootPath = () => {
  let defaultPath = homedir()
  if (process.platform === 'win32') defaultPath = `${defaultPath}\\AppData\\Local\\Hero_s_Hour`
  console.log(defaultPath)
  if (!pathExists(defaultPath)) defaultPath = `${homedir()}\\Hero_s_Hour`
  return defaultPath
}

const verifyFolders = () => {
  mkdirSync(`${getDefaultRootPath()}\\mods`, {recursive: true})
  mkdirSync(`${getDefaultRootPath()}\\custom maps`, {recursive: true})
}

const getDefaultModPath = () => {
  return `${getDefaultRootPath()}\\mods`
}

/*
const getDefaultMapPath = () => {
  return `${getDefaultRootPath()}\\custom maps`
}
*/

const readModsFolder = (folderPath: string, pathKey = 'localPath') => {
  console.log('Reading files')
  const availableModContents = readdirSync(folderPath, {withFileTypes: true})
  const availableModFolders = availableModContents.filter(dirent => dirent.isDirectory())
  const availableMods = availableModFolders.map(folder => {
    const localPath = `${folderPath}/${folder.name}`
    const baseData = {[pathKey]: localPath, folderName: folder.name, title: folder.name}
    try {
      return {
        ...baseData,
        ...JSON.parse(readFileSync(`${localPath}/mod.json`, {flag: 'r'}).toString()),
      } as UnpopulatedMod
    } catch (e) {
      return baseData as unknown as UnpopulatedMod
    }
  })
  return availableMods
}

let currentSettings = settings.getSync()
if (!currentSettings.modFolder) settings.setSync('modFolder', getDefaultModPath())
verifyFolders()

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
    currentSettings = settings.getSync()
    return currentSettings
  })

  ipcMain.handle('settings:set', (e, {key, value}: SettingsOperation) => {
    settings.setSync(key, value)
  })

  ipcMain.handle('mods:pull', async () => {
    console.log('Pulling mods!')
    const dir = path.join(process.cwd(), 'mods')
    await git.clone({fs, http, dir, url: 'https://github.com/Flixbox/ModGallery-Mods.git'})
    await git.pull({fs, http, dir, author: {name: 'ModGallery', email: 'test@example.com'}})

    console.log('Done pulling!')
  })

  ipcMain.handle('mods:get', () => {
    const currentSettings = settings.getSync()
    const availableMods = readModsFolder('./mods/modFolders')
    const installedMods = readModsFolder(currentSettings.modFolder as string, 'installedPath')
    const finalizedMods = []
    finalizedMods.push(
      ...availableMods.map(availableMod => {
        const result = installedMods.find(
          installedMod => installedMod.folderName === availableMod.folderName,
        )
        if (result) availableMod.installedPath = result.installedPath
        return {
          ...result,
          ...availableMod,
        }
      }),
    )
    finalizedMods.push(
      ...installedMods.filter(installedMod => {
        const result = availableMods.find(
          availableMod => installedMod.folderName === availableMod.folderName,
        )
        if (!result) return true
      }),
    )

    return {
      mods: finalizedMods,
    } as ModData
  })

  ipcMain.handle('mod:install', (e, {modFilesPath, folderName}: ModInstallOperation) => {
    const currentSettings = settings.getSync()
    const targetFolder = `${currentSettings.modFolder?.toString()}/${folderName}`
    if (!existsSync(modFilesPath) || !readdirSync(modFilesPath).length)
      throw new Error("Mod folder doesn't exist!")
    emptyDirSync(targetFolder)
    copySync(modFilesPath, targetFolder, {overwrite: true})
  })

  ipcMain.handle('mod:delete', (e, {installedPath}: ModDeleteOperation) => {
    if (!existsSync(installedPath) || !readdirSync(installedPath).length)
      throw new Error("Mod folder doesn't exist!")
    removeSync(installedPath)
  })
}

export default ipcHandlers
