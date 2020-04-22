import { Client } from 'api/responses/clients.type';
import {
  InvoiceSettings,
  InvoiceProducts,
} from 'store/reducers/invoiceFormReducer';
import { TaxOption } from 'data/taxOptions';

export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const FIND_CLIENTS = 'FIND_CLIENTS';
export const FIND_CLIENTS_OK = 'FIND_CLIENTS_OK';
export const FIND_CLIENTS_FAILED = 'FIND_CLIENTS_FAILED';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const UPDATE_TAXES = 'UPDATE_TAXES';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const SELECT_CUSTOM_PRODUCT = 'SELECT_CUSTOM_PRODUCT';
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
export const DEFAULT_VALUES = 'DEFAULT_VALES';
export const CLEAR_INVOICE = 'CLEAR_INVOICE';
export const SET_DISCOUNT = 'SET_DISCOUNT';
export const MAKE_INVOICE_CLIENT = 'MAKE_INVOICE_CLIENT,';

export interface ToggleLoading {
  type: typeof TOGGLE_LOADING;
}

export interface FindClients {
  type: typeof FIND_CLIENTS;
}

export interface FindClientsOk {
  type: typeof FIND_CLIENTS_OK;
  payload: Client[];
}

export interface FindClientsFailed {
  type: typeof FIND_CLIENTS_FAILED;
  payload: [];
}

export interface UpdateSettings {
  type: typeof UPDATE_SETTINGS;
  payload: {
    field: keyof InvoiceSettings;
    value: any;
  };
}

export interface UpdateTaxes {
  type: typeof UPDATE_TAXES;
  payload: TaxOption[];
}

export interface AddProductRow {
  type: typeof ADD_PRODUCT;
}

export interface DeleteProductRow {
  type: typeof DELETE_PRODUCT;
  payload: string;
}

export interface SelectProduct {
  type: typeof SELECT_PRODUCT;
  payload: {
    product: InvoiceProducts;
    uuid: string;
  };
}

export interface SelectCustomProduct {
  type: typeof SELECT_CUSTOM_PRODUCT;
  payload: {
    key: string;
    value: string;
    uuid: string;
  };
}

export interface ChangeQuantity {
  type: typeof CHANGE_QUANTITY;
  payload: {
    uuid: string;
    newQuantity: number;
  };
}

export interface InsertDefaultValues {
  type: typeof DEFAULT_VALUES;
  payload: {
    settings: InvoiceSettings;
    products: InvoiceProducts[];
  };
}

export const insertDefaultValues = (
  settings: InvoiceSettings,
  products: InvoiceProducts[],
) => ({
  type: DEFAULT_VALUES,
  payload: { settings, products },
});

export interface ClearInvoice {
  type: typeof CLEAR_INVOICE;
}

export const clearInvoice = () => ({
  type: CLEAR_INVOICE,
});

export interface SetDiscount {
  type: typeof SET_DISCOUNT;
  payload: {
    uuid: string;
    value: number;
  };
}

export const setDiscount = (uuid, value) => ({
  type: SET_DISCOUNT,
  payload: {
    uuid,
    value,
  },
});

export interface MakeInvoiceClient {
  type: typeof MAKE_INVOICE_CLIENT;
  payload: { name: string; id: number };
}

export const makeInvoiceClient = (id, name) => ({
  type: MAKE_INVOICE_CLIENT,
  payload: {
    id,
    name,
  },
});
