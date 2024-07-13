import React from 'react';
import { Page, Navbar, Block, BlockTitle } from 'framework7-react';

const OrderDetailsPage = ({ f7route }) => {
  const order = JSON.parse(decodeURIComponent(f7route.params.order));

  if (!order) {
    return (
      <Page>
        <Navbar title="Order Details" backLink="Back" />
        <Block strong>No order details available.</Block>
      </Page>
    );
  }

  const renderOrderDetails = () => {
    return Object.keys(order).map((key) => (
      <p key={key}>
        <strong>{key.replace(/_/g, ' ')}:</strong> {order[key]}
      </p>
    ));
  };

  return (
    <Page>
      <Navbar title={`#${order.vehicleno}`} backLink="Back" />
      <Block strong>
        <BlockTitle>Order Details</BlockTitle>
        {renderOrderDetails()}
      </Block>
    </Page>
  );
};

export default OrderDetailsPage;
