import {getSettings, setSettings} from '#preload'
import {useEffect, useState} from 'react'
import {Settings} from '../../../../types/types'

const useSettings = () => {
  const [settingsState, setSettingsState] = useState<Settings>({} as Settings)
  const refreshSettings = async () => setSettingsState(await getSettings())
  useEffect(() => {
    ;(() => {
      refreshSettings()
    })()
  }, [])
  const writeSettings = async (key: string, value: any) => {
    console.log('TODO', value)
    await setSettings({key, value})
    await refreshSettings()
  }
  return {settingsState, writeSettings}
}

export default useSettings
