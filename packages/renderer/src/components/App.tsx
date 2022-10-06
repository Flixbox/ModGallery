import {MantineProvider, Container, Box, SimpleGrid, Text, TextInput} from '@mantine/core'
import {NotificationsProvider, showNotification} from '@mantine/notifications'
import {usePrefersColorScheme} from '@anatoliygatt/use-prefers-color-scheme'
import {useEffect, useState} from 'react'

const App = () => {
  const preferredColorScheme = usePrefersColorScheme()

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
            <Text>Yeet</Text>
          </SimpleGrid>
        </Container>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default App
