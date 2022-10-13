import {getSettings, setSettings} from '#preload'
import {useEffect, useState} from 'react'
import type {Settings, SettingsValue} from '../../../../types/types'

const useSettings = () => {
  const [savedSettings, setSavedSettings] = useState<Settings>({} as Settings)
  const refreshSettings = async () => setSavedSettings(await getSettings())
  useEffect(() => {
    ;(() => {
      refreshSettings()
    })()
  }, [])
  const writeSettings = async (key: keyof Settings, value: SettingsValue) => {
    console.log('TODO', value)
    await setSettings({key, value})
    await refreshSettings()
  }
  return {savedSettings, writeSettings}
}

export default useSettings
