import {contextBridge} from 'electron'
import {outputFileSync} from 'fs-extra'

contextBridge.exposeInMainWorld('electron', {
  yeet: async () => outputFileSync('yeet.txt', 'yeet'),
})

export {}
