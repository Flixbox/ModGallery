import {Burger, Header, MediaQuery, Text, ActionIcon} from '@mantine/core'
import {Home} from 'react-feather'

export default function HeaderComponent(props) {
  return (
    <Header
      height={70}
      p="md"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <MediaQuery
          largerThan="sm"
          styles={{display: 'none'}}
        >
          <Burger
            opened={props.opened}
            onClick={() => props.setOpened(o => !o)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>

        <Text size="lg">Available mods</Text>
      </div>
    </Header>
  )
}
