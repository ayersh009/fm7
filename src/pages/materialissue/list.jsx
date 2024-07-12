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
  Preloader
} from 'framework7-react'
import { supabase } from '../../components/supabase'

const ListView = ({ f7router }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('MaterialIssueTracker')
      .select('*')
      .order('created_at', { ascending: false })
    setLoading(false)

    if (error) {
      console.error('Error fetching data: ', error)
    } else {
      setItems(data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refreshData = done => {
    fetchData().then(() => done())
  }

  return (
    <Page ptr onPtrRefresh={refreshData}>
      <Navbar title='Material Issue Tracker' backLink='Back' />

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
