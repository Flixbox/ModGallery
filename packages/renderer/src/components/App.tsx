import {MantineProvider, Container, Box, SimpleGrid, LoadingOverlay, Alert} from '@mantine/core'
import {NotificationsProvider} from '@mantine/notifications'
import {usePrefersColorScheme} from '@anatoliygatt/use-prefers-color-scheme'
import {useEffect, useState} from 'react'
import {fetchModDataSteam} from '../util/api'
import type {PopulatedMod, UnpopulatedMod} from '../../../../types/types'
import ModList from './ModList'
import SettingsTile from './SettingsTile'
import {pullMods, getMods} from '#preload'
import {Info} from 'react-feather'

let didInit = false

//
const App = () => {
  const preferredColorScheme = usePrefersColorScheme()
  const [populatedMods, setPopulatedMods] = useState<PopulatedMod[]>([])
  const [maps, setMaps] = useState<UnpopulatedMod[]>([])
  const [loading, setLoading] = useState(false)
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
    setLoading(false)
  }

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: preferredColorScheme === 'dark' ? 'dark' : 'light',
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
