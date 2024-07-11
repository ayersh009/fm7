// SingleRecordPage.jsx
import React from 'react';
import { Page, Navbar, BlockTitle, List, ListItem,Link } from 'framework7-react';
import DetailsDataTable from '../../components/DetailsDataTable';

const SingleRecordPage = ({ f7route, f7router }) => {
  const item = JSON.parse(decodeURIComponent(f7route.params.item));

  return (
    <Page>
      <Navbar title="Record Details" backLink="Back">
        <Link icon="f7:edit" slot="right" onClick={() => f7router.navigate(`/edit-record/${encodeURIComponent(JSON.stringify(item))}`)} />
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
