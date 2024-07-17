import React from 'react';
import {
  Page,
  Navbar,
  List,
  ListItem,
  Badge,
  BlockTitle,
  Button,
  Icon,
  Block,
} from 'framework7-react';

const users = [
  {
    id: 1,
    name: '17-July | GJ23AW8800',
    status: 'In Process',
    detail: 'Stock Transfer',
    avatar: 'path_to_james_avatar_image',
    statusColor: 'gray',
  },
  {
    id: 2,
    name: '17-July | GJ23AW8800',
    status: 'Reported',
    detail: 'Export',
    avatar: 'path_to_sophia_avatar_image',
    statusColor: 'yellow',
    time: 'Loaded',
  },
  {
    id: 3,
    name: '17-July | GJ23AW8800',
    status: 'Loaded',
    detail: 'Domestic',
    avatar: 'path_to_sophia_avatar_image',
    statusColor: 'green',
    time: 'Loaded',
  },

];

const StatusTracker = () => (
  <Page>
    <Navbar title="Status Tracker" backLink="Back">
      <Button slot="right" small outline>
        See All
      </Button>
    </Navbar>
    <BlockTitle>Pending</BlockTitle>
    <List mediaList>
      {users
        .filter((user) => user.status === 'In Process' || user.status === 'Reported')
        .map((user) => (
          <ListItem
            key={user.id}
            title={user.name}
            text={user.detail}
            after={
              <Badge color={user.statusColor}>{user.status}</Badge>
            }
            link={`/orderdetails/${encodeURIComponent(JSON.stringify(user))}`}
          >
            <img slot="media" src={user.avatar} width="44" />
          </ListItem>
        ))}
    </List>
    <BlockTitle>Completed</BlockTitle>
    <List mediaList>
      {users
        .filter((user) => user.status === 'Loaded')
        .map((user) => (
          <ListItem
            key={user.id}
            title={user.name}
            text={user.detail}
            after={
              <Badge color={user.statusColor}>
                {user.time}
              </Badge>
            }
            link="#"
          >
            <img slot="media" src={user.avatar} width="44" />
          </ListItem>
        ))}
    </List>
  </Page>
);

export default StatusTracker;
