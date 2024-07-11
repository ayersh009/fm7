// EditRecordPage.jsx
import React, { useState, useEffect } from 'react';
import { Page, Navbar, List, ListInput, Button, Block } from 'framework7-react';
import { supabase } from '../../components/supabase';

const EditRecordPage = ({ f7route, f7router }) => {
  const item = JSON.parse(decodeURIComponent(f7route.params.item));
  const mrn_no = item.mrn_no;
  const [details, setDetails] = useState([]);
  const [form, setForm] = useState({
    mrn_photo: item.mrn_photo,
    issue_date: item.issue_date,
    mrn_no: item.mrn_no,
    requested_by: item.requested_by,
    requirement_purpose: item.requirement_purpose,
    handover_to: item.handover_to,
    issued_by: item.issued_by,
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('MaterialIssueTracker')
        .update(form)
        .eq('mrn_no', mrn_no);

      if (error) {
        console.error('Error updating record:', error.message);
      } else {
        // Update details table as needed
        // Add your update logic here

        f7router.back();
      }
    } catch (error) {
      console.error('Error updating record:', error.message);
    }
  };

  useEffect(() => {
    fetchDetails(); // Fetch details when component mounts or when `mrn_no` changes
  }, [mrn_no]);

  return (
    <Page>
      <Navbar title="Edit Record" backLink="Back" />
      <List>
        <ListInput
          label="MRN Photo"
          type="text"
          name="mrn_photo"
          value={form.mrn_photo}
          onInput={handleChange}
        />
        <ListInput
          label="Issue Date"
          type="text"
          name="issue_date"
          value={form.issue_date}
          onInput={handleChange}
        />
        <ListInput
          label="Requested By"
          type="text"
          name="requested_by"
          value={form.requested_by}
          onInput={handleChange}
        />
        <ListInput
          label="Requirement Purpose"
          type="text"
          name="requirement_purpose"
          value={form.requirement_purpose}
          onInput={handleChange}
        />
        <ListInput
          label="Handover To"
          type="text"
          name="handover_to"
          value={form.handover_to}
          onInput={handleChange}
        />
        <ListInput
          label="Issued By"
          type="text"
          name="issued_by"
          value={form.issued_by}
          onInput={handleChange}
        />
      </List>
      <Block>
        <Button fill onClick={handleSubmit}>Save</Button>
      </Block>
    </Page>
  );
};

export default EditRecordPage;
