import React from 'react'
import {
  Page,
  Navbar,
  List,
  ListItem,
  Badge,
  BlockTitle,
  Button,
  Icon,
  Block
} from 'framework7-react'

const OrderList = () => (
  <Page>
    <Navbar title='UI Testing Screen' backLink='Back' />
    <Block>
      <Block>
        <BlockTitle>Stock Movement</BlockTitle>
        <List strong inset dividersIos>
          <ListItem link='/ui1/' title='UI1' />
          <ListItem link='/ui2/' title='UI2' />
          <ListItem link='/ui3/' title='UI3' />
          <ListItem link='/about/' title='About' />
          <ListItem
            link='/stocksummary/'
            title='Stock Summary'
            badge='New'
            badgeColor='green'
          />
        </List>
      </Block>
      <Block>
        <BlockTitle>New Orders Management</BlockTitle>
        <List strong inset dividersIos>
          <ListItem link='/memeorderlist/' title='Order List' />
        </List>
      </Block>
    </Block>
  </Page>
)

export default OrderList
