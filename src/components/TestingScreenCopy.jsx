import React from 'react';
import { Block, Icon, PageContent,} from 'framework7-react';

const TrackingDetails = ({ details }) => {
  return (
    <PageContent>
      <Block className="container" style={styles.container}>
        <Block className="header" style={styles.header}>
          <Block className="headerText" style={styles.headerText}>
            Order Details
          </Block>
          <Icon
            f7="multiply"
            size="24px"
            color="#000"
            style={styles.closeIcon}
          />
        </Block>
        <Block className="infoContainer" style={styles.infoContainer}>
          <div className="row" style={styles.row}>
            <Icon f7="truck" size="24px" color="#000" />
            <span className="title" style={styles.title}>
              {details.vehicleno}
            </span>
          </div>
          <span className="trackingId" style={styles.trackingId}>
            {details.transport}
          </span>
        </Block>
        <Block className="detailsContainer" style={styles.detailsContainer}>
          <div className="detailRow" style={styles.detailRow}>
            <span className="label" style={styles.label}>
              Destination:
            </span>
            <span className="value" style={styles.value}>
              {details.destination}
            </span>
          </div>
          <div className="detailRow" style={styles.detailRow}>
            <span className="label" style={styles.label}>
              Order Date:
            </span>
            <span className="value" style={styles.value}>
              {details.orderdate}
            </span>
          </div>
          <div className="detailRow" style={styles.detailRow}>
            <span className="label" style={styles.label}>
              Loading Date:
            </span>
            <span className="value" style={styles.value}>
              {details.loadingdate}
            </span>
          </div>
          <div className="detailRow" style={styles.detailRow}>
            <span className="label" style={styles.label}>
              Driver Name:
            </span>
            <span className="value" style={styles.value}>
              {details.driver}
            </span>
          </div>
          <div className="detailRow" style={styles.detailRow}>
            <span className="label" style={styles.label}>
              Contact:
            </span>
            <span className="value" style={styles.value}>
              {details.contact}
            </span>
          </div>
          <div className="statusContainer" style={styles.statusContainer}>
            <span className="statusLabel" style={styles.statusLabel}>
              Status:
            </span>
            <span className="statusValue" style={styles.statusValue}>
              {details.status}
            </span>
          </div>
        </Block>
        <div className="scrollContainer" style={styles.scrollContainer}>
          <div className="timelineItem" style={styles.timelineItem}>
            <span className="dot" style={styles.dot} />
            <div>
              <span className="timelineText" style={styles.timelineText}>
                Qty # {details.qty1}
              </span>
              <span className="timelineSubText" style={styles.timelineSubText}>
                {details.product1}
              </span>
            </div>
          </div>
          <div className="timelineItem" style={styles.timelineItem}>
            <span className="dot" style={styles.dot} />
            <div>
              <span className="timelineText" style={styles.timelineText}>
                Qty # {details.qty2}
              </span>
              <span className="timelineSubText" style={styles.timelineSubText}>
                {details.product2}
              </span>
            </div>
          </div>
          <div className="timelineItem" style={styles.timelineItem}>
            <span className="dot" style={styles.dot} />
            <div>
              <span className="timelineText" style={styles.timelineText}>
                Qty # {details.qty3}
              </span>
              <span className="timelineSubText" style={styles.timelineSubText}>
                {details.product3}
              </span>
            </div>
          </div>
          <div className="timelineItem" style={styles.timelineItem}>
            <span className="dot" style={styles.dot} />
            <div>
              <span className="timelineText" style={styles.timelineText}>
                Qty # {details.qty4}
              </span>
              <span className="timelineSubText" style={styles.timelineSubText}>
                {details.product4}
              </span>
            </div>
          </div>
          <div className="timelineItem" style={styles.timelineItem}>
            <span className="dot" style={styles.dot} />
            <div>
              <span className="timelineText" style={styles.timelineText}>
                Qty # {details.qty5}
              </span>
              <span className="timelineSubText" style={styles.timelineSubText}>
                {details.product5}
              </span>
            </div>
          </div>
          <div className="timelineItem" style={styles.timelineItem}>
            <span className="dotInactive" style={styles.dotInactive} />
            <div>
              <span
                className="timelineTextInactive"
                style={styles.timelineTextInactive}
              >
                Total Qty # {details.totalqty}
              </span>
            </div>
          </div>
        </div>
      </Block>
    </PageContent>
  );
};

const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#f0f0f0',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  headerText: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  closeIcon: {
    marginLeft: 'auto',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '8px',
  },
  title: {
    marginLeft: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  trackingId: {
    color: '#666',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  detailRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  label: {
    color: '#666',
  },
  value: {
    fontWeight: 'bold',
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '8px',
  },
  statusLabel: {
    color: '#666',
    marginRight: '8px',
  },
  statusValue: {
    color: '#5cb85c',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  timelineItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '6px',
    backgroundColor: '#5cb85c',
    marginRight: '16px',
    marginTop: '6px',
  },
  dotInactive: {
    width: '12px',
    height: '12px',
    borderRadius: '6px',
    backgroundColor: 'blue',
    marginRight: '16px',
    marginTop: '6px',
  },
  timelineText: {
    fontWeight: 'bold',
  },
  timelineTextInactive: {
    fontWeight: 'bold',
    color: 'blue',
  },
  timelineSubText: {
    color: '#666',
  },
};

export default TrackingDetails;
