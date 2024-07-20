// AddOrder.js
import React, { useState } from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
  List,
  ListInput,
  Button,
  Block,
} from 'framework7-react';
import store from '../../js/store'; // Adjust the path as needed

const AddOrder = ({ f7router }) => {
  const [order, setOrder] = useState({
    orderdate: '',
    status: '',
    destination: '',
    vehicle: '',
    transport: '',
    driver: '',
    mobile: '',
    loadingdate: '',
    sealno: '',
    totalqty: '',
    addedby: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await store.dispatch('addOrder', order);
    await store.dispatch('loadOrders'); // Ensure orders are reloaded
    f7router.back();
  };

  return (
    <Page>
      <Navbar title="Add Order" backLink="Back" />
      <BlockTitle>Add a New Order</BlockTitle>
      <List form onSubmit={handleSubmit}>
        <ListInput
          label="Order Date"
          type="date"
          name="orderdate"
          value={order.orderdate}
          onInput={handleChange}
        />
        <ListInput
          label="Status"
          type="select"
          name="status"
          value={order.status}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option value="Reported">Reported</option>
          <option value="In Process">In Process</option>
          <option value="Loaded">Loaded</option>
        </ListInput>
        <ListInput
          label="Destination"
          type="text"
          name="destination"
          value={order.destination}
          onInput={handleChange}
        />
        <ListInput
          label="Vehicle"
          type="text"
          name="vehicle"
          value={order.vehicle}
          onInput={handleChange}
          pattern="[A-Z]+"
          title="Vehicle must be in uppercase letters"
        />
        <ListInput
          label="Transport"
          type="text"
          name="transport"
          value={order.transport}
          onInput={handleChange}
        />
        <ListInput
          label="Driver"
          type="text"
          name="driver"
          value={order.driver}
          onInput={handleChange}
        />
        <ListInput
          label="Mobile"
          type="tel"
          name="mobile"
          value={order.mobile}
          onInput={handleChange}
          pattern="[0-9]{10,15}"
          title="Mobile number must be between 10 and 15 digits"
        />
        <ListInput
          label="Loading Date"
          type="date"
          name="loadingdate"
          value={order.loadingdate}
          onInput={handleChange}
        />
        <ListInput
          label="Seal Number"
          type="text"
          name="sealno"
          value={order.sealno}
          onInput={handleChange}
        />
        <ListInput
          label="Total Quantity"
          type="text"
          name="totalqty"
          value={order.totalqty}
          onInput={handleChange}
        />
        <ListInput
          label="Added By"
          type="text"
          name="addedby"
          value={order.addedby}
          onInput={handleChange}
        />
        <Block>
          <Button fill type="submit">Add Order</Button>
        </Block>
      </List>
    </Page>
  );
};

export default AddOrder;
