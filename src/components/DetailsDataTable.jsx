// DetailsDataTable.jsx
import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  Button,
  f7,
  Popup,
  Page,
  List,
  ListInput,
  Navbar,
  Block,
  CardHeader,
  Link
} from 'framework7-react'
import { supabase } from '../components/supabase'

const DetailsDataTable = ({ mrn_no }) => {
  const [details, setDetails] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [isEdit, setIsEdit] = useState(false)

  const fetchDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('materialissuedetails')
        .select('*')
        .eq('mrn_no', mrn_no)

      if (error) {
        console.error('Error fetching details:', error.message)
      } else {
        setDetails(data)
      }
    } catch (error) {
      console.error('Error fetching details:', error.message)
    }
  }

  useEffect(() => {
    fetchDetails() // Fetch details when component mounts or when `mrn_no` changes
  }, [mrn_no])

  const handleDeleteClick = async id => {
    try {
      const { error } = await supabase
        .from('materialissuedetails')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting record:', error.message)
      } else {
        setDetails(details.filter(detail => detail.id !== id))
      }
    } catch (error) {
      console.error('Error deleting record:', error.message)
    }
  }

  const handleEditClick = detail => {
    setEditForm(detail)
    setIsEdit(true)
    setIsPopupOpen(true)
  }

  const handleAddClick = () => {
    setEditForm({ mrn_no })
    setIsEdit(false)
    setIsPopupOpen(true)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setEditForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveClick = async () => {
    try {
      if (isEdit) {
        const { error } = await supabase
          .from('materialissuedetails')
          .update(editForm)
          .eq('id', editForm.id)

        if (error) {
          console.error('Error updating record:', error.message)
        } else {
          const newDetails = [...details]
          const index = newDetails.findIndex(
            detail => detail.id === editForm.id
          )
          newDetails[index] = editForm
          setDetails(newDetails)
          setIsPopupOpen(false)
        }
      } else {
        const { data, error } = await supabase
          .from('materialissuedetails')
          .insert([editForm])
          .select() // Explicitly select the inserted row

        if (error) {
          console.error('Error adding record:', error.message)
        } else if (data && data.length > 0) {
          setDetails([...details, data[0]])
          setIsPopupOpen(false)
        } else {
          console.error('Error adding record: No data returned from Supabase')
        }
      }
    } catch (error) {
      console.error('Error saving record:', error.message)
    }
  }

  return (
    <div>
      <Card className='data-table data-table-init'>
        <CardHeader>
          <div className='data-table-links'>
            <a className='button' onClick={handleAddClick}>
              Add Product
            </a>
          </div>
        </CardHeader>
        <CardContent padding={false}>
          <table>
            <thead>
              <tr>
                <th className='label-cell'>PRODUCT</th>
                <th className='label-cell'>QTY</th>
                <th className='numeric-cell'>UOM</th>
                <th className='numeric-cell'>BATCH</th>
                <th className='numeric-cell'>PALLET</th>
                <th className='actions-cell'>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {details.map(detail => (
                <tr key={detail.id}>
                  <td className='label-cell'>{detail.product}</td>
                  <td className='label-cell'>{detail.qty}</td>
                  <td className='numeric-cell'>{detail.uom}</td>
                  <td className='numeric-cell'>{detail.batch}</td>
                  <td className='numeric-cell'>{detail.pallet}</td>
                  <td className='actions-cell'>
                    <Link iconIos='f7:square_pencil' iconMd='material:edit' onClick={() => handleEditClick(detail)} />
                    <Link iconIos='f7:trash' iconMd='material:delete' onClick={() => handleDeleteClick(detail.id)} />
                  </td>
                 {/*  <td className='actions-cell'>
                    <Button onClick={() => handleEditClick(detail)}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteClick(detail.id)}>
                      Delete
                    </Button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
     {/*  <Block>
        <Button fill onClick={handleAddClick}>
          Add Record
        </Button>
      </Block> */}

      <Popup opened={isPopupOpen} onPopupClosed={() => setIsPopupOpen(false)}>
        <Page>
          <Navbar
            title={isEdit ? 'Edit Record' : 'Add Record'}
            backLink='Back'
          />
          <List noHairlinesMd>
            <ListInput
              label='Product'
              type='text'
              placeholder="Enter Product"
              name='product'
              value={editForm.product || ''}
              onInput={handleInputChange}
            />
            <ListInput
              label='Quantity'
              type='text'
              placeholder="Enter Quantity"
              name='qty'
              value={editForm.qty || ''}
              onInput={handleInputChange}
            />
            <ListInput
              label='UOM'
              type="select"
              placeholder="Select UOM"
              name='uom'
              value={editForm.uom || ''}
              onInput={handleInputChange}
            > <option value="">Select UOM</option>
            <option value="Packet">Packet</option>
            <option value="Box">Box</option>
            </ListInput>
            <ListInput
              label='Batch'
              type='text'
              name='batch'
               placeholder="Enter Batch"
              value={editForm.batch || ''}
              onInput={handleInputChange}
            />
            <ListInput
              label='Pallet'
              type='text'
              name='pallet'
              placeholder="Enter Pallet"
              value={editForm.pallet || ''}
              onInput={handleInputChange}
            />
          </List>
          <Block>
            <Button fill onClick={handleSaveClick}>
              {isEdit ? 'Save Changes' : 'Add Record'}
            </Button>
          </Block>
        </Page>
      </Popup>
    </div>
  )
}

export default DetailsDataTable
