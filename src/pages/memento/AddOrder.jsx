import React, { useState } from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
  List,
  ListInput,
  Button,
  Block,
  f7,
  Preloader,
  Icon
} from 'framework7-react';
import { Camera, CameraResultType } from '@capacitor/camera';
import store from '../../js/store'; // Adjust the path as needed
import { supabase } from '../../components/supabase'; // Adjust the path as needed

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
    photo: '',
    addedby: '',
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handlePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        quality: 90,
      });
  
      if (image.dataUrl) {
        setUploading(true);
        const fileName = `order_${Date.now()}.jpeg`;
        const { data, error } = await supabase.storage
          .from('ordermanager') // Adjust the bucket name as needed
          .upload(fileName, dataUrlToFile(image.dataUrl, fileName));
  
        if (error) {
          throw error;
        }
  
        const { data: publicUrlData, error: urlError } = supabase
          .storage
          .from('ordermanager') // Adjust the bucket name as needed
          .getPublicUrl(fileName); // Use fileName to get the public URL
  
        if (urlError) {
          throw urlError;
        }
  
        setOrder({ ...order, photo: (publicUrlData.publicUrl) });
        console.log(publicUrlData.publicUrl)
      }
    } catch (error) {
      f7.dialog.alert('Failed to capture or upload photo. Please try again.', 'Error');
    } finally {
      setUploading(false);
    }
  };
  

  const dataUrlToFile = (dataUrl, fileName) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await store.dispatch('addOrder', order);
      await store.dispatch('loadOrders'); // Ensure orders are reloaded
      f7router.back();
      f7.dialog.alert('Order added successfully!', 'Success');
    } catch (error) {
      f7.dialog.alert('Failed to add order. Please try again.', 'Error');
    }
  };

  return (
    <Page>
      <Navbar title="Add Order" backLink="Back" />
      <BlockTitle>Add a New Order</BlockTitle>
      <Block>
          <Button fill onClick={handlePhoto} disabled={uploading}>
            {uploading ? (
              <Preloader color="white"></Preloader>
            ) : (
              <Icon f7="camera_fill"></Icon>
            )}
            {uploading ? 'Uploading...' : 'Capture/Select Photo'}
          </Button>
          {order.photo && (
            <img src={order.photo} alt="Order" style={{ marginTop: '10px', width: '100%', height: 'auto' }} />
          )}
        </Block>
      <List form onSubmit={handleSubmit}>
        <ListInput
          label="Order Date"
          type="date"
          name="orderdate"
          placeholder='Select Date'
          value={order.orderdate}
          onInput={handleChange}
          required
        />
        <ListInput
          label="Status"
          type="select"
          name="status"
          value={order.status}
          onChange={handleChange}
          required
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
          placeholder='Enter Destination'
          value={order.destination}
          onInput={handleChange}
          required
        />
        <ListInput
          label="Vehicle"
          type="text"
          name="vehicle"
          placeholder='Enter Vehicle Number'
          value={order.vehicle}
          onInput={handleChange}
          pattern="[A-Z,0-9]+"
          title="Vehicle must be in uppercase letters"
          required
        />
        <ListInput
          label="Transport"
          type="text"
          name="transport"
          placeholder='Enter Transport'
          value={order.transport}
          onInput={handleChange}
          required
        />
        <ListInput
          label="Driver"
          type="text"
          name="driver"
          placeholder='Enter Driver Name'
          value={order.driver}
          onInput={handleChange}
          required
        />
        <ListInput
          label="Mobile"
          type="tel"
          name="mobile"
          placeholder='Enter Mobile Number'
          value={order.mobile}
          onInput={handleChange}
          pattern="[0-9]{10,15}"
          title="Mobile number must be between 10 and 15 digits"
          required
        />

        {order.status === 'Loaded' && (
          <>
            <ListInput
              label="Loading Date"
              type="date"
              name="loadingdate"
              value={order.loadingdate}
              onInput={handleChange}
              required
            />
            <ListInput
              label="Seal Number"
              type="text"
              name="sealno"
              placeholder='Enter Seal Number'
              value={order.sealno}
              onInput={handleChange}
              required
            />
            <ListInput
              label="Total Quantity"
              type="text"
              name="totalqty"
              placeholder='Enter Total Quantity'
              value={order.totalqty}
              onInput={handleChange}
              required
            />
          </>
        )}

        

        <ListInput
          label="Added By"
          type="text"
          name="addedby"
          placeholder='Enter Your Name'
          value={order.addedby}
          onInput={handleChange}
          required
        />
        <Block>
          <Button fill type="submit">Add Order</Button>
        </Block>
      </List>
    </Page>
  );
};

export default AddOrder;
