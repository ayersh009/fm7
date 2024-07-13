import React, { useState, useEffect } from 'react';
import {
  Page,
  Navbar,
  Block,
  List,
  ListInput,
  Button,
  Preloader,
  f7
} from 'framework7-react';

const SubmitPage = () => {
  const [palletNo, setPalletNo] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(savedItems);
  }, []);

  const handleSubmit = async () => {
    if (!palletNo || !newLocation) {
      f7.toast
        .create({
          text: 'Both fields are required',
          closeButton: true
        })
        .open();
      return;
    }

    setLoading(true);

    const url = `https://script.google.com/macros/s/AKfycbxbuYB8HzpdIBzxQtTrduGFXAG55Bxfv_OhYzEUQOdVnxVs792Y66l70ji6DSqoKk4A1g/exec?palletNo=${encodeURIComponent(palletNo)}&newLocation=${encodeURIComponent(newLocation)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setLoading(false);

      f7.toast
        .create({
          text: data.message,
          closeButton: true
        })
        .open();

      if (data.message === 'Location updated successfully') {
        const newItem = { palletNo, newLocation };
        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));

        setPalletNo('');
        setNewLocation('');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      f7.toast
        .create({
          text: 'An error occurred, please try again.',
          closeButton: true
        })
        .open();
    }
  };

  return (
    <Page>
      <Navbar title="Move Pallet" backLink="Back" />
      <List strongIos outlineIos dividersIos>
        <ListInput
          label="Pallet No"
          type="text"
          placeholder="Enter Pallet No"
          value={palletNo}
          onInput={(e) => setPalletNo(e.target.value)}
        />
        <ListInput
          label="New Location"
          type="text"
          placeholder="Enter New Location"
          value={newLocation}
          onInput={(e) => setNewLocation(e.target.value)}
        />
      </List>
      <Block>
        <Button
          fill
          preloader
          loading={loading}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <Preloader color="white" /> Submitting...
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </Block>

      <Block>
        <List>
          {items.map((item, index) => (
            <li key={index} style={{ margin: '10px 0' }}>
              <div>Pallet No: {item.palletNo}</div>
              <div>New Location: {item.newLocation}</div>
            </li>
          ))}
        </List>
      </Block>
    </Page>
  );
};

export default SubmitPage;
