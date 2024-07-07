// DetailPopup.jsx
import React, { useState, useEffect } from 'react';
import { Popup, Page, Navbar, List, ListInput, Button, Block } from 'framework7-react';

const DetailPopup = ({ opened, onClose, onSave }) => {
  const initialDetailState = { product: '', batch: '', uom: '', qty: '', pallet: '' };
  const [detail, setDetail] = useState(initialDetailState);

  useEffect(() => {
    if (!opened) {
      setDetail(initialDetailState); // Reset form when popup is closed
    }
  }, [opened]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetail({ ...detail, [name]: value });
  };

  const handleSave = () => {
    onSave(detail);
    setDetail(initialDetailState); // Reset form on save
    onClose();
  };

  return (
    <Popup opened={opened} onPopupClosed={onClose}>
      <Page>
        <Navbar title="Add Detail" />
        <List noHairlinesMd>
          <ListInput
            label="Product"
            type="text"
            name="product"
            placeholder="Enter Product"
            value={detail.product}
            onInput={handleInputChange}
          />
          <ListInput
            label="Batch"
            type="text"
            name="batch"
            placeholder="Enter Batch"
            value={detail.batch}
            onInput={handleInputChange}
          />
          <ListInput
            label="UOM"
            type="text"
            name="uom"
            placeholder="Enter UOM"
            value={detail.uom}
            onInput={handleInputChange}
          />
          <ListInput
            label="Quantity"
            type="number"
            name="qty"
            placeholder="Enter Quantity"
            value={detail.qty}
            onInput={handleInputChange}
          />
          <ListInput
            label="Pallet"
            type="text"
            name="pallet"
            placeholder="Enter Pallet"
            value={detail.pallet}
            onInput={handleInputChange}
          />
        </List>
        <Block>
          <Button fill onClick={handleSave}>Save</Button>
        </Block>
      </Page>
    </Popup>
  );
};

export default DetailPopup;
