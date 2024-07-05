import React from 'react';
import { Page, Navbar, Block, BlockTitle } from 'framework7-react';
import { useStore } from 'framework7-react';

const OrderDetailsPage = ({ f7route }) => {
  const memeID = f7route.params.id;
  const getOrderById = useStore('getOrderById');
  const order = getOrderById(memeID);

  if (!order) {
    return (
      <Page>
        <Navbar title="Order Details" backLink="Back" />
        <Block strong>No order details available.</Block>
      </Page>
    );
  }

  return (
    <Page>
      <Navbar title={`Order #${order.memeID}`} backLink="Back" />
      <Block strong>
        <BlockTitle>Order Details</BlockTitle>
        <p><strong>Date:</strong> {new Date(order.orderdate).toLocaleDateString()}</p>
        <p><strong>Details:</strong> {order.details}</p>
        {/* Add more fields as needed */}
      </Block>
    </Page>
  );
};

export default OrderDetailsPage;
