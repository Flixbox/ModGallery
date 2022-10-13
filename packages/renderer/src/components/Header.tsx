import {Burger, Header, MediaQuery, Text} from '@mantine/core'
import type {useState} from 'react'

export default function HeaderComponent(props: {opened: boolean; setOpened: typeof useState}) {
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
            onClick={() => props.setOpened(props.opened ? false : true)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>

        <Text size="lg">Available mods</Text>
      </div>
    </Header>
  )
}
