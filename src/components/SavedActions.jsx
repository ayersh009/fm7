import React, { useState } from 'react';
import { Page, Navbar, List, ListItem, Button, Icon, f7 } from 'framework7-react';
import { Share } from '@capacitor/share';

const SavedActions = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = async () => {
    if (selectedImage) {
      await Share.share({
        title: 'Check this out!',
        text: 'Here is an image I want to share with you.',
        url: selectedImage,
        dialogTitle: 'Share with friends'
      });
    } else {
      f7.dialog.alert('Please select an image first.');
    }
  };

  return (
    <Page>
      <Navbar title="Share Image" />
      <List noHairlines>
        <ListItem
          title="Select Image"
          media={
            <Icon f7="photo_fill" style={{ fontSize: '24px', color: '#007aff' }} />
          }
          after={
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="fileInput"
            />
          }
          onClick={() => document.getElementById('fileInput').click()}
        />
      </List>
      {selectedImage && (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      )}
      <Button fill large  onClick={handleShare}>
        Share Image
      </Button>
    </Page>
  );
};

export default SavedActions;
