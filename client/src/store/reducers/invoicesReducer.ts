import * as InvoiceActions from '../actions/invoiceActions';
import * as InvoiceFormActions from '../actions/invoiceFormActions';
import {
  InvoicesPaginated,
  FullInvoiceDetails,
} from 'api/responses/invoices.type';
import Swal from 'sweetalert2';
import { alertProp } from 'utils/swal';

export const initialState = {
  invoices: {} as InvoicesPaginated,
  loading: false as boolean,
  error: null as string | null,
  success: false as boolean,
  selectedInvoiceDetails: {} as FullInvoiceDetails,
  downloadedInvoice: {
    base64invoice: '' as string,
    id: null as number | null,
  },
};

export enum InvoiceSettingKeys {
  CLIENTID = 'client',
  DATE = 'date',
  EXPIRATION = 'expirationDate',
  TRANSPORTPRICE = 'transportPrice',
  PAYMENTYPE = 'paymentType',
  TAX = 'tax',
}

export const key = 'invoices';

export type InvoiceState = typeof initialState;

type Actions =
  | InvoiceActions.SearchAll
  | InvoiceActions.SearchAllOk
  | InvoiceActions.SearchAllFailed
  | InvoiceActions.SearchOne
  | InvoiceActions.SearchOneOk
  | InvoiceActions.SearchOneFailed
  | InvoiceActions.DeleteInvoice
  | InvoiceActions.DeleteInvoiceOk
  | InvoiceActions.DeleteInvoiceFailed
  | InvoiceActions.UpdateInvoice
  | InvoiceActions.UpdateInvoiceOk
  | InvoiceActions.UpdateInvoiceFailed
  | InvoiceActions.NewInvoice
  | InvoiceActions.NewInvoiceOk
  | InvoiceActions.NewInvoiceFailed
  | InvoiceActions.ResetSuccess
  | InvoiceActions.UpdateBase64Invoice
  | InvoiceFormActions.ClearInvoice;

export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case InvoiceActions.SEARCH_ALL:
      return {
        ...state,
        loading: true,
      };
    case InvoiceActions.SEARCH_ALL_OK:
      return {
        ...state,
        invoices: action.payload,
        loading: false,
      };
    case InvoiceActions.SEARCH_ALL_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case InvoiceActions.SEARCH_ONE:
      return {
        ...state,
        loading: true,
      };
    case InvoiceActions.SEARCH_ONE_OK:
      return {
        ...state,
        loading: false,
        selectedInvoiceDetails: action.payload,
      };
    case InvoiceActions.SEARCH_ONE_FAILED:
      Swal.fire(
        alertProp({
          text: action.payload,
          title: 'Gee whiz',
          type: 'error',
        }),
      );
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case InvoiceActions.DELETE:
      return {
        ...state,
        loading: true,
      };
    case InvoiceActions.DELETE_OK:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case InvoiceActions.DELETE_FAILED:
      Swal.fire(
        alertProp({
          text: action.payload,
          title: 'Gee whiz',
          type: 'error',
        }),
      );
      return {
        ...state,
        loading: false,
        success: false,
      };
    case InvoiceActions.NEW_INVOICE:
      return {
        ...state,
        loading: true,
      };
    case InvoiceActions.NEW_INVOICE_OK:
      return {
        ...state,
        loading: false,
        success: true,
        downloadedInvoice: {
          base64invoice: action.payload.base64invoice,
          id: action.payload.id,
        },
      };
    case InvoiceActions.NEW_INVOICE_FAILED:
      Swal.fire(
        alertProp({
          text: action.payload,
          title: 'Gee whiz',
          type: 'error',
        }),
      );
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case InvoiceActions.UPDATE_INVOICE:
      return {
        ...state,
        loading: true,
      };
    case InvoiceActions.UPDATE_INVOICE_OK:
      return {
        ...state,
        loading: false,
        success: true,
        downloadedInvoice: {
          base64invoice: action.payload.base64invoice,
          id: action.payload.id,
        },
      };
    case InvoiceActions.UPDATE_INVOICE_FAILED:
      Swal.fire(
        alertProp({
          text: action.payload,
          title: 'Gee whiz',
          type: 'error',
        }),
      );
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case InvoiceActions.RESET_SUCCESS:
      return {
        ...state,
        success: false,
      };

    case InvoiceActions.UPDATE_BASE64_INVOICE:
      return {
        ...state,
        downloadedInvoice: {
          base64invoice: action.payload.base64invoice,
          id: action.payload.id,
        },
      };
    case InvoiceFormActions.CLEAR_INVOICE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
