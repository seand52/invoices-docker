import React from 'react';
import { connect } from 'react-redux';
import { InitialState } from 'store';
import { getUserState, isLoggedIn } from 'selectors/userSelectors';
import { UserState } from 'store/reducers/userReducer';
import Clients from 'pages/Clients/Clients';

interface Props {
  user: UserState;
  component: any;
  path: string;
}
const PublicRoute = ({ component: Component, user, path, ...rest }: Props) => {
  if (isLoggedIn()) {
    return <Clients path='/clients' {...rest} />;
  }
  return <Component path={path} {...rest} />;
};

const mapStateToProps = (state: InitialState) => {
  return {
    user: getUserState(state),
  };
};

export default connect(mapStateToProps)(PublicRoute);
