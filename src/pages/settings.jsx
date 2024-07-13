import React from 'react';
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

const orders = [
  {
    id: 1,
    name: 'Yolanda Barrueco',
    amount: '1 255,00 $',
    status: 'Fulfilled',
    orderId: 'SO-00001',
    avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
    statusColor: 'green',
  },
  {
    id: 2,
    name: 'Wan Gengxin',
    amount: '904,00 $',
    status: 'Confirmed',
    orderId: 'SO-00001',
    avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
    statusColor: 'blue',
  },
  {
    id: 3,
    name: 'Sampson Totton',
    amount: '145,99 $',
    status: 'Fulfilled',
    orderId: 'SO-00001',
    avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
    statusColor: 'green',
  },
  {
    id: 4,
    name: 'Miriam de Jesús',
    amount: '3 669,04 $',
    status: 'Partially Shipped',
    orderId: 'SO-00001',
    avatar: 'path_to_miriam_avatar_image',
    statusColor: 'purple',
  },
  {
    id: 5,
    name: 'Meysam Nassour',
    amount: '178,00 $',
    status: 'Fulfilled',
    orderId: 'SO-00001',
    avatar: 'path_to_meysam_avatar_image',
    statusColor: 'green',
  },
  {
    id: 6,
    name: 'Dusana Semenov',
    amount: '244,00 $',
    status: 'Confirmed',
    orderId: 'SO-00001',
    avatar: 'path_to_dusana_avatar_image',
    statusColor: 'blue',
  },
];

const OrderList = () => (
  <Page>
    <Navbar title="Orders" backLink="Back" />
    <Block>
    <List mediaList>
      {orders.map((order) => (
        <ListItem
          key={order.id}
          title={order.name}
          text={order.amount}
          subtitle={order.orderId}
          after={<Badge color={order.statusColor}>{order.status}</Badge>}
          link="#"
          style={{ backgroundColor: order.status === 'Partially Shippe' ? '#3b5998' : 'transparent', color: order.status === 'Partially Shipped' ? '#ffffff' : '#000000' }}
        >
          <img slot="media" src={order.avatar} width="24" />
        </ListItem>
      ))}
    </List>
    </Block>
  </Page>
);

export default OrderList;
