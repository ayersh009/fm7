import React from 'react';
import { Page, Navbar, Block } from 'framework7-react';
import ErrorImage from '../../resources/404.jpg'



const NotFoundPage = () => (



  <Page>
    <Navbar title="404 Not Found" backLink="Back" />
    <Block className="text-center" style={{ paddingTop: '20vh' }}>
      <img src={ErrorImage} alt="404 Not Found" style={{ maxWidth: '40%', marginBottom: '20px' }} />
      <p className="color-red" style={{ fontSize: '24px', fontWeight: 'bold' }}>Oops!</p>
      <p style={{ fontSize: '18px' }}>Sorry, the page you are looking for could not be found.</p>
      <p style={{ fontSize: '18px' }}>(import.meta.env.VITE_SUPABASE_URL)</p>
    </Block>
  </Page>
);

export default NotFoundPage;
