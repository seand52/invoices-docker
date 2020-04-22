import { all, takeLatest, put, call } from '@redux-saga/core/effects';
import * as UserActions from 'store/actions/userActions';
import * as api from 'api/user';
import { BusinessInfoAPI } from 'api/responses/businessInfo.type';
import { navigate } from '@reach/router';

const setToken = token => {
  window.sessionStorage.setItem('token', token);
};

const clearToken = () => {
  window.sessionStorage.removeItem('token');
};

function* authenticate({ payload }: any) {
  try {
    const res = yield api.authenticateUser(payload);
    yield put(UserActions.loginOk(res));
    yield call(setToken, res.token);
  } catch (err) {
    yield put(UserActions.loginFailed(err.message));
  }
}

function* registerUser({ payload }: any) {
  try {
    const res = yield api.registerUser(payload);
    yield put(UserActions.registerOk(res.token));
    yield call(setToken, res.token);
  } catch (err) {
    yield put(UserActions.registrationField(err.message));
  }
}

function* submitBusinessDetails({ payload }: any) {
  try {
    const res: BusinessInfoAPI = yield api.saveBusinessInfo(payload);
    yield put(UserActions.submitBusinessDetailsOk(res));
  } catch (err) {
    yield put(UserActions.submitBusinessDetailsFailed(err.message));
  }
}

function* updateBusinessDetails({ payload }: any) {
  try {
    const res: BusinessInfoAPI = yield api.updateBusinessInfo(payload);
    debugger;
    yield put(UserActions.updateBusinessDetailsOk(res));
  } catch (err) {
    yield put(UserActions.updateBusinessDetailsFailed(err.message));
  }
}

function* logout({ payload }: any) {
  clearToken();
  yield navigate('/');
}

function* sagas() {
  return all([
    yield takeLatest(UserActions.LOGIN, authenticate),
    yield takeLatest(UserActions.REGISTER, registerUser),
    yield takeLatest(UserActions.LOGOUT, logout),
    yield takeLatest(
      UserActions.SUBMIT_BUSINESS_DETAILS,
      submitBusinessDetails,
    ),
    yield takeLatest(
      UserActions.UPDATE_BUSINESS_DETAILS,
      updateBusinessDetails,
    ),
  ]);
}

export default sagas;
