import React, { useEffect, useState } from 'react';
import { Page, Navbar, BlockTitle, List, ListItem, Link, f7 } from 'framework7-react';
import DetailsDataTable from '../../components/DetailsDataTable';
import { supabase } from '../../components/supabase';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';

const SingleRecordPage = ({ f7route, f7router }) => {
  const item = JSON.parse(decodeURIComponent(f7route.params.item));
  const [details, setDetails] = useState([]);
  const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      const { data, error } = await supabase
        .from('materialissuedetails')
        .select('*')
        .eq('mrn_no', item.mrn_no);

      if (error) {
        console.error('Error fetching details:', error);
      } else {
        setDetails(data);
      }
    };

    const fetchImageAsFile = async () => {
      try {
        const response = await fetch(item.mrn_photo);
        const blob = await response.blob();

        const base64Data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(',')[1]); // Get base64 string without prefix
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });

        const fileName = `mrn_photo_${item.mrn_no}.jpg`;

        const result = await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Cache, // Use cache directory
        });

        setImagePath(result.uri);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchDetails();
    fetchImageAsFile();
  }, [item.mrn_no, item.mrn_photo]);

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

  const shareRecord = async () => {
    const detailsText = details.map(detail => 
      `Item: ${detail.product}, Quantity: ${detail.qty}, Unit: ${detail.uom}`).join('\n');

    const shareText = `
      MRN No: ${item.mrn_no}
      Issue Date: ${item.issue_date}
      Requested By: ${item.requested_by}
      Requirement Purpose: ${item.requirement_purpose}
      Handover To: ${item.handover_to}
      Issued By: ${item.issued_by}
      Details:
      ${detailsText}
    `;

    try {
      await Share.share({
        title: 'Record Details',
        text: shareText,
        dialogTitle: 'Share Record',
        files: [imagePath]
      });
    } catch (error) {
      console.error('Error sharing record:', error);
      f7.dialog.alert('Failed to share record');
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
        <Link
          iconMd="f7:arrow_turn_up_right"
          slot="right"
          onClick={shareRecord}
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
