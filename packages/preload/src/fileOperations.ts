import {ipcRenderer} from 'electron'
import {Settings, SettingsOperation} from '../../../types/types'

export const pickModFolder = (defaultPath?: string) =>
  ipcRenderer.invoke('settings:pickModFolder', defaultPath)
export const getSettings = async () => await ipcRenderer.invoke('settings:get')
export const setSettings = async ({key, value}: SettingsOperation) =>
  await ipcRenderer.invoke('settings:set', {key, value})
