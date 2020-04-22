import React from 'react';
import styles from './Navbar.module.scss';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from '@reach/router';
import { NavigationState } from 'store/reducers/navigationReducer';

interface Props {
  userLogout: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  navigationState: NavigationState;
}
export default function Navbar({ userLogout, navigationState }: Props) {
  return (
    <ul className={styles.navbar}>
      <li>
        <Link to='/clients'>INVOICES APP</Link>
      </li>
      <li
        className={
          navigationState.currentPage === 'business-info'
            ? styles.icon_underlined
            : ''
        }
      >
        <Link to='/business-info'>
          <PersonIcon fontSize='large' />
        </Link>
      </li>
      <li>
        <a href='#' onClick={userLogout}>
          Logout
        </a>{' '}
      </li>
    </ul>
  );
}
