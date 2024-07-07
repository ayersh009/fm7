// SingleRecordPage.jsx
import React, { useState, useEffect } from 'react';
import { Page, Navbar, BlockTitle, Block } from 'framework7-react';
import { supabase } from '../../components/supabase';

const SingleRecordPage = ({ f7route }) => {
  const { mrn_no } = f7route.params;
  const [record, setRecord] = useState(null);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchRecord = async () => {
      const { data, error } = await supabase
        .from('MaterialIssueTracker')
        .select('*')
        .eq('mrn_no', mrn_no)
        .single();

      if (error) {
        console.error('Error fetching record: ', error);
      } else {
        setRecord(data);
      }
    };

    const fetchDetails = async () => {
      const { data, error } = await supabase
        .from('materialissuedetails')
        .select('*')
        .eq('mrn_no', mrn_no);

      if (error) {
        console.error('Error fetching details: ', error);
      } else {
        setDetails(data);
      }
    };

    fetchRecord();
    fetchDetails();
  }, [mrn_no]);

  if (!record) return null;

  return (
    <Page>
      <Navbar title="Record Details" backLink='Back' />
      <BlockTitle>Material Issue Tracker</BlockTitle>
      <Block strong>
        <p><strong>MRN No:</strong> {record.mrn_no}</p>
        <p><strong>Issue Date:</strong> {record.issue_date}</p>
        <p><strong>Requested By:</strong> {record.requested_by}</p>
        <p><strong>Requirement Purpose:</strong> {record.requirement_purpose}</p>
        <p><strong>Handover To:</strong> {record.handover_to}</p>
        <p><strong>Issued By:</strong> {record.issued_by}</p>
        <img src={record.mrn_photo} alt="MRN Photo" width="100%" />
      </Block>
      <BlockTitle>Material Issue Details</BlockTitle>
      {details.map((detail, index) => (
        <Block strong key={index}>
          <p><strong>Detail ID:</strong> {detail.mrn_no}</p>
          <p><strong>Description:</strong> {detail.product}</p>
          <p><strong>Quantity:</strong> {detail.batch}</p>
          <p><strong>Quantity:</strong> {detail.uom}</p>
          <p><strong>Quantity:</strong> {detail.qty}</p>
          <p><strong>Quantity:</strong> {detail.pallet}</p>
          {/* Add other fields as necessary */}
        </Block>
      ))}
    </Page>
  );
};

export default SingleRecordPage;
