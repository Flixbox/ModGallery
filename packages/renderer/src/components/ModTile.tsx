import {faSteam} from '@fortawesome/free-brands-svg-icons'
import {faDownload} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Badge, Button, Card, Group, Paper, Image, Text, Box, Tooltip} from '@mantine/core'
import {PopulatedMod} from '../../../../types/types'

interface ModTileProps {
  mod: PopulatedMod
}

const ModTile = ({mod}: ModTileProps) => {
  return (
    <Card
      shadow="sm"
      p={0}
      radius="md"
      withBorder
    >
      <Box sx={{display: 'flex'}}>
        <Group
          p="lg"
          sx={{flexGrow: 1}}
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

          {mod.localPath && (
            <a
              target="_blank"
              href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.publishedfileid}`}
            >
              <Button
                variant="light"
                color="blue"
                mr="md"
              >
                Install
              </Button>
            </a>
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
