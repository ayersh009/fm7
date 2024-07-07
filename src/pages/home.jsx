import React, { useEffect } from 'react'
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  Icon,
  ListItem,
  Button,
  f7,
  useStore
} from 'framework7-react'
import { App as CapacitorApp } from '@capacitor/app'

const handleExitApp = () => {
  f7.dialog.confirm(
    'Are you sure you want to exit the app?',
    'Exit App',
    () => {
      CapacitorApp.exitApp()
    }
  )
}

const HomePage = () => (
  <Page name='home'>
    {/* Top Navbar */}
    <Navbar sliding={true}>
      <NavTitle sliding>Inventify</NavTitle>
      <NavRight>
        <Link
          iconIos='f7:square_arrow_right'
          iconMd='f7:square_arrow_right'
          onClick={handleExitApp}
        />
      </NavRight>
      {/* <NavRight>
        <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="right" />
      </NavRight> */}
      {/* <NavTitleLarge>My App</NavTitleLarge> */}
    </Navbar>

    {/* Page content */}
    <Block></Block>
    <BlockTitle>Navigation</BlockTitle>
    <List strong inset dividersIos>
      {/* <ListItem link="/about/" title="About"/>
      <ListItem link="/form/" title="Form"/> */}
      <ListItem link='/csv/' title='Stock Report' badge='New' />
      <ListItem link='/move/' title='Move Pallet' />
      <ListItem link='/order/' title='Order Manager' />
    </List>

    <List strong inset dividersIos>
      {/* <ListItem link="/about/" title="About"/>
      <ListItem link="/form/" title="Form"/> */}
      <ListItem link='/materialissue/' title='Material Issue Trcker' badge='New' />
      
    </List>

    {/* <BlockTitle>Modals</BlockTitle>
    <Block className="grid grid-cols-2 grid-gap">
      
      <Button fill loginScreenOpen="#my-login-screen">Login Screen</Button>
    </Block>

    <BlockTitle>Panels</BlockTitle>
    <Block className="grid grid-cols-2 grid-gap">
      <Button fill >Left Panel</Button>
      <Button fill >Right Panel</Button>
    </Block> */}
  </Page>
)
export default HomePage
