import React from 'react';
import { Page, Navbar, BlockTitle, List, ListItem, Link,f7 } from 'framework7-react';
import DetailsDataTable from '../../components/DetailsDataTable';
import { supabase } from '../../components/supabase';


const SingleRecordPage = ({ f7route, f7router }) => {
  const item = JSON.parse(decodeURIComponent(f7route.params.item));

  const deleteRecord = async (mrn_no) => {
    try {
      // Delete associated details first
      const { data: detailsData, error: detailsError } = await supabase
        .from('materialissuedetails')
        .delete()
        .eq('mrn_no', mrn_no);

      if (detailsError) {
        throw detailsError;
      }

      // Delete the main record
      const { data: recordData, error: recordError } = await supabase
        .from('MaterialIssueTracker')
        .delete()
        .eq('mrn_no', mrn_no);

      if (recordError) {
        throw recordError;
      }

      // Navigate back after successful deletion
      f7router.back();
    } catch (error) {
      console.error('Error deleting record:', error);
      f7.dialog.alert('Failed to delete record');
    }
  };

  return (
    <Page>
      <Navbar title="Record Details" backLink="Back">
        <Link
          iconMd="f7:square_pencil"
          slot="right"
          onClick={() => f7router.navigate(`/edit-record/${encodeURIComponent(JSON.stringify(item))}`)}
        />
        <Link
          iconMd="f7:trash"
          slot="right"
          onClick={() => {
            f7.dialog.confirm('Are you sure you want to delete this record?', 'Delete Record', () => {
              deleteRecord(item.mrn_no);
            });
          }}
        />
      </Navbar>

      <BlockTitle>Material Issue Tracker</BlockTitle>
      <List>
        <ListItem>
          <img src={item.mrn_photo} alt="MRN Photo" style={{ width: '70%' }} />
        </ListItem>
        <ListItem header="MRN No" title={item.mrn_no}></ListItem>
        <ListItem header="Issue Date" title={item.issue_date}></ListItem>
        <ListItem header="Requested By" title={item.requested_by}></ListItem>
        <ListItem header="Requirement Purpose" title={item.requirement_purpose}></ListItem>
        <ListItem header="Handover To" title={item.handover_to}></ListItem>
        <ListItem header="Issued By" title={item.issued_by}></ListItem>
      </List>
      
      <BlockTitle>Material Issue Details</BlockTitle>
      <DetailsDataTable mrn_no={item.mrn_no} />
    </Page>
  );
};

export default SingleRecordPage;
