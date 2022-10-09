import {MantineProvider, Container, Box, SimpleGrid, Text, TextInput, AppShell} from '@mantine/core'
import {NotificationsProvider, showNotification} from '@mantine/notifications'
import {usePrefersColorScheme} from '@anatoliygatt/use-prefers-color-scheme'
import {useEffect, useState} from 'react'
import {fetchModDataSteam} from '../util/api'
import {PopulatedMod} from '../../../../types/types'
import ModList from './ModList'
import Navbar from './Navbar'
import Header from './Header'
import SettingsTile from './SettingsTile'
import {pullMods, getMods} from '#preload'

let didInit = false

const App = () => {
  const preferredColorScheme = usePrefersColorScheme()
  const [opened, setOpened] = useState(false)
  const [populatedMods, setPopulatedMods] = useState<PopulatedMod[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    ;(async () => {
      if (didInit) return
      didInit = true
      setLoading(true)
      console.log('Starting to pull...')
      await pullMods()
      console.log('Await Pull done? In Render')
      const unpopulatedModData = await getMods()
      console.log('unpopulatedModData', unpopulatedModData)

      const steamModData = await fetchModDataSteam(unpopulatedModData.mods)
      // setCars(cars)
      console.log('steamModData', steamModData)
      setPopulatedMods(
        unpopulatedModData.mods.map(unpopulatedMod => ({
          ...unpopulatedMod,
          ...(steamModData.find(mod => unpopulatedMod.publishedfileid === mod.publishedfileid) ??
            ({} as PopulatedMod)),
        })),
      )
      setLoading(false)
    })()
  }, [])

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: preferredColorScheme === 'dark' ? 'dark' : 'light',
      }}
    >
      <NotificationsProvider>
        <>
          <Box m="md" />
          <Container>
            <SimpleGrid cols={1}>
              <SettingsTile />
              <ModList mods={populatedMods} />
            </SimpleGrid>
          </Container>
        </>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default App
