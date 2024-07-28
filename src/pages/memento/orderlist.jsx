// StatusTracker.js
import React, { useEffect } from 'react'
import {
  Page,
  Navbar,
  List,
  ListItem,
  Badge,
  BlockTitle,
  Button,
  Icon,
  f7
} from 'framework7-react'
import { useStore } from 'framework7-react'
import store from '../../js/store' // Adjust the path as needed

const getStatusIcon = status => {
  switch (status) {
    case 'In Process':
      return <Icon slot='media' md='material:forklift' color='blue' />
    case 'Reported':
      return <Icon slot='media' f7='info_circle' />
    case 'Loaded':
      return <Icon slot='media' md='material:local_shipping' color='green' />
    default:
      return <Icon slot='media' f7='questionmark_circle' color='orange' />
  }
}

const getStatusColor = status => {
  switch (status) {
    case 'In Process':
      return 'orange'
    case 'Reported':
      return 'gray'
    case 'Loaded':
      return 'green'
    default:
      return 'blue'
  }
}

const StatusTracker = ({ f7router }) => {
  const pendingOrders = useStore('pendingOrders')
  const completedOrders = useStore('completedOrders')

  useEffect(() => {
    store.dispatch('loadOrders')
  }, [])

  return (
    <Page>
      <Navbar title='Status Tracker' backLink='Back'>
        <Button
          slot='right'
          small
          outline
          onClick={() => f7router.navigate('/add-order/')}
        >
          Add Order
        </Button>
      </Navbar>
      <BlockTitle>Pending</BlockTitle>
      <List mediaList>
        {pendingOrders.map(order => (
          <ListItem
            key={order.id}
            header={order.orderdate}
            title={`${order.vehicle} • ${order.transport}`}
            text={order.destination}
            after={
              <Badge color={getStatusColor(order.status)}>{order.status}</Badge>
            }
            link={`/singleorder/${encodeURIComponent(JSON.stringify(order))}`}
          >
            {getStatusIcon(order.status)}
          </ListItem>
        ))}
      </List>
      <BlockTitle>Completed</BlockTitle>
      <List mediaList>
        {completedOrders.map(order => (
          <ListItem
            key={order.id}
            header={`${order.orderdate} • ${order.totalqty}`}
            title={`${order.vehicle} • ${order.transport}`}
            text={order.destination}
            
            after={
              <Badge color={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            }
            link={`/singleorder/${encodeURIComponent(JSON.stringify(order))}`}
          >
            {getStatusIcon(order.status)}
          </ListItem>
        ))}
      </List>
    </Page>
  )
}

export default StatusTracker
