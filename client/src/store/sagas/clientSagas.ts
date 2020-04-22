import { all, takeLatest, put, call, select } from '@redux-saga/core/effects';
import * as ClientActions from 'store/actions/clientActions';
import * as api from 'api/clients';
import { getClientsState } from 'selectors/clients';

function* searchClients({ payload }: any) {
  try {
    const res = yield api.searchClients(payload);
    yield put(ClientActions.searchAllOk(res));
  } catch (err) {
    yield put(ClientActions.searchAllFailed(err));
  }
}

function* deleteClient({ payload }: any) {
  const state = yield select();
  const clientState = getClientsState(state);
  try {
    const res = yield api.deleteClient(payload);
    yield put(ClientActions.deleteClientOk(res));
    yield call(searchClients, {
      payload: `${process.env.REACT_APP_API_URL}/clients?page=${clientState.clients.currentPage}&limit=${clientState.clients.rowsPerPage}`,
    });
    // yield put(ClientActions.)
  } catch (err) {
    yield put(ClientActions.deleteClientFailed(err));
  }
}

function* createClient({ payload }: any) {
  const state = yield select();
  const clientState = getClientsState(state);
  try {
    const res = yield api.createClient(payload);
    yield put(ClientActions.newClientOk(res));
    yield call(searchClients, {
      payload: `${process.env.REACT_APP_API_URL}/clients?page=${clientState.clients.currentPage}&limit=${clientState.clients.rowsPerPage}`,
    });
  } catch (err) {
    yield put(ClientActions.newClientFailed(err));
  }
}

function* updateClient({ payload }: any) {
  const state = yield select();
  const clientState = getClientsState(state);
  try {
    const res = yield api.updateClient(payload.data, payload.id);
    yield put(ClientActions.updateClientOk(res));
    yield call(searchClients, {
      payload: `${process.env.REACT_APP_API_URL}/clients?page=${clientState.clients.currentPage}&limit=${clientState.clients.rowsPerPage}`,
    });
  } catch (err) {
    yield put(ClientActions.updateClientFailed(err));
  }
}

function* sagas() {
  return all([
    yield takeLatest(ClientActions.SEARCH_ALL, searchClients),
    yield takeLatest(ClientActions.DELETE, deleteClient),
    yield takeLatest(ClientActions.NEW_CLIENT, createClient),
    yield takeLatest(ClientActions.UPDATE_CLIENT, updateClient),
  ]);
}

export default sagas;
