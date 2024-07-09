import React from 'react';
import { Page,Block } from 'framework7-react';
import CustomListView from '../components/neworder';

const MyApp = () => {
  return (
    <Page>
      <Block>
      <CustomListView
          name="Bagus Fikri"
          email="bagusfikri@gmail.com"
          role="Admin (Owner)"
          lastLogin="Oct 13, 2023 07:31 PM"
          status="Reported"
          avatar="https://codegena.com/wp-content/uploads/2016/04/hyperlinks.jpg"
        />
        <CustomListView
          name="John Doe"
          email="john.doe@example.com"
          role="User"
          lastLogin="Jan 10, 2024 05:15 PM"
          status="Loaded"
          avatar="https://codegena.com/wp-content/uploads/2016/04/hyperlinks.jpg"
        />
        <CustomListView
          name="Jane Smith"
          email="jane.smith@example.com"
          role="Moderator"
          lastLogin="Feb 5, 2024 09:45 AM"
          status="In Process"
          avatar="https://codegena.com/wp-content/uploads/2016/04/hyperlinks.jpg"
        />
      </Block>
    </Page>
  );
};

export default MyApp;
