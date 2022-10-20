import {
  MantineProvider,
  Container,
  Box,
  SimpleGrid,
  LoadingOverlay,
  Alert,
  Stack,
  Loader,
  Text,
} from '@mantine/core'
import {NotificationsProvider, showNotification} from '@mantine/notifications'
import {usePrefersColorScheme} from '@anatoliygatt/use-prefers-color-scheme'
import {useEffect, useState} from 'react'
import {fetchModDataSteam} from '../util/api'
import type {PopulatedMod, UnpopulatedMod} from '../../../../types/types'
import ModList from './ModList'
import SettingsTile from './SettingsTile'
import {pullMods, getMods} from '#preload'
import {Info} from 'react-feather'

let didInit = false

/*
  TODO Add a clickable category list that scrolls the user to the category (still a big list, but with headings)

  So on the side it would look like
```txt
- Mods
  - Modpacks
  - Factions
  - Units
  - ...
- Maps
```
*/
const App = () => {
  const preferredColorScheme = usePrefersColorScheme()
  const [populatedMods, setPopulatedMods] = useState<PopulatedMod[]>([])
  const [maps, setMaps] = useState<UnpopulatedMod[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  useEffect(() => {
    ;(async () => {
      if (didInit) return
      await refreshMods()
    })()
  }, [])

  const refreshMods = async () => {
    console.log('refreshMods')
    didInit = true
    setLoading(true)
    try {
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
      setMaps(unpopulatedModData.maps)
    } catch (e: unknown) {
      showNotification({
        color: 'red',
        title: (e as Error).message,
        message:
          'Maybe wait for a bit and try again. If this error persists, reinstall the application.',
      })
    } finally {
      setLoading(false)
      setInitialLoad(false)
    }
  }

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: preferredColorScheme === 'dark' ? 'dark' : 'light',
        loader: 'bars',
      }}
    >
      <NotificationsProvider>
        <Box
          sx={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <LoadingOverlay
            visible={loading}
            overlayBlur={2}
            loader={
              <Stack
                align="center"
                sx={{zIndex: 1}}
              >
                <Loader />
                <Text>Synchronizing mod data...</Text>
                {initialLoad && (
                  <Text>
                    If this is your first time starting this application, the initial mod download
                    can take up to a minute.
                  </Text>
                )}
              </Stack>
            }
          />
        </Box>
        <Box m="md" />
        <Container>
          <SimpleGrid cols={1}>
            <SettingsTile />
            <Alert
              icon={<Info />}
              title="Activating mods"
              color="blue"
            >
              In order to use your mods, you'll need to activate them individually in the settings
              menu in Hero's Hour.
            </Alert>
            <ModList
              mods={populatedMods}
              refreshMods={refreshMods}
            />
            <ModList
              mods={maps as PopulatedMod[]}
              type="maps"
              refreshMods={refreshMods}
            />
          </SimpleGrid>
        </Container>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default App
