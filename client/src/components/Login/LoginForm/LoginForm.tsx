import React from 'react';
import TextField from '@material-ui/core/TextField';
import ButtonWithSpinner from 'components/ButtonWithSpinner/ButtonWithSpinner';

import styles from './LoginForm.module.scss';
import { UserState } from 'store/reducers/userReducer';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { Link } from '@reach/router';

interface Props {
  onSubmit: (data: { username: string; password: string }) => void;
  register: any;
  handleSubmit: any;
  errors: any;
  user: UserState;
  apiError: null | string;
}

export default function LoginForm({
  onSubmit,
  handleSubmit,
  errors,
  register,
  user,
  apiError,
}: Props) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_wrapper}>
      <h1>Log in to your account</h1>
      <TextField
        error={errors['username'] ? true : false}
        helperText={errors['username'] ? errors['username'].message : null}
        inputRef={register}
        name='username'
        label='username'
        margin='normal'
        variant='outlined'
      />
      <TextField
        inputRef={register}
        error={errors['password'] ? true : false}
        helperText={errors['password'] ? errors['password'].message : null}
        name='password'
        label='Password'
        type='password'
        margin='normal'
        variant='outlined'
      />
      <ButtonWithSpinner
        loading={user.loading}
        success={user.isLoggedIn}
        type='submit'
        text='Log in'
      />
      <Link className={styles.register_link} to='/register'>
        Sign up
      </Link>
      {apiError && <ErrorMessage>{apiError}</ErrorMessage>}
    </form>
  );
}
