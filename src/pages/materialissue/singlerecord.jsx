// SingleRecordPage.jsx
import React, { useState, useEffect } from 'react'
import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  Button,
  List,
  ListItem,
  Card, CardContent, CardHeader
} from 'framework7-react'
import { supabase } from '../../components/supabase'

const SingleRecordPage = ({ f7route }) => {
  const item = JSON.parse(decodeURIComponent(f7route.params.item))
  const mrn_no = item.mrn_no
  const [details, setDetails] = useState([])

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
        //console.log(data)
      }
    } catch (error) {
      console.error('Error fetching details:', error.message)
    }
  }

  useEffect(() => {
    fetchDetails() // Fetch details when component mounts or when `mrn_no` changes
  }, [mrn_no])

  return (
    <Page>
      <Navbar title='Record Details' backLink='Back' />
      <BlockTitle>Material Issue Tracker</BlockTitle>
      <List>
        <ListItem>
          <img src={item.mrn_photo} alt='MRN Photo' style={{ width: '70%' }} />
        </ListItem>
        <ListItem header='MRN No' title={item.mrn_no}></ListItem>
        <ListItem header='Issue Date' title={item.issue_date}></ListItem>
        <ListItem header='Requested By' title={item.requested_by}></ListItem>
        <ListItem
          header='Requirement Purpose'
          title={item.requirement_purpose}
        ></ListItem>
        <ListItem header='Handover To' title={item.handover_to}></ListItem>
        <ListItem header='Issued By' title={item.issued_by}></ListItem>
      </List>
      <BlockTitle>Material Issue Details</BlockTitle>
      <Card className="data-table data-table-init">
        
        <CardContent padding={false}>
          <table>
            <thead>
              <tr>
                <th className="label-cell">PRODUCT</th>
                <th className="label-cell">QTY</th>
                <th className="numeric-cell">UOM</th>
                <th className="numeric-cell">BATCH</th>
                <th className="numeric-cell">PALLET</th>
                
              </tr>
            </thead>
            <tbody>
              {details.map((detail, index) => (
                <tr key={index}>
                  <td className="label-cell">{detail.product}</td>
                  <td className="label-cell">{detail.qty}</td>
                  <td className="numeric-cell">{detail.uom}</td>
                  <td className="numeric-cell">{detail.batch}</td>
                  <td className="numeric-cell">{detail.pallet}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </Page>
  )
}

export default SingleRecordPage
