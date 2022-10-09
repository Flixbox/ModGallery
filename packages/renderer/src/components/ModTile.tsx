import {faSteam} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Badge, Button, Card, Group, Paper, Image, Text, Box} from '@mantine/core'
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
        <Group p="lg">
          <Text weight={500}>{mod.title}</Text>
          <Box sx={{flexGrow: 1}} />
          {mod.publishedfileid && <FontAwesomeIcon icon={faSteam} />}
          <Text
            size="sm"
            color="dimmed"
          >
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
          </Text>

          <Box mt="md" />
          <Button
            variant="light"
            color="blue"
            mr="md"
          >
            Install
          </Button>
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
            width={300}
            alt="mod preview"
          />
        )}
      </Box>
    </Card>
  )
}

export default ModTile
