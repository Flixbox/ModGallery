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
      p="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group
        mt="md"
        mb="xs"
      >
        <Text weight={500}>{mod.title}</Text>
        <Box sx={{flexGrow: 1}} />
        {mod.publishedfileid && <FontAwesomeIcon icon={faSteam} />}
      </Group>

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
    </Card>
  )
}

export default ModTile
