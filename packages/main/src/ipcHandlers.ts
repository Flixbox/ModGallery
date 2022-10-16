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
  MapDeleteOperation,
  MapInstallOperation,
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
  const modContents = readdirSync(folderPath, {withFileTypes: true})
  const modFolders = modContents.filter(dirent => dirent.isDirectory())
  const mods = modFolders.map(folder => {
    const modFolder = `${folderPath}/${folder.name}`
    const baseData = {[pathKey]: modFolder, folderName: folder.name, title: folder.name}
    try {
      const modJson = JSON.parse(readFileSync(`${modFolder}/mod.json`, {flag: 'r'}).toString())
      return {
        ...baseData,
        ...modJson,
        [`${pathKey}Version`]: modJson.version,
        [`${pathKey}VersionText`]: modJson.versionText,
      } as UnpopulatedMod
    } catch (e) {
      return baseData as unknown as UnpopulatedMod
    }
  })
  return mods
}

const readMaps = (folderPath: string, pathKey = 'localPath') => {
  const availableMapContents = readdirSync(folderPath, {withFileTypes: true})
  const availableMaps = availableMapContents.map(mapFile => {
    const localPath = path.join(folderPath, mapFile.name)
    return {[pathKey]: localPath, folderName: mapFile.name, title: mapFile.name}
  })
  return availableMaps as unknown as UnpopulatedMod[]
}

const dedupeFiles = (availableFiles: UnpopulatedMod[], installedFiles: UnpopulatedMod[]) => {
  const finalizedFiles = []
  finalizedFiles.push(
    ...availableFiles.map(availableFile => {
      const result = installedFiles.find(
        installedMod => installedMod.folderName === availableFile.folderName,
      )
      if (result) availableFile.installedPath = result.installedPath
      return {
        ...result,
        ...availableFile,
      }
    }),
  )
  finalizedFiles.push(
    ...installedFiles.filter(installedFile => {
      const result = availableFiles.find(
        availableMod => installedFile.folderName === availableMod.folderName,
      )
      if (!result) return true
    }),
  )
  return finalizedFiles
}

let currentSettings = settings.getSync()
if (!currentSettings.modFolder) settings.setSync('modFolder', getDefaultModPath())
verifyFolders()
const getMapFolder = (modFolder: string) => path.join(modFolder, '..', 'custom maps')

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
    const availableMaps = readMaps('./mods/maps')
    const installedMaps = readMaps(
      getMapFolder(currentSettings.modFolder as string),
      'installedPath',
    )

    return {
      mods: dedupeFiles(availableMods, installedMods),
      maps: dedupeFiles(availableMaps, installedMaps),
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

  ipcMain.handle('map:install', (e, {folderName}: MapInstallOperation) => {
    const currentSettings = settings.getSync()
    const targetFolder = `${getMapFolder(currentSettings.modFolder as string)}`
    if (!existsSync(targetFolder)) throw new Error("Maps folder doesn't exist!")
    copySync(path.join('./mods/maps', folderName), path.join(targetFolder, folderName), {
      overwrite: true,
    })
  })

  ipcMain.handle('map:delete', (e, {installedPath}: MapDeleteOperation) => {
    if (!existsSync(installedPath)) throw new Error("Maps folder doesn't exist!")
    removeSync(installedPath)
  })
}

export default ipcHandlers
