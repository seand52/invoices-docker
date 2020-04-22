import React, { useEffect } from 'react';
import Layout from 'components/Layout/Layout';
import { useSetNavigation } from 'hooks/useSetNavigation';
import BusinessInfoForm from 'components/BusinessInfoForm/BusinessInfoForm';
import useFormBuilder from 'hooks/useFormBuilder';
import { useSelector, connect } from 'react-redux';
import { InitialState } from 'store';
import { UserState } from 'store/reducers/userReducer';
import {
  updateBusinessDetails,
  submitBusinessDetails,
  clearSuccess,
} from 'store/actions/userActions';
import { getUserState } from 'selectors/userSelectors';
import { alertProp } from 'utils/swal';
import Swal from 'sweetalert2';

interface Props {
  updateInfo: (data) => void;
  createInfo: (data) => void;
  userState: UserState;
  clearSuccess: () => void;
}
const BusinessInfo = ({
  updateInfo,
  createInfo,
  userState,
  clearSuccess,
}: Props) => {
  const user: UserState = useSelector((state: InitialState) => state.userInfo);
  const { register, handleSubmit, errors } = useFormBuilder({
    key: 'businessInfoFields',
  });

  const myHandleSubmit = data => {
    if (userState.businessInfo && Object.keys(userState.businessInfo).length) {
      updateInfo(data);
    } else {
      createInfo(data);
    }
  };

  useEffect(() => {
    if (user.success === true) {
      Swal.fire(
        alertProp({
          text: 'Your details have been saved correctly',
          title: 'Success!',
          type: 'success',
        }),
      );
      clearSuccess();
    }
  }, [user.success, clearSuccess]);

  useSetNavigation('business-info');
  return (
    <Layout
      main={
        <BusinessInfoForm
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={myHandleSubmit}
          apiError={userState.error}
          user={user}
          showSkipStep={false}
        />
      }
    ></Layout>
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    userState: getUserState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateInfo: data => dispatch(updateBusinessDetails(data)),
    createInfo: data => dispatch(submitBusinessDetails(data)),
    clearSuccess: () => dispatch(clearSuccess()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BusinessInfo);
