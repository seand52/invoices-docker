import userSagas from './userSagas';
import clientSagas from './clientSagas';
import productSagas from './productSagas';
import invoiceSagas from './invoiceSaga';
import salesOrderSagas from './salesOrderSagas';
import { all } from '@redux-saga/core/effects';

export default function*() {
  while (true) {
    yield all([
      userSagas(),
      clientSagas(),
      productSagas(),
      invoiceSagas(),
      salesOrderSagas(),
    ]);
  }
}
