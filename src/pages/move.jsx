import React, { useState, useEffect } from 'react'
import {
  Page,
  Navbar,
  Block,
  List,
  ListInput,
  Button,
  Preloader,
  f7
} from 'framework7-react'

const SubmitPage = () => {
  const [palletNo, setPalletNo] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    // Load saved items from local storage when the component mounts
    const savedItems = JSON.parse(localStorage.getItem('items')) || []
    setItems(savedItems)
  }, [])

  const handleSubmit = () => {
    if (!palletNo || !newLocation) {
      f7.toast
        .create({
          text: 'Both fields are required',
          closeButton: true
        })
        .open()
      return
    }

    setLoading(true) // Set loading state to true when the request starts

    const data = {
      palletNo,
      newLocation
    }

    fetch(
      'https://script.google.com/macros/s/AKfycbxbuYB8HzpdIBzxQtTrduGFXAG55Bxfv_OhYzEUQOdVnxVs792Y66l70ji6DSqoKk4A1g/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
      .then(response => response.json())
      .then(data => {
        setLoading(false) // Set loading state to false when the request finishes
        f7.toast
          .create({
            text: data.message || 'Submission successful!',
            closeButton: true
          })
          .open()

        // Save the new item to local storage
        const newItem = { palletNo, newLocation }
        const updatedItems = [...items, newItem]
        setItems(updatedItems)
        localStorage.setItem('items', JSON.stringify(updatedItems))

        // Clear the input fields
        setPalletNo('')
        setNewLocation('')
      })
      .catch(error => {
        setLoading(false) // Set loading state to false if the request fails
        console.error('Error:', error)
        f7.toast
          .create({
            text: 'Submission failed, please try again.',
            closeButton: true
          })
          .open()
      })
  }

  return (
    <Page>
      <Navbar title='Move Pallet' backLink='Back' />

      <List strongIos outlineIos dividersIos>
        <ListInput
          label='Pallet No'
          type='text'
          placeholder='Enter Pallet No'
          value={palletNo}
          onInput={e => setPalletNo(e.target.value)}
        />
        <ListInput
          label='New Location'
          type='text'
          placeholder='Enter New Location'
          value={newLocation}
          onInput={e => setNewLocation(e.target.value)}
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
              <Preloader color='white' /> Submitting...
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </Block>

      <Block>
        <List>
          {items.map((item, index) => (
            <li key={index}>
              <div>Pallet No: {item.palletNo}</div>
              <div>New Location: {item.newLocation}</div>
            </li>
          ))}
        </List>
      </Block>
    </Page>
  )
}

export default SubmitPage
