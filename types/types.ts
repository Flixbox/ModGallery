export interface UnpopulatedMod {
  author: string
  publishedfileid: string
  localPath: string
  installedPath?: string
  folderName: string
  version: number
  versionText: string
  installedPathVersion?: string
  installedPathVersionText?: string
  localPathVersion?: string
  localPathVersionText?: string
}

export interface PopulatedMod extends UnpopulatedMod {
  title: string
  description: string
  views: number
  favorited: number // Currently favorited
  lifetime_favorited: number
  subscriptions: number // Currently subscribed
  lifetime_subscriptions: number
  preview_url: string
  file_size: number
  hcontent_file: string
  hcontent_preview: string
  tags: {tag: string}[]
  time_created: string
  time_updated: string
}

export interface ModData {
  mods: UnpopulatedMod[]
  maps: UnpopulatedMod[]
}

export interface Settings {
  modFolder: string
}

export type SettingsValue = string | []

export interface SettingsOperation {
  key: keyof Settings
  value: SettingsValue
}

export interface ModInstallOperation {
  modFilesPath: string
  folderName: string
}

export interface ModDeleteOperation {
  installedPath: string
}

export interface MapInstallOperation {
  folderName: string
}

export interface MapDeleteOperation {
  installedPath: string
}
