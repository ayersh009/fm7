import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
  Page,
  List,
  BlockTitle,
  Navbar,
  Preloader,
  SkeletonBlock,
  Block,
  SkeletonText,
  ListItem,
  f7
} from 'framework7-react'
import { supabase } from '../components/supabase'
import TrackingCard from '../components/trackingcard'
import InProcessCard from '../components/inprocesscard'
import './orderp.css' // Assuming you save your CSS in OrderPage.css

import store from '../js/store';

const OrderPage = ({ f7router }) => {
  const [trackingData, setTrackingData] = useState({
    inProcess: [],
    others: []
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDetails, setSelectedDetails] = useState(null)

  useEffect(() => {
    fetchTrackingData()
  }, [])

  const fetchTrackingData = useCallback(async () => {
    setIsRefreshing(true)
    const { data, error } = await supabase
      .from('ordermanager')
      .select('*')
      .order('orderdate', { ascending: false })

    if (error) {
      console.error('Error fetching data:', error)
    } else {
      const inProcess = data.filter(item => item.status === 'In Process')
      const others = data.filter(item => item.status !== 'In Process')

      setTrackingData({ inProcess, others })
    }
    setIsRefreshing(false)
    setIsLoading(false)
  }, [])

  const onRefresh = useCallback(
    done => {
      fetchTrackingData().then(done)
    },
    [fetchTrackingData]
  )

  const onItemPress = item => {
    const encodedItem = encodeURIComponent(JSON.stringify(item));
    f7.views.main.router.navigate(`/orderdetails/`, {
      params: { item: encodedItem },
    });
  };
  

  const renderItem = useCallback(
    item => {
      const CardComponent =
        item.status === 'In Process' ? InProcessCard : TrackingCard
      return (
        <CardComponent
          key={item.memeID}
          item={item}
          onPress={() => onItemPress(item)}
        />
      )
    },
    [onItemPress]
  )

  const renderSection = useCallback(
    (title, data) => (
      <>
        <BlockTitle>
          {data.length === 0 && title === 'In Process'
            ? 'No In Process Records'
            : title}
        </BlockTitle>
        <List className='no-markers'>{data.map(item => renderItem(item))}</List>
      </>
    ),
    [renderItem]
  )

  return (
    <Page ptr ptrMousewheel={true} onPtrRefresh={onRefresh}>
      <Navbar title='Orders' backLink='Back' />
      {isLoading ? (
        <Block>
          <List
            strongIos
            outlineIos
            dividersIos
            mediaList
            className='skeleton-text'
          >
            <ListItem
              title='Title'
              subtitle='Subtitle'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum.'
            >
              <SkeletonBlock
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                slot='media'
              />
            </ListItem>
            <ListItem
              title='Title'
              subtitle='Subtitle'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum.'
            >
              <SkeletonBlock
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                slot='media'
              />
            </ListItem>
          </List>
        </Block>
      ) : (
        <>
          {renderSection('In Process', trackingData.inProcess)}
          {renderSection('Others', trackingData.others)}
        </>
      )}
    </Page>
  )
}

export default OrderPage
