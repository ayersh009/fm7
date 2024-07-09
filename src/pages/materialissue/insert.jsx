import React, { useState } from "react";
import {
  Page,
  Navbar,
  BlockTitle,
  List,
  ListInput,
  Button,
  Block,
  Card,
  CardContent,
  CardHeader,
  Link,
  Icon,
  Preloader
} from "framework7-react";
import { supabase } from "../../components/supabase";
import DetailPopup from "./DetailPopup";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

const InsertRecordPage = ({ f7router }) => {
  const [formData, setFormData] = useState({
    mrn_no: "",
    issue_date: "",
    requested_by: "",
    requirement_purpose: "",
    handover_to: "",
    issued_by: "",
    mrn_photo: "",
    details: [],
  });

  const [popupOpened, setPopupOpened] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [uploadUrl, setUploadUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveDetail = (detail) => {
    setFormData({ ...formData, details: [...formData.details, detail] });
  };

  const handleCapturePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      allowEditing: true,
      quality: 90,
    });
    const blob = await (await fetch(photo.dataUrl)).blob();
    const file = new File([blob], `captured_photo.${blob.type.split('/')[1]}`, { type: blob.type });
    setImage(photo.dataUrl);
    await handleUpload(file);
  };

  const handlePickImage = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      quality: 90,
    });
    const blob = await (await fetch(photo.dataUrl)).blob();
    const file = new File([blob], `picked_photo.${blob.type.split('/')[1]}`, { type: blob.type });
    setImage(photo.dataUrl);
    await handleUpload(file);
  };

  const handleUpload = async (file) => {
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `images/${fileName}`;

    let { error: uploadError } = await supabase.storage
      .from('ordermanager') // replace with your bucket name
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      //alert('Error uploading image');
      f7.toast
        .create({
          text: 'Error uploading image.',
          closeButton: true
        })
        .open();
      setUploading(false);
      return;
    }

    const { data: publicUrlData, error: urlError } = supabase.storage
      .from('ordermanager')
      .getPublicUrl(filePath);

    if (urlError) {
      console.error('Error getting public URL:', urlError);
      f7.toast
        .create({
          text: 'Error getting public URL:',
          closeButton: true
        })
        .open();
      setUploading(false);
      return;
    }

    setUploadUrl(publicUrlData.publicUrl);
    setFormData({ ...formData, mrn_photo: publicUrlData.publicUrl });
    setImageName(file.name);
    setUploading(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const {
      mrn_no,
      issue_date,
      requested_by,
      requirement_purpose,
      handover_to,
      issued_by,
      mrn_photo,
      details,
    } = formData;

    // Insert into MaterialIssueTracker
    const { data: masterData, error: masterError } = await supabase
      .from("MaterialIssueTracker")
      .insert([
        {
          mrn_no,
          issue_date,
          requested_by,
          requirement_purpose,
          handover_to,
          issued_by,
          mrn_photo,
        },
      ])
      .single();

    if (masterError) {
      console.error("Error inserting master record:", masterError);
      setIsSubmitting(false);
      return;
    }

    // Insert into materialissuedetails
    const detailRecords = details.map((detail) => ({ ...detail, mrn_no }));
    const { error: detailsError } = await supabase
      .from("materialissuedetails")
      .insert(detailRecords);

    if (detailsError) {
      console.error("Error inserting detail records:", detailsError);
      f7.toast
        .create({
          text: 'Error inserting detail records:"',
          closeButton: true
        })
        .open();
      setIsSubmitting(false);
      return;
    }

    // Redirect to ListView after successful insert
    f7router.navigate("/");
    setIsSubmitting(false);
  };

  return (
    <Page>
      <Navbar title="Insert Record" backLink="Back" />
      {/* <BlockTitle>Material Issue Tracker</BlockTitle> */}
      <Block strong outlineIos>
        <div className="grid grid-cols-2 grid-gap">
          <Button tonal onClick={handleCapturePhoto} disabled={uploading}>{uploading ? 'Uploading...' : 'Capture Photo'}</Button>
          <Button tonal onClick={handlePickImage} disabled={uploading}>{uploading ? 'Uploading...' : 'Pick Image'}</Button>
        </div>

      </Block>
      {image && (
        <Block>
          <img src={image} alt="Selected" style={{ width: '100%' }} />
          <p>Image Name: {imageName}</p>
        </Block>
      )}
      <List noHairlinesMd>
        <ListInput
          label="MRN Photo URL"
          type="text"
          name="mrn_photo"
          placeholder="Enter MRN Photo URL"
          value={formData.mrn_photo}
          readonly
          onInput={handleInputChange}
        />

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

      </List>



      <Card className="data-table data-table-init">
        <CardHeader>
          <div className="data-table-links">
            <a className="button" onClick={() => setPopupOpened(true)}>
              Add Products
            </a>
          </div>
        </CardHeader>
        <CardContent padding={false}>
          <table>
            <thead>
              <tr>
                <th className="label-cell">PRODUCT</th>
                <th className="numeric-cell">QTY</th>
                <th className="numeric-cell">UOM</th>
                <th className="numeric-cell">BATCH</th>
                <th className="numeric-cell">PALLET</th>
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
        <Button fill onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Block>

      <DetailPopup
        opened={popupOpened}
        onClose={() => setPopupOpened(false)}
        onSave={handleSaveDetail}
      />

      {isSubmitting && (
        <Block className="display-flex justify-content-center align-items-center" style={{ height: '100vh', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999, background: 'rgba(255, 255, 255, 0.8)' }}>
          <Preloader />
        </Block>
      )}
    </Page>
  );
};

export default InsertRecordPage;
