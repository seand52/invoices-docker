import { all, call, put, select, takeLatest } from '@redux-saga/core/effects';
import { FullSalesOrderDetails } from 'api/responses/sales-orders.type';
import * as api from 'api/salesOrder';
import { prepareInvoiceDefaultValues } from 'helpers/prepareInvoiceDefaultValues';
import { getSalesOrderState } from 'selectors/salesOrders';
import * as InvoiceActions from 'store/actions/invoiceActions';
import * as InvoiceFormActions from 'store/actions/invoiceFormActions';
import * as SalesOrderActions from 'store/actions/SalesOrderActions';

function* searchSalesOrders({ payload }: any) {
  try {
    const res = yield api.searchSalesOrders(payload);
    yield put(SalesOrderActions.searchAllOk(res));
  } catch (err) {
    yield put(SalesOrderActions.searchAllFailed(err));
  }
}

function* searchSalesOrderDetails({
  payload,
}: ReturnType<typeof SalesOrderActions.searchOne>) {
  try {
    const res = yield api.searchSalesOrderDetails(payload);
    const { settings, products } = prepareInvoiceDefaultValues<
      FullSalesOrderDetails
    >(res);
    yield put(InvoiceFormActions.insertDefaultValues(settings, products));
    yield put(SalesOrderActions.searchOneOk(res));
  } catch (err) {
    yield put(SalesOrderActions.searchOneFailed(err));
  }
}

function* deleteSalesOrder({ payload }: any) {
  const state = yield select();
  const salesOrderState = getSalesOrderState(state);
  try {
    const res = yield api.deleteSalesOrder(payload);
    yield put(SalesOrderActions.deleteSalesOrderOk(res));
    yield call(searchSalesOrders, {
      payload: `${process.env.REACT_APP_API_URL}/sales-orders?page=${salesOrderState.salesOrders.currentPage}&limit=${salesOrderState.salesOrders.itemCount}`,
    });
  } catch (err) {
    yield put(SalesOrderActions.deleteSalesOrderFailed(err));
  }
}

function* createSalesOrder({ payload }: any) {
  try {
    const res = yield api.createSalesOrder(payload);
    yield put(SalesOrderActions.newSalesOrderOk(res.base64, res.id));
  } catch (err) {
    yield put(SalesOrderActions.newSalesOrderFailed(err));
  }
}

function* updateSalesOrder({ payload }: any) {
  try {
    const res = yield api.updateSalesOrder(payload.data, payload.id);
    yield put(SalesOrderActions.updateSalesOrderOk(res.base64, res.id));
  } catch (err) {
    yield put(SalesOrderActions.updateSalesOrderFailed(err));
  }
}

function* transformToInvoice({ payload }: any) {
  try {
    const res = yield api.transformToInvoice(payload);
    yield put(InvoiceActions.updateBase64Invoice(res.base64, res.id));
    yield put(SalesOrderActions.transformToInvoiceOk(res.base64, res.id));
  } catch (err) {
    yield put(SalesOrderActions.transformToInvoiceFailed(err));
  }
}

function* sagas() {
  return all([
    yield takeLatest(SalesOrderActions.SEARCH_ALL, searchSalesOrders),
    yield takeLatest(SalesOrderActions.SEARCH_ONE, searchSalesOrderDetails),
    yield takeLatest(SalesOrderActions.DELETE, deleteSalesOrder),
    yield takeLatest(SalesOrderActions.NEW_SALES_ORDER, createSalesOrder),
    yield takeLatest(SalesOrderActions.UPDATE_SALES_ORDER, updateSalesOrder),
    yield takeLatest(
      SalesOrderActions.TRANSFORM_TO_INVOICE,
      transformToInvoice,
    ),
  ]);
}

export default sagas;
