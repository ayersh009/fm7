import React from 'react';
import { Page, Navbar, Block } from 'framework7-react';

const DetailsPage = ({ f7route }) => {
    const item = f7route.params.item ? JSON.parse(f7route.params.item) : {};

  return (
    <Page>
      <Navbar title="Details" backLink="Back" />
      <Block>
        <h2>{item.orderdate}</h2>
        <p>{item.vehicle}</p>
        {/* Add more details here based on your item structure */}
      </Block>
    </Page>
  );
};

export default DetailsPage;
