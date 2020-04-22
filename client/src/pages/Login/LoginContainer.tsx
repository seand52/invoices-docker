import React from 'react';

import useFormBuilder from 'hooks/useFormBuilder';

import LoginForm from 'components/Login/LoginForm/LoginForm';
import { ILoginFields } from 'forms/formValidations/authentication';

import styles from './LoginContainer.module.scss';
import { login } from 'store/actions/userActions';
import { connect } from 'react-redux';
import { getUserState } from 'selectors/userSelectors';
import { UserState } from 'store/reducers/userReducer';
import { navigate } from '@reach/router';

interface Props {
  path: string;
  login: (data: ILoginFields) => void;
  user: UserState;
}
const LoginContainer = ({ path, login, user }: Props) => {
  const { register, handleSubmit, errors } = useFormBuilder({
    key: 'loginValidationFields',
  });

  const onSubmit = (data: ILoginFields) => {
    login(data);
  };

  if (user.token) {
    navigate('/clients');
  }

  return (
    <div className={styles.form_wrapper}>
      <LoginForm
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        user={user}
        apiError={user.error}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: getUserState(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (data: ILoginFields) => dispatch(login(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
