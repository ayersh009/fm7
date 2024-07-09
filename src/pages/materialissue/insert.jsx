// InsertRecordPage.jsx
import React, { useState } from 'react';
import {
  Page, Navbar, BlockTitle, List, ListInput, Button, Block, Popup, Card,
  CardContent,
  CardHeader,
  BlockHeader,
  Checkbox, Link, Icon,
} from 'framework7-react';
import { supabase } from '../../components/supabase';
import DetailPopup from './DetailPopup';

const InsertRecordPage = ({ f7router }) => {
  const [formData, setFormData] = useState({
    mrn_no: '',
    issue_date: '',
    requested_by: '',
    requirement_purpose: '',
    handover_to: '',
    issued_by: '',
    mrn_photo: '',
    details: []
  });

  const [popupOpened, setPopupOpened] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveDetail = (detail) => {
    setFormData({ ...formData, details: [...formData.details, detail] });
  };

  const handleSubmit = async () => {
    const { mrn_no, issue_date, requested_by, requirement_purpose, handover_to, issued_by, mrn_photo, details } = formData;

    // Insert into MaterialIssueTracker
    const { data: masterData, error: masterError } = await supabase
      .from('MaterialIssueTracker')
      .insert([{ mrn_no, issue_date, requested_by, requirement_purpose, handover_to, issued_by, mrn_photo }])
      .single();

    if (masterError) {
      console.error('Error inserting master record:', masterError);
      return;
    }

    // Insert into materialissuedetails
    const detailRecords = details.map(detail => ({ ...detail, mrn_no }));
    const { error: detailsError } = await supabase
      .from('materialissuedetails')
      .insert(detailRecords);

    if (detailsError) {
      console.error('Error inserting detail records:', detailsError);
      return;
    }

    // Redirect to ListView after successful insert
    f7router.navigate('/');
  };

  return (
    <Page>
      <Navbar title="Insert Record" backLink="Back" />
      <BlockTitle>Material Issue Tracker</BlockTitle>
      <List noHairlinesMd>
        <ListInput
          label="MRN No"
          type="text"
          name="mrn_no"
          placeholder="Enter MRN No"
          value={formData.mrn_no}
          onInput={handleInputChange}
        />
        <ListInput
          label="Issue Date"
          type="date"
          name="issue_date"
          placeholder="Enter Issue Date"
          value={formData.issue_date}
          onInput={handleInputChange}
        />
        <ListInput
          label="Requested By"
          type="text"
          name="requested_by"
          placeholder="Enter Requested By"
          value={formData.requested_by}
          onInput={handleInputChange}
        />
        <ListInput
          label="Requirement Purpose"
          type="text"
          name="requirement_purpose"
          placeholder="Enter Requirement Purpose"
          value={formData.requirement_purpose}
          onInput={handleInputChange}
        />
        <ListInput
          label="Handover To"
          type="text"
          name="handover_to"
          placeholder="Enter Handover To"
          value={formData.handover_to}
          onInput={handleInputChange}
        />
        <ListInput
          label="Issued By"
          type="text"
          name="issued_by"
          placeholder="Enter Issued By"
          value={formData.issued_by}
          onInput={handleInputChange}
        />
        <ListInput
          label="MRN Photo URL"
          type="text"
          name="mrn_photo"
          placeholder="Enter MRN Photo URL"
          value={formData.mrn_photo}
          onInput={handleInputChange}
        />
      </List>
      


      <Card className="data-table data-table-init">
        <CardHeader>
          <div className="data-table-links">
            <a className="button" onClick={() => setPopupOpened(true)}>Add Products</a>

          </div>
          {/* <div className="data-table-actions">
            <Link iconIos="f7:line_horizontal_3_decrease" iconMd="material:sort" />
            <Link iconIos="f7:ellipsis_vertical_circle" iconMd="material:more_vert" />
          </div> */}
        </CardHeader>
        <CardContent padding={false}>
          <table>
            <thead>

              <tr >

                <th className="label-cell">PRODUCT</th>
                <th className="numeric-cell">QTY</th>
                <th className="numeric-cell">UOM</th>
               
                <th className="numeric-cell">BATCH</th>
                <th className="numeric-cell">PALLET</th>
                <th className="medium-only">
                  <Icon ios="f7:chat_bubble_text_fill" md="material:message" /> Comments
                </th>
                <th></th>
              </tr>

            </thead>
            <tbody>
              {formData.details.map((detail, index) => (
                <tr key={index}>

                  <td className="label-cell">{detail.product}</td>
                  <td className="numeric-cell">{detail.qty}</td>
                  <td className="numeric-cell">{detail.uom}</td>
                  
                  <td className="numeric-cell">{detail.batch}</td>
                  <td className="numeric-cell">{detail.pallet}</td>
                  <td className="medium-only">I like frozen yogurt</td>
                  <td className="actions-cell">
                   
                    <Link iconIos="f7:trash" iconMd="material:delete" />
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </CardContent>
      </Card>




      <Block>
        <Button fill onClick={handleSubmit}>Submit</Button>
      </Block>
      <DetailPopup
        opened={popupOpened}
        onClose={() => setPopupOpened(false)}
        onSave={handleSaveDetail}
      />
    </Page>
  );
};

export default InsertRecordPage;
