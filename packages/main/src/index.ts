import {app} from 'electron'
import './security-restrictions'
import {restoreOrCreateWindow} from '/@/mainWindow'
import log from 'electron-log'
import * as Sentry from '@sentry/electron'

Sentry.init({
  dsn: 'https://38006d2a3b714e4e9c1726fec13ff0d2@o4504043188387840.ingest.sentry.io/4504043190812673',
})

/**
 * Prevent electron from running multiple instances.
 */
const isSingleInstance = app.requestSingleInstanceLock()
if (!isSingleInstance) {
  app.quit()
  process.exit(0)
}
app.on('second-instance', restoreOrCreateWindow)

/**
 * Disable Hardware Acceleration to save more system resources.
 */
app.disableHardwareAcceleration()

/**
 * Shout down background process if all windows was closed
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

/**
 * @see https://www.electronjs.org/docs/latest/api/app#event-activate-macos Event: 'activate'.
 */
app.on('activate', restoreOrCreateWindow)

/**
 * Create the application window when the background process is ready.
 */
app
  .whenReady()
  .then(restoreOrCreateWindow)
  .catch(e => console.error('Failed create window:', e))

/**
 * Install Vue.js or any other extension in development mode only.
 * Note: You must install `electron-devtools-installer` manually
 */
// if (import.meta.env.DEV) {
//   app.whenReady()
//     .then(() => import('electron-devtools-installer'))
//     .then(({default: installExtension, VUEJS3_DEVTOOLS}) => installExtension(VUEJS3_DEVTOOLS, {
//       loadExtensionOptions: {
//         allowFileAccess: true,
//       },
//     }))
//     .catch(e => console.error('Failed install extension:', e));
// }

/**
 * Check for new version of the application - production mode only.
 */
if (import.meta.env.PROD && !process.windowsStore) {
  app
    .whenReady()
    .then(() => import('electron-updater'))
    .then(({autoUpdater}) => {
      log.transports.file.level = 'debug'
      autoUpdater.logger = log
      autoUpdater.checkForUpdatesAndNotify()
    })
    .catch(e => console.error('Failed check updates:', e))
}
