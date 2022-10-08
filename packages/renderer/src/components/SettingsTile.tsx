import {pickModFolder} from '#preload'
import {Button, Group, Paper, Text} from '@mantine/core'
import {useForm} from '@mantine/form'
import {Settings} from '../../../../types/types'
import useSettings from '../hooks/useSettings'

const SettingsTile = () => {
  const {savedSettings, writeSettings} = useSettings()
  console.log(savedSettings)
  return (
    <Paper
      shadow="xs"
      withBorder
      p="md"
    >
      <Text>Mod folder: {savedSettings.modFolder}</Text>
      <Button
        onClick={async () => {
          const result = await pickModFolder(savedSettings.modFolder)
          if (result) writeSettings('modFolder', result)
        }}
      >
        Pick path
      </Button>
    </Paper>
  )
}

export default SettingsTile
