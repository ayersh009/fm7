import React from 'react';
import { Page, Navbar, BlockTitle, List, ListItem, Block, Link, BlockFooter } from 'framework7-react';

const DetailPage = ({ f7route }) => {
  const { item } = f7route.params.item || {};  // Changed from f7route.props to f7route.params

  if (!item) {
    return (
      <Page>
        <Navbar title="Item Details" backLink="Back" />
        <Block strong>
          <p>{ item }</p>
        </Block>
      </Page>
    );
  }

  const columnsToDisplay = [
    'Pallet_No',
    'Location',
    'Status',
    'Remarks',
    'Balance',
    'Product_Code',
    'Product_Description',
    'Batch',
    'MFG_Date',
    'Expiry_Date',
    'Hold_Remarks',
    'Remaining Self_Life',
    'Allocation_for',
  ];

  return (
    <Page>
      <Navbar title="Item Details" backLink="Back" />
      <BlockTitle>Item Details</BlockTitle>
      <List>
        {columnsToDisplay.map((key, index) => (
          <ListItem
            key={index}
            title={key}
            after={item[key] || 'N/A'}
            link="#"
          />
        ))}
      </List>
      <BlockFooter>
        <Block>
          <Link href="/" iconF7="arrow_left">Back to List</Link>
        </Block>
      </BlockFooter>
    </Page>
  );
};

export default DetailPage;
