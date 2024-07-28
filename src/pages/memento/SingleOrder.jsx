import React, { useState } from 'react';
import { Page, Navbar, Block, BlockTitle, List, ListItem, Button, Popup, PageContent, ListInput,f7 } from 'framework7-react';
import { supabase } from '../../components/supabase'; // Adjust the path as needed
import DetailsDataTable from '../memento/OrderDetails';

const OrderDetailsPage = ({ f7route }) => {
  const order = JSON.parse(decodeURIComponent(f7route.params.order));
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    status: order.status || 'Loaded',
    loadingdate: order.loadingdate || '',
    sealno: order.sealno || ''
  });

  if (!order) {
    return (
      <Page>
        <Navbar title="Order Details" backLink="Back" />
        <Block strong>No order details available.</Block>
      </Page>
    );
  }

  const renderOrderDetails = () => {
    return (
      <List>
        {Object.keys(order).map((key) => (
          key === 'photo' ? (
            <ListItem key={key} title={key.replace(/_/g, ' ')}>
              <img src={order[key]} alt="Order Photo" style={{ width: '100%' }} />
            </ListItem>
          ) : (
            <ListItem key={key} header={key.replace(/_/g, ' ')} title={order[key]} />
          )
        ))}
      </List>
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const { error } = await supabase
        .from('orderhead')
        .update(formData)
        .eq('id', order.id);

      if (error) {
        f7.dialog.alert('Error updating record: ' + error.message);
      } else {
        f7.dialog.alert('Record updated successfully');
        setIsPopupOpen(false);
      }
    } catch (error) {
      f7.dialog.alert('Error updating record: ' + error.message);
    }
  };

  

  return (
    <Page>
      <Navbar title={`${order.vehicle}`} backLink="Back">
        <Button slot='right' fill small onClick={() => setIsPopupOpen(true)} style={{ marginRight: '15px' }}>
          Mark as Loaded
        </Button>
      </Navbar>
      <Block strong>
        <BlockTitle>Order Details</BlockTitle>
        {renderOrderDetails()}
      </Block>
      <DetailsDataTable orderid={order.id} />

      <Popup opened={isPopupOpen} onPopupClosed={() => setIsPopupOpen(false)}>
        <Page>
          <Navbar title="Update Order" backLink="Back" />
          <PageContent>
            <List noHairlinesMd>
              <ListInput
                label="Status"
                type="select"
                name="status"
                value={formData.status}
                onInput={handleInputChange}
              >
                <option value="">Select Status</option>
                <option value="Reported">Reported</option>
                <option value="In Process">In Process</option>
                <option value="Loaded">Loaded</option>
              </ListInput>
              <ListInput
                label="Loading Date"
                type="date"
                name="loadingdate"
                value={formData.loadingdate}
                onInput={handleInputChange}
              />
              <ListInput
                label="Seal Number"
                type="text"
                name="sealno"
                placeholder="Enter Seal Number"
                value={formData.sealno}
                onInput={handleInputChange}
              />
            </List>
            <Block>
              <Button fill onClick={handleSaveClick}>Save Changes</Button>
            </Block>
          </PageContent>
        </Page>
      </Popup>
    </Page>
  );
};

export default OrderDetailsPage;
