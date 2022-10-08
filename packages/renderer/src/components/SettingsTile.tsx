import {pickModFolder} from '#preload'
import {Button, Group, Paper} from '@mantine/core'
import {useForm} from '@mantine/form'
import {Settings} from '../../../../types/types'
import useSettings from '../hooks/useSettings'

const SettingsTile = () => {
  const {savedSettings, writeSettings} = useSettings()
  console.log(savedSettings)
  const form = useForm<Settings>({
    initialValues: {
      ...savedSettings,
    },
  })
  const onSubmit = (values: Settings) => console.log(values)
  return (
    <Paper
      shadow="xs"
      withBorder
      p="md"
    >
      <form
        onSubmit={form.onSubmit(async values => {
          ;(await onSubmit(values)) && form.reset()
        })}
        role="form"
      >
        <Button
          onClick={async () => {
            writeSettings("modFolder", await pickModFolder())
          }}
        >
          Pick path
        </Button>
        <Group
          position="right"
          mt="md"
        >
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </Paper>
  )
}

export default SettingsTile
