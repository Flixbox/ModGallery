const moment = require('moment')

if (process.env.VITE_APP_VERSION === undefined) {
  const now = moment.utc()
  process.env.VITE_APP_VERSION = `${now.year() - 2000}.${now.dayOfYear()}.${
    now.hours() * 60 + now.minutes()
  }`
}

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  npmRebuild: false,
  directories: {
    output: 'dist',
    buildResources: 'buildResources',
  },
  files: ['packages/**/dist/**'],
  extraMetadata: {
    version: process.env.VITE_APP_VERSION,
  },
  appx: {
    publisher: 'Felix Tietjen',
  },
}

module.exports = config
