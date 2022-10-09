import {installMod} from '#preload'
import {faSteam} from '@fortawesome/free-brands-svg-icons'
import {faDownload, faQuestionCircle, faWarning} from '@fortawesome/free-solid-svg-icons'
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
  const handleInstallClick = async () => {
    setLoading(true)
    try {
      await installMod({modFilesPath: mod.localPath, folderName: mod.folderName})
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
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
          <Stack sx={{width: '100%'}}>
            <Group
              position="apart"
              sx={{width: '100%'}}
            >
              <Group>
                {mod.versionText && (
                  <Badge
                    color="yellow"
                    variant="light"
                    sx={{width: 'fit-content'}}
                  >
                    {mod.versionText}
                  </Badge>
                )}
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
                {!mod.version && (
                  <Tooltip label="Version information missing">
                    <FontAwesomeIcon icon={faQuestionCircle} />
                  </Tooltip>
                )}
              </Group>
            </Group>
            {mod.tags && (
              <Group>
                {mod.tags.map(tag => (
                  <Badge
                    color="green"
                    variant="light"
                    sx={{width: 'fit-content'}}
                    key={tag.tag}
                  >
                    {tag.tag}
                  </Badge>
                ))}
              </Group>
            )}
          </Stack>

          <Group align="flex-end">
            {mod.localPath && (
              <Button
                onClick={handleInstallClick}
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
