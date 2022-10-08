import {contextBridge} from 'electron'
import {outputFileSync} from 'fs-extra'
import {homedir} from 'os'

contextBridge.exposeInMainWorld('electron', {
  yeet: async () => outputFileSync('yeet.txt', homedir()),
})

export {}
