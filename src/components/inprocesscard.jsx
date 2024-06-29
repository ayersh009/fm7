import React from 'react';
import { Block, Icon } from 'framework7-react';

const InProcessCard = ({ item }) => {
  return (
    <Block className="card" style={styles.card}>
      <Block className="header" style={styles.header}>
        <Block className="trackingNumber" style={styles.trackingNumber}>{item.vehicleno}</Block>
        <Block className="status" style={styles.status}>• {item.status}</Block>
      </Block>
      <Block className="subHeader" style={styles.subHeader}>{item.destination}</Block>
      <Block className="timelineContainer" style={styles.timelineContainer}>
        <svg height="20" width="100%">
          <line x1="10%" y1="10" x2="40%" y2="10" stroke="orange" strokeWidth="2" />
          <line x1="40%" y1="10" x2="90%" y2="10" stroke="lightgray" strokeWidth="2" />
          <circle cx="10%" cy="10" r="5" fill="orange" />
          <circle cx="40%" cy="10" r="5" fill="orange" />
          <circle cx="65%" cy="10" r="5" fill="lightgray" />
          <circle cx="90%" cy="10" r="5" fill="lightgray" />
        </svg>
        <Icon material="forklift" size="24px" color="orange" style={styles.icon} />
      </Block>
      <Block className="dateContainer" style={styles.dateContainer}>
        <Block className="dateText" style={styles.dateText}>{item.orderdate}</Block>
        <Block className="dateText" style={styles.dateText}>{item.loadingdate}</Block>
      </Block>
      <Block className="locationContainer" style={styles.locationContainer}>
        <Block className="locationText" style={styles.locationText}>Order Date</Block>
        <Block className="locationText" style={styles.locationText}>Loading Date</Block>
      </Block>
    </Block>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginTop: '8px',
    marginBottom: '8px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackingNumber: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  status: {
    color: 'orange',
    fontWeight: 'bold',
  },
  subHeader: {
    color: 'gray',
    marginBottom: '15px',
  },
  timelineContainer: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: '15px',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: '45%',
    top: '-16px',
  },
  dateContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  dateText: {
    color: 'gray',
  },
  locationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  locationText: {
    fontWeight: 'bold',
  },
};

export default InProcessCard;
