import * as SalesOrderActions from '../actions/SalesOrderActions';
import * as InvoiceFormActions from '../actions/invoiceFormActions';
import {
  SalesOrdersPaginated,
  FullSalesOrderDetails,
} from 'api/responses/sales-orders.type';
import Swal from 'sweetalert2';
import { alertProp } from 'utils/swal';

export const initialState = {
  salesOrders: {} as SalesOrdersPaginated,
  loading: false as boolean,
  error: null as string | null,
  success: false as boolean,
  selectedSalesOrderDetails: {} as FullSalesOrderDetails,
  downloadedSalesOrder: {
    base64salesOrder: '' as string,
    id: null as number | null,
  },
};

export enum SalesOrderSettingKeys {
  CLIENTID = 'client',
  DATE = 'date',
  TRANSPORTPRICE = 'transportPrice',
  PAYMENTYPE = 'paymentType',
  TAX = 'tax',
}

export const key = 'salesOrders';

export type SalesOrderState = typeof initialState;

type Actions =
  | SalesOrderActions.SearchAll
  | SalesOrderActions.SearchAllOk
  | SalesOrderActions.SearchAllFailed
  | SalesOrderActions.SearchOne
  | SalesOrderActions.SearchOneOk
  | SalesOrderActions.SearchOneFailed
  | SalesOrderActions.DeleteSalesOrder
  | SalesOrderActions.DeleteSalesOrderOk
  | SalesOrderActions.DeleteSalesOrderFailed
  | SalesOrderActions.UpdateSalesOrder
  | SalesOrderActions.UpdateSalesOrderOk
  | SalesOrderActions.UpdateSalesOrderFailed
  | SalesOrderActions.NewSalesOrder
  | SalesOrderActions.NewSalesOrderOk
  | SalesOrderActions.NewSalesOrderFailed
  | SalesOrderActions.ResetSuccess
  | SalesOrderActions.TransformToInvoice
  | SalesOrderActions.TransformToInvoiceOk
  | SalesOrderActions.TransformToInvoiceFailed
  | InvoiceFormActions.ClearInvoice;

export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case SalesOrderActions.SEARCH_ALL:
      return {
        ...state,
        loading: true,
      };
    case SalesOrderActions.SEARCH_ALL_OK:
      return {
        ...state,
        salesOrders: action.payload,
        loading: false,
      };
    case SalesOrderActions.SEARCH_ALL_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SalesOrderActions.SEARCH_ONE:
      return {
        ...state,
        loading: true,
      };
    case SalesOrderActions.SEARCH_ONE_OK:
      return {
        ...state,
        loading: false,
        selectedSalesOrderDetails: action.payload,
      };
    case SalesOrderActions.SEARCH_ONE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SalesOrderActions.DELETE:
      return {
        ...state,
        loading: true,
      };
    case SalesOrderActions.DELETE_OK:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case SalesOrderActions.DELETE_FAILED:
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
    case SalesOrderActions.NEW_SALES_ORDER:
      return {
        ...state,
        loading: true,
      };
    case SalesOrderActions.NEW_SALES_ORDER_OK:
      return {
        ...state,
        loading: false,
        success: true,
        downloadedSalesOrder: {
          base64salesOrder: action.payload.base64salesOrder,
          id: action.payload.id,
        },
      };
    case SalesOrderActions.NEW_SALES_ORDER_FAILED:
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
    case SalesOrderActions.UPDATE_SALES_ORDER:
      return {
        ...state,
        loading: true,
      };
    case SalesOrderActions.UPDATE_SALES_ORDER_OK:
      return {
        ...state,
        loading: false,
        success: true,
        downloadedSalesOrder: {
          base64salesOrder: action.payload.base64salesOrder,
          id: action.payload.id,
        },
      };
    case SalesOrderActions.UPDATE_SALES_ORDER_FAILED:
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
    case SalesOrderActions.TRANSFORM_TO_INVOICE:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case SalesOrderActions.TRANSFORM_TO_INVOICE_OK:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case SalesOrderActions.TRANSFORM_TO_INVOICE_FAILED:
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
    case SalesOrderActions.RESET_SUCCESS:
      return {
        ...state,
        success: false,
      };
    case InvoiceFormActions.CLEAR_INVOICE:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
