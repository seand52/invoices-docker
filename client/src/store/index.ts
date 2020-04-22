import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import createSagaMiddleware from 'redux-saga';
import * as clients from 'store/reducers/clientsReducer';
import * as invoiceForm from 'store/reducers/invoiceFormReducer';
import * as invoices from 'store/reducers/invoicesReducer';
import * as navigation from 'store/reducers/navigationReducer';
import * as products from 'store/reducers/productsReducer';
import * as salesOrders from 'store/reducers/salesOrdersReducer';
import * as users from 'store/reducers/userReducer';

import sagas from './sagas/index';

//@ts-ignore
const rootReducer = combineReducers({
  //@ts-ignore
  [users.key]: users.reducer,
  [clients.key]: clients.reducer,
  [products.key]: products.reducer,
  [invoices.key]: invoices.reducer,
  [invoiceForm.key]: invoiceForm.reducer,
  [salesOrders.key]: salesOrders.reducer,
  [navigation.key]: navigation.reducer,
});

const initialState = {
  [users.key]: users.initialState,
  [clients.key]: clients.initialState,
  [products.key]: products.initialState,
  [invoices.key]: invoices.initialState,
  [invoices.key]: invoices.initialState,
  [invoiceForm.key]: invoiceForm.initialState,
  [salesOrders.key]: salesOrders.initialState,
  [navigation.key]: navigation.initialState,
};

// persist store setup

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: [users.key], // only navigation will be persisted
};

export type InitialState = typeof initialState;

const composeEnhancers = composeWithDevTools({
  trace: true,
});

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  //@ts-ignore
  initialState,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

export const persistor = persistStore(store);

sagaMiddleware.run(sagas);
