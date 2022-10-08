import {MantineProvider, Container, Box, SimpleGrid, Text, TextInput, AppShell} from '@mantine/core'
import {NotificationsProvider, showNotification} from '@mantine/notifications'
import {usePrefersColorScheme} from '@anatoliygatt/use-prefers-color-scheme'
import {useEffect, useState} from 'react'
import unpopulatedModData from '../modData'
import {fetchModDataSteam} from '../util/api'
import {PopulatedMod} from '../../../../types/types'
import ModList from './ModList'
import Navbar from './Navbar'
import Header from './Header'
import SettingsTile from './SettingsTile'

const App = () => {
  const preferredColorScheme = usePrefersColorScheme()
  const [opened, setOpened] = useState(false)
  const [populatedMods, setPopulatedMods] = useState<PopulatedMod[]>([])
  useEffect(() => {
    ;(async () => {
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
        <AppShell
          padding="md"
          header={
            <Header
              opened={opened}
              setOpened={setOpened}
            />
          }
          navbar={<Navbar opened={opened} />}
        >
          <>
            <Box m="md" />
            <Container>
              <SimpleGrid cols={1}>
                <SettingsTile />
                <ModList mods={populatedMods} />
              </SimpleGrid>
            </Container>
          </>
        </AppShell>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default App
