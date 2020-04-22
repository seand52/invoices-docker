import React from 'react';
import styles from './Layout.module.scss';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { navigate } from '@reach/router';
import Navbar from 'components/Navbar/Navbar';
import { logout } from 'store/actions/userActions';
import { connect } from 'react-redux';
import { getNavigationState } from 'selectors/navigationSelector';
import { NavigationState } from 'store/reducers/navigationReducer';

interface Props {
  main?: JSX.Element;
  logout: () => void;
  navigationState: NavigationState;
}
const Layout = ({ main, logout, navigationState }: Props) => {
  const userLogout = e => {
    e.preventDefault();
    logout();
  };
  return (
    <div className={styles.app_layout}>
      <div className={styles.navbar}>
        <Navbar navigationState={navigationState} userLogout={userLogout} />
      </div>
      <div className={styles.sidebar_left}>
        <List style={{ paddingTop: 0 }} component='nav'>
          <ListItem
            selected={navigationState.currentPage === 'clients'}
            onClick={() => navigate('/clients')}
            button
          >
            <ListItemText className={styles.list_item} primary='Clients' />
          </ListItem>
          <ListItem
            selected={navigationState.currentPage === 'products'}
            className={styles.list_item}
            onClick={() => navigate('/products')}
            button
          >
            <ListItemText primary='Products' />
          </ListItem>
          <ListItem
            selected={navigationState.currentPage === 'invoices'}
            className={styles.list_item}
            onClick={() => navigate('/invoices')}
            button
          >
            <ListItemText primary='Invoices' />
          </ListItem>
          <ListItem
            selected={navigationState.currentPage === 'salesOrders'}
            className={styles.list_item}
            onClick={() => navigate('/sales-orders')}
            button
          >
            <ListItemText primary='Sales Orders' />
          </ListItem>
        </List>
      </div>
      <div className={styles.sidebar_right}>{main}</div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    navigationState: getNavigationState(state),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
