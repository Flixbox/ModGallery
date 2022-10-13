import {Box, Navbar, Text} from '@mantine/core'
import {Home, Mail, Settings, Users} from 'react-feather'

export default function NavbarComponent(props: {opened: boolean}) {
  return (
    <Navbar
      hidden={!props.opened}
      width={{sm: 300, lg: 400}}
      hiddenBreakpoint="sm"
      p="md"
      height="100vh"
      style={{paddingTop: -70}}
    >
      <Navbar.Section grow>
        <NavLink
          name="Otthon"
          icon={<Home />}
          link="/"
        />
        <NavLink
          name="Felhasználók"
          icon={<Users />}
          link="/users"
        />
        <NavLink
          name="Üzenetek"
          icon={<Mail />}
          link="/messages"
        />
        <NavLink
          name="Beállítások"
          icon={<Settings />}
          link="/settings"
        />
      </Navbar.Section>
    </Navbar>
  )
}

function NavLink(props: {link: string; icon: unknown; name: string}) {
  return (
    <a
      href={props.link}
      style={{all: 'unset'}}
    >
      <Box style={{display: 'flex', flexDirection: 'row', marginBottom: 20}}>
        <>
          {props.icon}
          <Text style={{marginLeft: 10}}>{props.name}</Text>
        </>
      </Box>
    </a>
  )
}
