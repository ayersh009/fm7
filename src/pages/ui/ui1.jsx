import React, { useEffect } from 'react';
import {
  Page,
  Navbar,
  List,
  ListItem,
  Badge,
  BlockTitle,
  Button,
  Icon,
  Block,
} from 'framework7-react';
import { useStore } from 'framework7-react';
import store from '../../js/store'; // Adjust the path as needed

const getStatusIcon = (status) => {
  switch (status) {
    case 'In Process':
      return <Icon slot="media" md="material:forklift" color="blue" />;
    case 'Reported':
      return <Icon slot="media" f7="info_circle" />;
    case 'Loaded':
      return <Icon slot="media" md="material:local_shipping" color="green" />;
    default:
      return <Icon slot="media" f7="questionmark_circle" color="orange" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'In Process':
      return 'orange';
    case 'Reported':
      return 'gray';
    case 'Loaded':
      return 'green';
    default:
      return 'blue';
  }
};

const StatusTracker = () => {
  const pendingOrders = useStore('pendingOrders');
  const completedOrders = useStore('completedOrders');

  useEffect(() => {
    store.dispatch('loadOrders');
  }, []);

  return (
    <Page>
      <Navbar title="Status Tracker" backLink="Back">
        <Button slot="right" small outline>
          See All Orders
        </Button>
      </Navbar>
      <BlockTitle>Pending</BlockTitle>
      <List mediaList>
        {pendingOrders.map((order) => (
          <ListItem
            key={order.id}
            title={order.orderdate}
            text={order.destination}
            after={<Badge color={getStatusColor(order.status)}>{order.status}</Badge>}
            link={`/orderdetails/${encodeURIComponent(JSON.stringify(order))}`}
          >
            {getStatusIcon(order.status)}
          </ListItem>
        ))}
      </List>
      <BlockTitle>Completed</BlockTitle>
      <List mediaList>
        {completedOrders.map((order) => (
          <ListItem
            key={order.id}
            title={order.orderdate}
            text={order.destination}
            after={<Badge color={getStatusColor(order.status)}>{order.loadingdate}</Badge>}
            link="#"
          >
            {getStatusIcon(order.status)}
          </ListItem>
        ))}
      </List>
    </Page>
  );
};

export default StatusTracker;
