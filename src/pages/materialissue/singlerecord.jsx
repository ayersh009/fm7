// SingleRecordPage.jsx
import React, { useState, useEffect } from 'react';
import { Page, Navbar, BlockTitle, Block, Button } from 'framework7-react';
import { supabase } from '../../components/supabase';

const SingleRecordPage = ({ f7route}) => {
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
      <BlockTitle>Material Issue Details</BlockTitle>
      {details.map((detail, index) => (
        <Block strong key={index}>
          <p><strong>Detail ID:</strong> {detail.detail_id}</p>
          <p><strong>Description:</strong> {detail.description}</p>
          <p><strong>Batch:</strong> {detail.batch}</p>
          <p><strong>UOM:</strong> {detail.uom}</p>
          <p><strong>Quantity:</strong> {detail.quantity}</p>
          <p><strong>Pallet:</strong> {detail.pallet}</p>
          {/* Add other fields as necessary */}
        </Block>
      ))}
    </Page>
  );
};

export default SingleRecordPage;
