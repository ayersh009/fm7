import React from 'react'
import { Page, Navbar, Block, BlockTitle } from 'framework7-react'
import SavedActions from '../components/SavedActions'

const AboutPage = () => (
  <Page>
    <Navbar title='About' backLink='Back' />
    <BlockTitle>About My App</BlockTitle>
    <Block>
      <SavedActions />
    </Block>
  </Page>
)

export default AboutPage
