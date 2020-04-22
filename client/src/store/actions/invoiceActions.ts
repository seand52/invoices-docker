import {
  InvoicesPaginated,
  FullInvoiceDetails,
} from 'api/responses/invoices.type';
import { ICreateInvoice } from 'forms/formValidations/add-invoice';

export const SEARCH_ALL = 'INVOICES:SEARCH_ALL';
export const SEARCH_ALL_OK = 'INVOICES:SEARCH_ALL_OK';
export const SEARCH_ALL_FAILED = 'INVOICES:SEARCH_ALL_FAILED';

export const SEARCH_ONE = 'INVOICES::SEARCH_ONE';
export const SEARCH_ONE_OK = 'INVOICES::SEARCH_ONE_OK';
export const SEARCH_ONE_FAILED = 'INVOICES::SEARCH_ONE_FAILED';

export const DELETE = 'INVOICES::DELETE';
export const DELETE_OK = 'INVOICES::DELETE_OK';
export const DELETE_FAILED = 'INVOICES::DELETE_FAILED';

export const NEW_INVOICE = 'INVOICES::NEW_INVOICE';
export const NEW_INVOICE_OK = 'INVOICES::NEW_INVOICE_OK';
export const NEW_INVOICE_FAILED = 'INVOICES::NEW_INVOICE_FAILED';

export const UPDATE_INVOICE = 'INVOICES::UPDATE_INVOICE';
export const UPDATE_INVOICE_OK = 'INVOICES::UPDATE_INVOICE_OK';
export const UPDATE_INVOICE_FAILED = 'INVOICES::UPDATE_INVOICE_FAILED';

export const RESET_SUCCESS = 'INVOICES::RESET_SUCCESS';
export const UPDATE_BASE64_INVOICE = 'INVOICE::UPDATE_BASE_64_INVOICE';
export interface SearchAll {
  type: typeof SEARCH_ALL;
}

export const searchAll = ({ url }: { url: string }) => ({
  type: SEARCH_ALL,
  payload: url,
});

export interface SearchAllOk {
  type: typeof SEARCH_ALL_OK;
  payload: InvoicesPaginated;
}

export const searchAllOk = (data: InvoicesPaginated) => ({
  type: SEARCH_ALL_OK,
  payload: data,
});

export interface SearchAllFailed {
  type: typeof SEARCH_ALL_FAILED;
  payload: string;
}

export interface SearchOne {
  type: typeof SEARCH_ONE;
  payload: string;
}

export const searchOne = id => ({
  type: SEARCH_ONE,
  payload: id,
});

export interface SearchOneOk {
  type: typeof SEARCH_ONE_OK;
  payload: string;
}

export const searchOneOk = (data: FullInvoiceDetails) => ({
  type: SEARCH_ONE_OK,
  payload: data,
});

export interface SearchOneFailed {
  type: typeof SEARCH_ONE_FAILED;
  payload: string;
}

export const searchOneFailed = (message: string) => ({
  type: SEARCH_ONE_FAILED,
  payload: message,
});
export const searchAllFailed = (message: string) => ({
  type: SEARCH_ALL_FAILED,
  payload: message,
});

export interface DeleteInvoice {
  type: typeof DELETE;
  payload: string;
}

export const deleteInvoice = (id: string) => ({
  type: DELETE,
  payload: id,
});

export interface DeleteInvoiceOk {
  type: typeof DELETE_OK;
  payload: string;
}

export const deleteInvoiceOk = (data: InvoicesPaginated) => ({
  type: DELETE_OK,
  payload: data,
});

export interface DeleteInvoiceFailed {
  type: typeof DELETE_FAILED;
  payload: string;
}

export const deleteInvoiceFailed = (message: string) => ({
  type: DELETE_FAILED,
  payload: message,
});

export interface NewInvoice {
  type: typeof NEW_INVOICE;
  payload: ICreateInvoice;
}

export const newInvoice = (data: ICreateInvoice) => ({
  type: NEW_INVOICE,
  payload: data,
});

export interface NewInvoiceOk {
  type: typeof NEW_INVOICE_OK;
  payload: {
    base64invoice: string;
    id: number;
  };
}

export const newInvoiceOk = (data: string, id: number) => ({
  type: NEW_INVOICE_OK,
  payload: {
    base64invoice: data,
    id,
  },
});

export interface NewInvoiceFailed {
  type: typeof NEW_INVOICE_FAILED;
  payload: string;
}

export const newInvoiceFailed = (message: string) => ({
  type: NEW_INVOICE_FAILED,
  payload: message,
});

export interface UpdateInvoice {
  type: typeof UPDATE_INVOICE;
  payload: ICreateInvoice;
}

export const updateInvoice = (data: ICreateInvoice, id: string) => ({
  type: UPDATE_INVOICE,
  payload: { data, id },
});

export interface UpdateInvoiceOk {
  type: typeof UPDATE_INVOICE_OK;
  payload: {
    base64invoice: string;
    id: number;
  };
}

export const updateInvoiceOk = (data: string, id: number) => ({
  type: UPDATE_INVOICE_OK,
  payload: {
    base64invoice: data,
    id,
  },
});

export interface UpdateInvoiceFailed {
  type: typeof UPDATE_INVOICE_FAILED;
  payload: string;
}

export const updateInvoiceFailed = (message: string) => ({
  type: UPDATE_INVOICE_FAILED,
  payload: message,
});

export interface ResetSuccess {
  type: typeof RESET_SUCCESS;
}

export const resetSuccess = () => ({
  type: RESET_SUCCESS,
});

export interface UpdateBase64Invoice {
  type: typeof UPDATE_BASE64_INVOICE;
  payload: {
    base64invoice: string;
    id: number;
  };
}

export const updateBase64Invoice = (base64, id) => ({
  type: UPDATE_BASE64_INVOICE,
  payload: {
    base64invoice: base64,
    id,
  },
});
