import React from 'react';
import {
  Page,
  Navbar,
  List,
  ListItem,
  Badge,
  Button,
  Icon,
  Block,
} from 'framework7-react';

const users = [
  {
    id: 1,
    name: 'GJ23AW8800',
    date: '05/09/2024',
    time: 'EXPORT',
    status: 'Loaded',
    avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
  },
  {
    id: 2,
    name: 'Ryan Gosling',
    date: '05/04/2024',
    time: '19:54',
    status: 'Rejected',
    avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
  },
  {
    id: 3,
    name: 'Colin Farrell',
    date: '05/03/2024',
    time: '14:12',
    status: 'InProcess',
    avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
  },
];

const statusColors = {
  Loaded: 'green',
  InProcess: 'orange',
};

const UserList = () => (
  <Page>
    <Navbar title="Users" backLink="Back" />
    <List mediaList>
      {users.map((user) => (
        <ListItem
          key={user.id}
          title={user.name}
          after={<Badge color={statusColors[user.status]}>{user.status}</Badge>}
          text={`${user.date} - ${user.time}`}
          link="#"
        >
          <img slot="media" src={user.avatar} width="44" />
        </ListItem>
      ))}
    </List>
    <Block>
      <Button fill raised>
        <Icon f7="person_badge_plus" />
        Add users
      </Button>
    </Block>
  </Page>
);

export default UserList;
