import React from 'react';
import { Link } from 'react-router-dom';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from 'shards-react';
import { UserContext ,AuthContext} from '../../../../authentication';

export default function UserActions() {
  const { signOut, } = React.useContext(AuthContext);
  const { user } = React.useContext(UserContext);


  const [visible, setVisible] = React.useState(false);

  const toggleUserActions = () => {
    setVisible(!visible);
  };

  return (
    <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
      <DropdownToggle caret tag={NavLink} className='text-nowrap px-3'>
        <img
          className='user-avatar rounded-circle mr-2'
          src={
            'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
          }
          alt='Icon'
        />
        <span className='d-none d-md-inline-block'>{user && user.name}</span>
      </DropdownToggle>
      <Collapse tag={DropdownMenu} right small open={visible}>
        <DropdownItem tag={Link} to='userProfile'>
          <i className='material-icons'>&#xE7FD;</i> Profile
        </DropdownItem>

        <DropdownItem divider />
        <DropdownItem
          tag={Link}
          to='/'
          className='text-danger'
          onClick={() => signOut()}
        >
          <i className='material-icons text-danger'>&#xE879;</i> Logout
        </DropdownItem>
      </Collapse>
    </NavItem>
  );
}
