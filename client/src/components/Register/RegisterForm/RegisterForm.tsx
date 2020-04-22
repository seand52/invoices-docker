import React from 'react';
import TextField from '@material-ui/core/TextField';

import ButtonWithSpinner from 'components/ButtonWithSpinner/ButtonWithSpinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { UserState } from 'store/reducers/userReducer';

import styles from './RegisterForm.module.scss';
import { Link } from '@reach/router';

interface Props {
  onSubmit: (data: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => void;
  register: any;
  handleSubmit: any;
  errors: any;
  user: UserState;
  apiError: null | string;
}

export default function RegisterForm({
  onSubmit,
  handleSubmit,
  errors,
  register,
  user,
  apiError,
}: Props) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_wrapper}>
      <h1>Register your account</h1>
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
      <TextField
        inputRef={register}
        error={errors['confirmPassword'] ? true : false}
        helperText={
          errors['confirmPassword'] ? errors['confirmPassword'].message : null
        }
        name='confirmPassword'
        label='Confirm Password'
        type='password'
        margin='normal'
        variant='outlined'
      />
      <ButtonWithSpinner
        loading={user.loading}
        success={user.isLoggedIn}
        type='submit'
        text='Register'
      />
      <Link className={styles.login_link} to='/login'>
        Log in
      </Link>
      {apiError && <ErrorMessage>{apiError}</ErrorMessage>}
    </form>
  );
}
