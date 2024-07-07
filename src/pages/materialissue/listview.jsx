import React, { useState, useEffect } from 'react';
import { Page, Navbar, List, ListItem,Block,Button,Fab, FabButton, FabButtons, Icon } from 'framework7-react';
import { supabase } from '../../components/supabase';

const ListView = ({ f7router }) => {
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const { data, error } = await supabase
          .from('MaterialIssueTracker')
          .select('*');
  
        if (error) {
          console.error('Error fetching data: ', error);
        } else {
          setItems(data);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <Page>
        <Navbar title="Material Issue Tracker" backLink="Back" />

       {/*  <Block>
        <Button fill onClick={() => f7router.navigate('/insertissue/')}>Insert New Record</Button>
      </Block> */}

      <Fab position="right-bottom" slot="fixed" text="Create" onClick={() => f7router.navigate('/insertissue/')}>
      <Icon ios="f7:plus" md="material:add" />
    </Fab>

        <List mediaList>
          {items.map((item, index) => (
            <ListItem
              key={index}
              title={`${item.issue_date} • ${item.mrn_no}`}
              after=""
              subtitle={`${item.requested_by} • ${item.requirement_purpose} • ${item.issued_by}`}
              text=""
              link={`/materialissuesingle/${item.mrn_no}`}
              //onClick={() => f7router.navigate(`/materialissuesingle/${item.mrn_no}`)}
            >
              <img slot="media" src={item.mrn_photo} width="40" />
            </ListItem>
          ))}
        </List>
      </Page>
    );
  };
  
  export default ListView;
