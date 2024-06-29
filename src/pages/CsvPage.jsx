import React, { useState, useEffect, useMemo } from 'react';
import {
  Page,
  Navbar,
  List,
  Link,
  ListItem,
  Searchbar,
  Preloader,
  Block,
  Button,
  Panel,
  View,
  ListInput,
  Subnavbar,
  NavRight
} from 'framework7-react';
import Papa from 'papaparse';

const csvurl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQt0HJ_mtSACZ88zpfjScQNNmzlqnvGJocVMIaC-MJ_hX4LCfd5VWrZRkPDI37e1VWuDszlw-789W6v/pub?gid=854843404&single=true&output=csv';

const CsvPage = ({ f7router }) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterPanelOpened, setFilterPanelOpened] = useState(false);
  const [filterProductCode, setFilterProductCode] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const localStorageKey = 'csvData';

  const fetchData = (refresh = false) => {
    if (!refresh) {
      const savedData = localStorage.getItem(localStorageKey);
      if (savedData) {
        setData(JSON.parse(savedData));
        setLoading(false);
        return;
      }
    }

    Papa.parse(csvurl, {
      download: true,
      header: true,
      complete: results => {
        setData(results.data);
        localStorage.setItem(localStorageKey, JSON.stringify(results.data));
        setLoading(false);
      },
      error: err => {
        setError(err.message);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePullToRefresh = done => {
    fetchData(true);
    done();
  };

  const uniqueValues = field => {
    const values = data.map(item => item[field]);
    return [...new Set(values)];
  };

  const productCodes = useMemo(() => uniqueValues('Product_Code'), [data]);
  const statuses = useMemo(() => uniqueValues('Status'), [data]);

  const filteredData = useMemo(() => {
    return data
      .filter(item =>
        Object.values(item).some(val =>
          val.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
      .filter(
        item =>
          (filterProductCode ? item.Product_Code === filterProductCode : true) &&
          (filterStatus ? item.Status === filterStatus : true)
      );
  }, [data, searchQuery, filterProductCode, filterStatus]);

  const columnsToDisplay = [
    'Pallet_No',
    'Location',
    'Balance',
    'Product_Code',
    'MFG_Date'
  ];

  const getItemStyle = status => {
    if (status === 'HOLD' || status === 'WIP') {
      return { backgroundColor: 'lightcoral' };
    }
    return {};
  };

  const handleItemClick = item => {
    f7router.navigate('/detail/', {
      params: { item }
    });
  };

  return (
    <Page ptr ptrMousewheel={true} onPtrRefresh={handlePullToRefresh}>
      <Panel
        right
        reveal
        visibleBreakpoint={960}
        opened={filterPanelOpened}
        onPanelClosed={() => setFilterPanelOpened(false)}
      >
        <View>
          <Page>
            <Navbar title="Filter" />
            <List>
              <ListInput
                label="Product Code"
                type="select"
                placeholder="Select Product Code"
                value={filterProductCode}
                onInput={e => setFilterProductCode(e.target.value)}
              >
                <option value="">All</option>
                {productCodes.map((code, index) => (
                  <option key={index} value={code}>
                    {code}
                  </option>
                ))}
              </ListInput>
              <ListInput
                label="Status"
                type="select"
                placeholder="Select Status"
                value={filterStatus}
                onInput={e => setFilterStatus(e.target.value)}
              >
                <option value="">All</option>
                {statuses.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </ListInput>
            </List>
            <Block>
              <Button fill onClick={() => setFilterPanelOpened(false)}>
                Apply Filters
              </Button>
            </Block>
          </Page>
        </View>
      </Panel>

      <Navbar title="CSV Data" backLink="Back">
        <NavRight>
          <Link iconF7="funnel" onClick={() => setFilterPanelOpened(true)} />
        </NavRight>
        <Subnavbar inner={false}>
          <Searchbar
            disableButton={false}
            onChange={e => setSearchQuery(e.target.value)}
            onSearchbarClear={() => setSearchQuery('')}
            value={searchQuery}
            placeholder="Search"
            noShadow
          />
        </Subnavbar>
      </Navbar>

      {loading ? (
        <Block className="text-align-center">
          <Preloader color="multi" />
        </Block>
      ) : error ? (
        <Block className="text-align-center">
          <p>Error: {error}</p>
        </Block>
      ) : (
        <List>
          {filteredData.map((item, index) => (
            <ListItem
            key={index}
            link="#"
            title={columnsToDisplay.map(col => item[col]).join(' • ')}
            style={getItemStyle(item.Status)}
            onClick={() => {
              f7router.navigate('/detail/', {
                params: {item: item,}
              });
            }}
          />
          ))}
        </List>
      )}
    </Page>
  );
};

export default CsvPage;
