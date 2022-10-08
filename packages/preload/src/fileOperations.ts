import {ipcRenderer} from 'electron'

export const pickModFolder = () => ipcRenderer.invoke('settings:pickModFolder')
export const getSettings = async () => await ipcRenderer.invoke('settings:get')
export const setSettings = async ({key, value}: Record<string, any>) =>
  await ipcRenderer.invoke('settings:set', {key, value})
