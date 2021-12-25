import React from 'react';
import { Nav } from 'shards-react';

import Notifications from './Notifications';
import UserActions from './UserActions';

const NavBar = () => (
  <Nav navbar className="border-left flex-row">
    {/* <Notifications /> */}
    <UserActions />
  </Nav>
);

export default NavBar;
