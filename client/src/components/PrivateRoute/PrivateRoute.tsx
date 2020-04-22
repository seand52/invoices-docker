import React from 'react';
import { connect } from 'react-redux';
import { InitialState } from 'store';
import { getUserState, isLoggedIn } from 'selectors/userSelectors';
import { UserState } from 'store/reducers/userReducer';
import LoginContainer from 'pages/Login/LoginContainer';

interface Props {
  user: UserState;
  component: any;
  path: string;
}
const PrivateRoute = ({ component: Component, user, path, ...rest }: Props) => {
  if (isLoggedIn()) {
    return <Component path={path} {...rest} />;
  }
  return <LoginContainer path='/login' {...rest} />;
};

const mapStateToProps = (state: InitialState) => {
  return {
    user: getUserState(state),
  };
};

export default connect(mapStateToProps)(PrivateRoute);
