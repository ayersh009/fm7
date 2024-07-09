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
    <Block>
      <BlockTitle>Stock Movement</BlockTitle>
      <List strong inset dividersIos>
       
        <ListItem link='/csv/' title='Stock Report' />
        <ListItem link='/move/' title='Move Pallet' />

      </List>
    </Block>

    <Block>
      <BlockTitle>Material Issue</BlockTitle>
      <List strong inset dividersIos>
        {/* <ListItem link="/about/" title="About"/>
      <ListItem link="/form/" title="Form"/> */}
        <ListItem link='/materialissuelist/' title='Material Issue Tracker' badge='New' badgeColor='green' />
        <ListItem link='/materialissueinsert/' title='Add Record' />


      </List>
    </Block>

    <Block>
      <BlockTitle>Order Management</BlockTitle>
      <List strong inset dividersIos>

        <ListItem link='/order/' title='Order Manager' badge='1' badgeColor='green' />

      </List>
    </Block>
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


const styles = {
  card: {
    backgroundColor: 'green',
    borderRadius: '199px',
   // padding: '8px',
    //boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    //marginTop: '8px',
    //marginBottom: '8px',
  },}
export default HomePage
