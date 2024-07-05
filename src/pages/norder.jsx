import React, { useEffect } from 'react';
import { Page, Navbar, List, ListItem, Block,useStore } from 'framework7-react';
//import { useStore } from 'framework7-react';
import store from '../js/store';

const OrderListPage = ({ f7router }) => {
  const orders = useStore('orders');

  useEffect(() => {
    store.dispatch('fetchOrders');
  }, []);


  const navigateToOrderDetails = async (memeID) => {
    const order = await store.dispatch('fetchOrderById', memeID);
    f7router.navigate(`/orderdetails/${memeID}`, { props: { order } });
  };

  return (
    <Page>
      <Navbar title="Orders" />
      <Block strong>
        <List>
          {orders.map(order => (
            <ListItem
              key={order.memeID}
              title={`Order #${order.memeID}`}
              after={new Date(order.orderdate).toLocaleDateString()}
              link={`/orderdetails/${order.memeID}`}
              onClick={() => navigateToOrderDetails(order.memeID)}
            />
          ))}
        </List>
      </Block>
    </Page>
  );
};

export default OrderListPage;
