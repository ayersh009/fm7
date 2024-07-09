import React, { useState, useEffect } from 'react';
import { Page, Navbar, List, ListItem, Block, Button, Fab, Icon, Preloader } from 'framework7-react';
import { supabase } from '../../components/supabase';

const ListView = ({ f7router }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('MaterialIssueTracker')
      .select('*');
    setLoading(false);

    if (error) {
      console.error('Error fetching data: ', error);
    } else {
      setItems(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = (done) => {
    fetchData().then(() => done());
  };

  return (
    <Page ptr onPtrRefresh={refreshData}>
      <Navbar title="Material Issue Tracker" backLink="Back" />

      <Fab position="right-bottom" slot="fixed" text="Create" onClick={() => f7router.navigate('/materialissueinsert/')}>
        <Icon ios="f7:plus" md="material:add" />
      </Fab>

      {loading ? (
        <Block className="text-align-center">
          <Preloader />
        </Block>
      ) : (
        <List mediaList>
          {items.map((item, index) => (
            <ListItem
              key={index}
              title={`${item.issue_date} • ${item.mrn_no}`}
              after=""
              subtitle={`${item.requested_by} • ${item.requirement_purpose} • ${item.issued_by}`}
              text=""
              link={`/materialissuesinglerecord/${encodeURIComponent(JSON.stringify(item))}`}
            >
              <img slot="media" src={item.mrn_photo} width="40" />
            </ListItem>
          ))}
        </List>
      )}
    </Page>
  );
};

export default ListView;
