import {MantineProvider, Container, Box, SimpleGrid, Text, TextInput} from '@mantine/core'
import {NotificationsProvider, showNotification} from '@mantine/notifications'
import {usePrefersColorScheme} from '@anatoliygatt/use-prefers-color-scheme'
import {useEffect, useState} from 'react'
import unpopulatedModData from '../modData'
import {fetchModDataSteam} from '../util/api'
import {PopulatedMod} from 'types'
import ModList from './ModList'

const App = () => {
  const preferredColorScheme = usePrefersColorScheme()
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
        <Box m="md" />
        <Container>
          <SimpleGrid cols={1}>
            <Text>Yeeteroni</Text>
            <ModList mods={populatedMods} />
          </SimpleGrid>
        </Container>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default App
