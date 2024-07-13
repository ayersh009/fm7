import React, { useState, useEffect } from 'react'
import {
  Page,
  Navbar,
  List,
  ListItem,
  Block,
  Button,
  Fab,
  Icon,
  Preloader,
  Segmented,
  Button as F7Button,
  Subnavbar,
  f7
} from 'framework7-react'
import { supabase } from '../../components/supabase'

const ListView = ({ f7router }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [days, setDays] = useState(7) // Default to last 7 days

  const fetchData = async (days) => {
    const today = new Date();
    const lastNDays = new Date(today);
    lastNDays.setDate(today.getDate() - days);

    setLoading(true)
    const { data, error } = await supabase
      .from('MaterialIssueTracker')
      .select('*')
      .gte('issue_date', lastNDays.toISOString())
      .order('created_at', { ascending: false })
    setLoading(false)

    if (error) {
      f7.dialog.alert(`Error fetching data: ${error.message}`, 'Error')
    } else {
      setItems(data)
    }
  }

  useEffect(() => {
    fetchData(days)
  }, [days])

  const refreshData = done => {
    fetchData(days).then(() => done())
  }

  return (
    <Page ptr onPtrRefresh={refreshData}>
      <Navbar title='Material Issue List' backLink='Back' >
        <Subnavbar inner={false}>
          <Segmented raised tag="p" className="margin">
            <F7Button active={days === 7} onClick={() => setDays(7)}>Last 7 Days</F7Button>
            <F7Button active={days === 15} onClick={() => setDays(15)}>Last 15 Days</F7Button>
            <F7Button active={days === 30} onClick={() => setDays(30)}>Last 30 Days</F7Button>
          </Segmented></Subnavbar>
      </Navbar>
      <Fab
        position='right-bottom'
        slot='fixed'
        text='Create'
        onClick={() => f7router.navigate('/materialissueinsert/')}
      >
        <Icon ios='f7:plus' md='material:add' />
      </Fab>

      {loading ? (
        <Block className='text-align-center'>
          <Preloader />
        </Block>
      ) : (
        <List dividersIos mediaList outlineIos strongIos>
          {items.map((item, index) => (
            <ListItem
              key={index}
              link={`/materialissuesinglerecord/${encodeURIComponent(
                JSON.stringify(item)
              )}`}
              title={`${item.issue_date}`}
              after={`MRN-${item.mrn_no}`}
              subtitle={`Purpose # ${item.requirement_purpose}`}
              text={`Requested by # ${item.requested_by} • Handover to # ${item.handover_to}`}
            >
              <img
                slot='media'
                style={{ borderRadius: '8px' }}
                src={item.mrn_photo}
                width='80'
                height='80'
              />
            </ListItem>
          ))}
        </List>
      )}
    </Page>
  )
}

export default ListView
