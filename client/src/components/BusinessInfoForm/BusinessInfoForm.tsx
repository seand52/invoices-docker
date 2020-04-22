import React from 'react';
import { UserState } from 'store/reducers/userReducer';
import styles from './BusinessInfoForm.module.scss';
import { TextField } from '@material-ui/core';
import ButtonWithSpinner from 'components/ButtonWithSpinner/ButtonWithSpinner';
import { Link } from '@reach/router';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { IBusinessInfo } from 'forms/formValidations/business-info';

interface Props {
  onSubmit: (data: IBusinessInfo) => void;
  register: any;
  handleSubmit: any;
  errors: any;
  user: UserState;
  apiError: null | string;
  showSkipStep: boolean;
  parentStyles?: any;
}

const hasBusinessInfo = businessInfo => !!Object.keys(businessInfo).length;

export default function BusinessInfoForm(props: Props) {
  const { businessInfo } = props.user;
  return (
    <React.Fragment>
      <form
        onSubmit={props.handleSubmit(props.onSubmit)}
        className={`${styles.form_wrapper} ${props.parentStyles}`}
      >
        <h1>Please fill in your business details</h1>
        <div className={styles.form_items}>
          <TextField
            error={props.errors['name'] ? true : false}
            helperText={
              props.errors['name'] ? props.errors['name'].message : null
            }
            defaultValue={businessInfo && businessInfo.name}
            inputRef={props.register}
            name='name'
            label='Business name'
            margin='normal'
            variant='outlined'
          />
          <TextField
            inputRef={props.register}
            error={props.errors['cif'] ? true : false}
            helperText={
              props.errors['cif'] ? props.errors['cif'].message : null
            }
            defaultValue={businessInfo && businessInfo.cif}
            name='cif'
            label='CIF'
            margin='normal'
            variant='outlined'
          />
          <TextField
            inputRef={props.register}
            error={props.errors['address'] ? true : false}
            helperText={
              props.errors['address'] ? props.errors['address'].message : null
            }
            defaultValue={businessInfo && businessInfo.address}
            name='address'
            label='Address'
            margin='normal'
            variant='outlined'
          />
          <TextField
            inputRef={props.register}
            error={props.errors['postcode'] ? true : false}
            helperText={
              props.errors['postcode'] ? props.errors['postcode'].message : null
            }
            defaultValue={businessInfo && businessInfo.postcode}
            name='postcode'
            label='Post Code'
            margin='normal'
            variant='outlined'
          />
          <TextField
            inputRef={props.register}
            error={props.errors['city'] ? true : false}
            helperText={
              props.errors['city'] ? props.errors['city'].message : null
            }
            defaultValue={businessInfo && businessInfo.city}
            name='city'
            label='City'
            margin='normal'
            variant='outlined'
          />
          <TextField
            inputRef={props.register}
            error={props.errors['country'] ? true : false}
            helperText={
              props.errors['country'] ? props.errors['country'].message : null
            }
            defaultValue={businessInfo && businessInfo.country}
            name='country'
            label='Country'
            margin='normal'
            variant='outlined'
          />
          <TextField
            inputRef={props.register}
            error={props.errors['telephone'] ? true : false}
            helperText={
              props.errors['telephone']
                ? props.errors['telephone'].message
                : null
            }
            defaultValue={businessInfo && businessInfo.telephone}
            name='telephone'
            label='Telephone'
            margin='normal'
            variant='outlined'
          />
          <TextField
            inputRef={props.register}
            error={props.errors['email'] ? true : false}
            helperText={
              props.errors['email'] ? props.errors['email'].message : null
            }
            defaultValue={businessInfo && businessInfo.email}
            name='email'
            label='Email'
            margin='normal'
            variant='outlined'
          />
        </div>
        <div className={styles.btn_container}>
          <ButtonWithSpinner
            loading={props.user.loading}
            success={props.user.success}
            type='submit'
            text='Submit Details'
          />
        </div>
        {props.showSkipStep ? (
          <p>
            Skip this step?{' '}
            <Link className={styles.skip_link} to='/clients'>
              Click here
            </Link>
          </p>
        ) : null}
        {props.apiError && <ErrorMessage>{props.apiError}</ErrorMessage>}
      </form>
    </React.Fragment>
  );
}
