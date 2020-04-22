import React from 'react';

import useFormBuilder from 'hooks/useFormBuilder';

import { IRegisterFields } from 'forms/formValidations/authentication';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';

import styles from './RegisterContainer.module.scss';
import RegisterForm from '../../components/Register/RegisterForm/RegisterForm';
import { getUserState } from 'selectors/userSelectors';
import {
  register,
  clearSuccess,
  submitBusinessDetails,
} from 'store/actions/userActions';
import { UserState } from 'store/reducers/userReducer';
import BusinessInfoForm from 'components/BusinessInfoForm/BusinessInfoForm';
import { IBusinessInfo } from 'forms/formValidations/business-info';

interface Props {
  path: string;
  registerUser: (data: IRegisterFields) => void;
  submitBusinessInfo: (data: IBusinessInfo) => void;
  resetSuccess: () => void;
  user: UserState;
}

enum RegisterSteps {
  REGISTER = 1,
  BUSINESSINFO = 2,
}
const RegisterContainer = ({
  path,
  registerUser,
  submitBusinessInfo,
  resetSuccess,
  user,
}: Props) => {
  const { register, handleSubmit, errors } = useFormBuilder({
    key: 'registerValidationFields',
  });
  const {
    register: businessInfoRegister,
    handleSubmit: businessInfoHandleSubmit,
    errors: businessInfoErrors,
  } = useFormBuilder({
    key: 'businessInfoFields',
  });

  const onSubmit = (data: IRegisterFields) => {
    registerUser(data);
  };

  const onSubmitBusinessInfo = (data: IBusinessInfo) => {
    submitBusinessInfo(data);
  };

  if (user.success) {
    resetSuccess();
    navigate('/clients');
    return null;
  }

  return (
    <div className={styles.form_wrapper}>
      {user.registerStep === RegisterSteps.REGISTER && (
        <RegisterForm
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          user={user}
          apiError={user.error}
        />
      )}
      {user.registerStep === RegisterSteps.BUSINESSINFO && (
        <BusinessInfoForm
          parentStyles={styles.businessform}
          showSkipStep
          register={businessInfoRegister}
          errors={businessInfoErrors}
          handleSubmit={businessInfoHandleSubmit}
          onSubmit={onSubmitBusinessInfo}
          user={user}
          apiError={user.error}
        />
      )}
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
    registerUser: (data: IRegisterFields) => dispatch(register(data)),
    submitBusinessInfo: (data: IBusinessInfo) =>
      dispatch(submitBusinessDetails(data)),
    resetSuccess: () => dispatch(clearSuccess()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
