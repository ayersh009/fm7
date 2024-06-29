import React from 'react'
import { Page, Navbar, Block, BlockTitle } from 'framework7-react'

const ComingSoonPage = () => (
  <Page>
    <Navbar title='Coming Soon' backLink='Back' />
    <BlockTitle>Stay Tuned!</BlockTitle>
    <Block>
      <p>We're working hard to bring you an amazing experience. Our new feature/app will be launching soon. Stay tuned for updates!</p>
      <p>Sign up for our newsletter to be the first to know when we launch.</p>
      <p>In the meantime, follow us on social media for sneak peeks and updates:</p>
      <ul>
        <li><a href="https://facebook.com">Facebook</a></li>
        <li><a href="https://twitter.com">Twitter</a></li>
        <li><a href="https://instagram.com">Instagram</a></li>
      </ul>
    </Block>
  </Page>
)

export default ComingSoonPage
