import React from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
  List,
  ListItem
} from 'framework7-react';

const DetailPage = ({ f7route }) => {
  const item = f7route.params.item ? JSON.parse(f7route.params.item) : {};

  if (!item) {
    return (
      <Page>
        <Navbar title='Item Details' backLink='Back' />
        <Block strong>
          <p>No Item to display</p>
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
    'Allocation_for'
  ];

  const getStyleForHoldRemarks = (value) => {
    return title === 'Released' ? { color: '#088F8F' } : { color: 'red' };
  };

  return (
    <Page>
      <Navbar title='Pallet Details' backLink='Back' />
      <BlockTitle>Pallet Details</BlockTitle>
      <List>
        {columnsToDisplay.map((key, index) => (
          <ListItem
            key={index}
            header={key}
            title={item[key] || '-'}
            style={key === 'Hold_Remarks' ? getStyleForHoldRemarks(item[key]) : { whiteSpace: 'normal' }} // Added this line
          />
        ))}
      </List>
    </Page>
  );
};

export default DetailPage;
