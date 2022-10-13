import {pickModFolder} from '#preload'
import {Button, Group, Paper, Text} from '@mantine/core'
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
      <Group>
        <Button
          onClick={async () => {
            const result = await pickModFolder(savedSettings.modFolder)
            if (result) writeSettings('modFolder', result)
          }}
        >
          Pick path
        </Button>
        <Text>Mod folder: {savedSettings.modFolder}</Text>
      </Group>
    </Paper>
  )
}

export default SettingsTile
