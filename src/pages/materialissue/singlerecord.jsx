import React, { useState, useEffect } from 'react';
import { Page, Navbar, BlockTitle, Block, List, ListItem, ListItemContent, ListItemLabel, Button } from 'framework7-react';
import { supabase } from '../../components/supabase';

const SingleRecordPage = ({ f7route }) => {
  const item = JSON.parse(decodeURIComponent(f7route.params.item));
  const mrn_no = item.mrn_no;
  const [details, setDetails] = useState([]);

  const fetchDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('materialissuedetails')
        .select('*')
        .eq('mrn_no', mrn_no);

      if (error) {
        console.error('Error fetching details:', error.message);
      } else {
        setDetails(data);
      }
    } catch (error) {
      console.error('Error fetching details:', error.message);
    }
  };

  useEffect(() => {
    fetchDetails(); // Fetch details when component mounts or when `mrn_no` changes
  }, [mrn_no]);

  return (
    <Page>
      <Navbar title="Record Details" backLink="Back" />
      
      {/* Main Record Details */}
      <BlockTitle>Material Issue Tracker</BlockTitle>
      <Block strong>
        <p><strong>MRN No:</strong> {item.mrn_no}</p>
        <p><strong>Issue Date:</strong> {item.issue_date}</p>
        <p><strong>Requested By:</strong> {item.requested_by}</p>
        <p><strong>Requirement Purpose:</strong> {item.requirement_purpose}</p>
        <p><strong>Handover To:</strong> {item.handover_to}</p>
        <p><strong>Issued By:</strong> {item.issued_by}</p>
        <img src={item.mrn_photo} alt="MRN Photo" style={{ width: '100%' }} />
      </Block>
      
      {/* Material Issue Details */}
      <BlockTitle>Material Issue Details</BlockTitle>
      <List mediaList>
        {details.map((detail, index) => (
          <ListItem key={index} title={`Detail ID: ${detail.detail_id}`}>
            <ListItemContent>
              <ListItemLabel>Description</ListItemLabel>
              {detail.description}
            </ListItemContent>
            <ListItemContent>
              <ListItemLabel>Batch</ListItemLabel>
              {detail.batch}
            </ListItemContent>
            <ListItemContent>
              <ListItemLabel>UOM</ListItemLabel>
              {detail.uom}
            </ListItemContent>
            <ListItemContent>
              <ListItemLabel>Quantity</ListItemLabel>
              {detail.quantity}
            </ListItemContent>
            <ListItemContent>
              <ListItemLabel>Pallet</ListItemLabel>
              {detail.pallet}
            </ListItemContent>
            {/* Add other fields as necessary */}
          </ListItem>
        ))}
      </List>
    </Page>
  );
};

export default SingleRecordPage;
