import React from 'react'
import { List, ListItem, Icon } from 'framework7-react'

const getStatusProperties = status => {
  switch (status) {
    case 'Loaded':
      return {
        icon: 'f7bolt_circle_fill',
        iconColor: '#E0F7EF',
        statusColor: 'green'
      }
    case 'In Process':
      return {
        icon: 'truck-loading',
        iconColor: '#FFF6E1',
        statusColor: 'orange'
      }
    case 'Reported':
      return {
        icon: 'box',
        iconColor: '#F0F0F0',
        statusColor: '#653FF7'
      }
    default:
      return {
        icon: 'question',
        iconColor: '#FFFFFF',
        statusColor: 'black'
      }
  }
}

const TrackingCard = ({ item, onPress }) => {
  const { icon, iconColor, statusColor } = getStatusProperties(item.status)

  return (
    <ListItem
      onClick={onPress}
      link='#'
      header={item.orderdate}
      title={item.vehicleno}
      footer={item.destination}
      after={item.status}
    >
      <Icon slot='media' f7={icon} color={iconColor} />
    </ListItem>
  )
}

export default TrackingCard
