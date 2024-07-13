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
    name: 'James Brown',
    status: 'Absent',
    detail: 'Replaced by Ravi Patel',
    avatar: 'path_to_james_avatar_image',
    statusColor: 'gray',
  },
  {
    id: 2,
    name: 'Sophia Williams',
    status: 'Away',
    detail: 'Synergy',
    avatar: 'path_to_sophia_avatar_image',
    statusColor: 'yellow',
    time: '25m',
  },
  {
    id: 3,
    name: 'Arthur Taylor',
    status: 'Away',
    detail: 'Apex',
    avatar: 'path_to_arthur_avatar_image',
    statusColor: 'yellow',
    time: '12m',
  },
  {
    id: 4,
    name: 'Emma Wright',
    status: 'Away',
    detail: 'Pulse',
    avatar: 'path_to_emma_avatar_image',
    statusColor: 'yellow',
    time: '8m',
  },
];

const StatusTracker = () => (
  <Page>
    <Navbar title="Status Tracker">
      <Button slot="right" small outline>
        See All
      </Button>
    </Navbar>
    <BlockTitle>Absent</BlockTitle>
    <List mediaList>
      {users
        .filter((user) => user.status === 'Absent')
        .map((user) => (
          <ListItem
            key={user.id}
            title={user.name}
            text={user.detail}
            after={
              <Badge color={user.statusColor}>{user.status}</Badge>
            }
            link="#"
          >
            <img slot="media" src={user.avatar} width="44" />
          </ListItem>
        ))}
    </List>
    <BlockTitle>Away</BlockTitle>
    <List mediaList>
      {users
        .filter((user) => user.status === 'Away')
        .map((user) => (
          <ListItem
            key={user.id}
            title={user.name}
            text={user.detail}
            after={
              <Badge color={user.statusColor}>
                <Icon f7="time" /> {user.time}
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
