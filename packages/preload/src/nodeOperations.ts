import {ipcRenderer} from 'electron'
import type {
  ModDeleteOperation,
  SettingsOperation,
  ModData,
  ModInstallOperation,
  MapInstallOperation,
  MapDeleteOperation,
} from '../../../types/types'

export const pickModFolder = (defaultPath?: string) =>
  ipcRenderer.invoke('settings:pickModFolder', defaultPath)
export const getSettings = async () => await ipcRenderer.invoke('settings:get')
export const setSettings = async ({key, value}: SettingsOperation) =>
  await ipcRenderer.invoke('settings:set', {key, value})
export const pullMods = async () => await ipcRenderer.invoke('mods:pull')
export const getMods = async () => (await ipcRenderer.invoke('mods:get')) as ModData
export const installMod = async ({modFilesPath, folderName}: ModInstallOperation) =>
  await ipcRenderer.invoke('mod:install', {modFilesPath, folderName})
export const deleteMod = async ({installedPath}: ModDeleteOperation) =>
  await ipcRenderer.invoke('mod:delete', {installedPath})
export const installMap = async ({folderName}: MapInstallOperation) =>
  await ipcRenderer.invoke('map:install', {folderName})
export const deleteMap = async ({installedPath}: MapDeleteOperation) =>
  await ipcRenderer.invoke('map:delete', {installedPath})
