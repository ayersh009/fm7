import React from 'react'
import {
  Page,
  Navbar,
  NavTitle,
  NavRight,
  Link,
  Block,
  BlockTitle,
  List,
  ListItem,
  Gauge,
  f7
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

const HomePage = () => {
  const localStorageKey = 'csvData' // replace with your actual key
  const storedData = localStorage.getItem(localStorageKey)
  const results = storedData ? JSON.parse(storedData) : []
  const countBalancesGreaterThanFive = results.filter(
    item => item.Balance > 5
  ).length
  const countBalancesGreaterThanFive2 =
    976 - results.filter(item => item.Balance > 5).length
  const maxValue = 976
  const percentage = (countBalancesGreaterThanFive / maxValue) * 100

  return (
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
        <BlockTitle>Store Occupancy</BlockTitle>
        <div className='grid grid-cols-2 grid-gap'>
          <Gauge
            type='semicircle'
            value={countBalancesGreaterThanFive / maxValue} // Normalize value between 0 and 1
            size={250}
            borderWidth={20}
            borderBgColor='#ddd'
            borderColor='#2196f3'
            valueText={`${countBalancesGreaterThanFive2}`}
            valueTextColor='#2196f3'
            labelText='Pallet Space available'
          />

          <Gauge
            type='semicircle'
            value={percentage / 100} // Normalize value between 0 and 1
            size={250}
            borderWidth={20}
            borderBgColor='#ddd'
            borderColor='#4caf50'
            valueText={`${percentage.toFixed(2)}%`}
            valueTextColor='#4caf50'
            labelText='Store Occupancy'
          />
        </div>
      </Block>

      <Block>
        <BlockTitle>Stock Movement</BlockTitle>
        <List strong inset dividersIos>
          <ListItem link='/csv/' title='Stock Report' />
          <ListItem link='/move/' title='Move Pallet' />
          <ListItem
            link='/stocksummary/'
            title='Stock Summary'
            badge='New'
            badgeColor='green'
          />
        </List>
      </Block>

      <Block>
        <BlockTitle>Material Issue</BlockTitle>
        <List strong inset dividersIos>
          {/* <ListItem link="/form/" title="Form"/> */}
          <ListItem link='/materialissueinsert/' title='Add Record' />
          <ListItem link='/materialissuelist/' title='Material Issue List' />
        </List>
      </Block>

      <Block>
        <BlockTitle>Order Management</BlockTitle>
        <List strong inset dividersIos>
          <ListItem
            link='/order/'
            title='Order Manager'
            badge='mementodb'
            badgeColor='green'
          />
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
}

const styles = {
  card: {
    backgroundColor: 'green',
    borderRadius: '199px'
    // padding: '8px',
    //boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    //marginTop: '8px',
    //marginBottom: '8px',
  }
}
export default HomePage
