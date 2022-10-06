import {MantineProvider, Container, Box, SimpleGrid, Text, TextInput} from '@mantine/core'
import {NotificationsProvider, showNotification} from '@mantine/notifications'
import {usePrefersColorScheme} from '@anatoliygatt/use-prefers-color-scheme'
import {useEffect, useState} from 'react'
import ModTile from './ModTile'
import modData from '../modData'
import {fetchModDataSteam} from '../util/api'

const App = () => {
  const preferredColorScheme = usePrefersColorScheme()
  useEffect(() => {
    ;(async () => {
      const steamModData = await fetchModDataSteam(modData.mods)
      // setCars(cars)
      console.log(steamModData)
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
            <ModTile id={1} />
          </SimpleGrid>
        </Container>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default App
