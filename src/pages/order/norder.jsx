import React, { useState, useEffect } from 'react'
import {
  Page,
  Navbar,
  List,
  ListItem,
  Block,
  Segmented,
  Button,
  Subnavbar,
  Badge,
  BlockTitle,
  useStore
} from 'framework7-react'
import store from '../../js/store'
import CustomListView from '../../components/neworder'

const OrderListPage = ({ f7router }) => {
  const orders = useStore('ordersold')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    store.dispatch('fetchOrdersold')
  }, [])

  const filteredOrders = orders.filter(
    order => filter === 'All' || order.status === filter
  )

  const today = new Date().setHours(0, 0, 0, 0)

  const ordersToday = filteredOrders.filter(order => {
    const orderDate = new Date(order.orderdate).setHours(0, 0, 0, 0)
    return orderDate === today
  })

  const ordersOlder = filteredOrders.filter(order => {
    const orderDate = new Date(order.orderdate).setHours(0, 0, 0, 0)
    return orderDate < today
  })

  const statusColors = {
    Loaded: 'green',
    Reported: 'orange',
    'In Process': 'yellow'
  };

  const renderOrderList = orders => (
    <List>
      {orders.map(order => (
        <ListItem
          key={order.memeID}
          link={`/orderdetails/${encodeURIComponent(JSON.stringify(order))}`}
          chevronCenter
          subtitle={order.status}
          header={new Date(order.orderdate).toLocaleDateString()}
          title={order.vehicleno}
          footer={order.destination}
          after={order.status}
        />
      ))}
    </List>
  )

  const renderOrderListrev = orders => (
    <List dividersIos mediaList outlineIos strongIos>
      {orders.map(order => (
        <ListItem
          key={order.memeID}
          title={order.vehicleno}
          after={<Badge color={statusColors[order.status]}>{order.status}</Badge>}
          text={`${new Date(order.orderdate).toLocaleDateString()} - ${order.destination}`}
          link={`/orderdetails/${encodeURIComponent(JSON.stringify(order))}`}
        >
          
        </ListItem>
      ))}
    </List>
  )

  const renderOrderListNew = orders => (
    <List>
      {orders.map(order => (
        <CustomListView
          key={order.memeID}
          link={`/orderdetails/${encodeURIComponent(JSON.stringify(order))}`}
          name={order.vehicleno}
          email={order.transport}
          role={order.destination}
          lastLogin={new Date(order.orderdate).toLocaleDateString()}
          status={order.status}
          avatar='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvCEBlARzs0B-fCAFUnrdC_-aU2_j9snaTiw&s'
        />
      ))}
    </List>
  )

  return (
    <Page>
      <Navbar title='Orders' backLink='Back' />
      <Subnavbar>
        <Segmented strong>
          <Button active={filter === 'All'} onClick={() => setFilter('All')}>
            All
          </Button>
          <Button
            active={filter === 'Reported'}
            onClick={() => setFilter('Reported')}
          >
            Reported
          </Button>
          <Button
            active={filter === 'Loaded'}
            onClick={() => setFilter('Loaded')}
          >
            Loaded
          </Button>
          <Button
            active={filter === 'In Process'}
            onClick={() => setFilter('In Process')}
          >
            In Process
          </Button>
        </Segmented>
      </Subnavbar>
      <Block>
        <BlockTitle>Today</BlockTitle>
        {ordersToday.length > 0 ? (
          renderOrderListrev(ordersToday)
        ) : (
          <Block>No orders for today.</Block>
        )}
      </Block>
      <Block>
        <BlockTitle>Older than Today</BlockTitle>
        {ordersOlder.length > 0 ? (
          renderOrderListrev(ordersOlder)
        ) : (
          <Block>No older orders.</Block>
        )}
      </Block>
    </Page>
  )
}

export default OrderListPage
