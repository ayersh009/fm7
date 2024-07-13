import React, { useState, useEffect } from 'react';
import { Popup, Page, Navbar, List, ListInput, Button, Block, ListItem, Icon,NavRight,Link } from 'framework7-react';

const DetailPopup = ({ opened, onClose, onSave }) => {
  const initialDetailState = { product: '', batch: '', uom: '', qty: '', pallet: '' };
  const [detail, setDetail] = useState(initialDetailState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!opened) {
      setDetail(initialDetailState); // Reset form when popup is closed
      setErrors({}); // Reset errors when popup is closed
    }
  }, [opened]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetail({ ...detail, [name]: value });
    if (value.trim() !== '') {
      setErrors({ ...errors, [name]: false });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!detail.product.trim()) newErrors.product = 'Product is required';
    if (!detail.batch.trim()) newErrors.batch = 'Batch is required';
    if (!detail.uom.trim()) newErrors.uom = 'UOM is required';
    if (!detail.qty.trim()) newErrors.qty = 'Quantity is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(detail);
      setDetail(initialDetailState); // Reset form on save
      onClose();
    }
  };

  return (
    <Popup opened={opened} onPopupClosed={onClose}>
      <Page>
        <Navbar title="Add Detail" ><NavRight>
              <Link popupClose>Close</Link>
            </NavRight></Navbar>
        <List noHairlinesMd>
          <ListInput
            label="Product"
            type="text"
            name="product"
            placeholder="Enter Product"
            value={detail.product}
            onInput={handleInputChange}
            errorMessage={errors.product}
            errorMessageForce={!!errors.product}
          />
          <ListInput
            label="Batch"
            type="text"
            name="batch"
            placeholder="Enter Batch"
            value={detail.batch}
            onInput={handleInputChange}
            errorMessage={errors.batch}
            errorMessageForce={!!errors.batch}
          />
          <ListInput
            label="UOM"
            type="select"
            name="uom"
            placeholder="Select UOM"
            value={detail.uom}
            onInput={handleInputChange}
            errorMessage={errors.uom}
            errorMessageForce={!!errors.uom}
          >
            <option value="">Select UOM</option>
            <option value="Packet">Packet</option>
            <option value="Box">Box</option>
          </ListInput>
          <ListInput
            label="Quantity"
            type="number"
            name="qty"
            placeholder="Enter Quantity"
            value={detail.qty}
            onInput={handleInputChange}
            errorMessage={errors.qty}
            errorMessageForce={!!errors.qty}
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
