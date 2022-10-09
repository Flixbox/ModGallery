import {faSteam} from '@fortawesome/free-brands-svg-icons'
import {faDownload} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  Badge,
  Button,
  Card,
  Group,
  Paper,
  Image,
  Text,
  Box,
  Tooltip,
  Stack,
  LoadingOverlay,
} from '@mantine/core'
import {useState} from 'react'
import {PopulatedMod} from '../../../../types/types'

interface ModTileProps {
  mod: PopulatedMod
}

const ModTile = ({mod}: ModTileProps) => {
  const [loading, setLoading] = useState(false)
  const installMod = () => {
    setLoading(true)
  }
  return (
    <Card
      shadow="sm"
      p={0}
      radius="md"
      withBorder
    >
      <LoadingOverlay
        visible={loading}
        overlayBlur={2}
      />
      <Box sx={{display: 'flex'}}>
        <Stack
          p="lg"
          sx={{flexGrow: 1}}
          align="flex-start"
          justify="space-between"
        >
          <Group
            position="apart"
            sx={{width: '100%'}}
          >
            <Group>
              <Text weight={500}>{mod.title}</Text>
              <div style={{flexGrow: 1}} />
            </Group>
            <Group>
              {mod.publishedfileid && (
                <Tooltip label="Available on Steam Workshop">
                  <FontAwesomeIcon icon={faSteam} />
                </Tooltip>
              )}
              {mod.localPath && (
                <Tooltip label="Can be installed without Steam">
                  <FontAwesomeIcon icon={faDownload} />
                </Tooltip>
              )}
            </Group>
          </Group>

          <Group align="flex-end">
            {mod.localPath && (
              <Button
                onClick={installMod}
                variant="light"
                color="blue"
                mr="md"
              >
                Install
              </Button>
            )}
            {mod.publishedfileid && (
              <a
                target="_blank"
                href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.publishedfileid}`}
              >
                <Button
                  variant="light"
                  color="blue"
                >
                  Open on Steam
                </Button>
              </a>
            )}
          </Group>
        </Stack>

        {mod.preview_url && (
          <Image
            src={mod.preview_url}
            height={200}
            width={200}
            alt="mod preview"
          />
        )}
      </Box>
    </Card>
  )
}

export default ModTile
