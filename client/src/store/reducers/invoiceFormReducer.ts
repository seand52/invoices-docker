import * as InvoiceFormActions from '../actions/invoiceFormActions';
import { Client } from 'api/responses/clients.type';
import uuidv4 from 'uuid/v4';
import { TaxOption } from 'data/taxOptions';

export enum PaymentType {
  TRANSFERENCIA = 'Transferencia',
  TARJETA = 'Tarjeta',
  EFECTIVO = 'Efectivo',
}

export interface InvoiceSettings {
  client: { name: string; id: number } | null;
  date: string | Date;
  expirationDate?: string | Date | null;
  transportPrice: number | null;
  paymentType: { label: string; value: PaymentType };
  tax: TaxOption[];
}

export interface InvoiceProducts {
  quantity: number;
  uuid: string;
  price: number;
  reference: string;
  description: string;
  discount: number;
}

export interface InvoiceDetailsState {
  clientLoading: boolean;
  clientsFound: Client[];
  settings: InvoiceSettings;
  products: InvoiceProducts[];
}

export const initialState: InvoiceDetailsState = {
  clientLoading: false,
  clientsFound: [],
  settings: {
    client: null,
    date: new Date(),
    expirationDate: null,
    transportPrice: null,
    paymentType: { label: 'Bank Transfer', value: PaymentType.TRANSFERENCIA },
    tax: [{ label: 'IVA (21%)', value: 0.21, category: 'tax' }],
  },
  products: [
    {
      quantity: 1,
      uuid: uuidv4(),
      price: 0,
      reference: '',
      description: '',
      discount: 0,
    },
  ],
};

export const key = 'invoiceForm';

type Actions =
  | InvoiceFormActions.ToggleLoading
  | InvoiceFormActions.FindClients
  | InvoiceFormActions.FindClientsOk
  | InvoiceFormActions.FindClientsFailed
  | InvoiceFormActions.UpdateSettings
  | InvoiceFormActions.UpdateTaxes
  | InvoiceFormActions.AddProductRow
  | InvoiceFormActions.DeleteProductRow
  | InvoiceFormActions.SelectProduct
  | InvoiceFormActions.ChangeQuantity
  | InvoiceFormActions.InsertDefaultValues
  | InvoiceFormActions.ClearInvoice
  | InvoiceFormActions.SetDiscount
  | InvoiceFormActions.MakeInvoiceClient
  | InvoiceFormActions.SelectCustomProduct;

export const reducer = (
  state: InvoiceDetailsState = initialState,
  action: Actions,
): InvoiceDetailsState => {
  switch (action.type) {
    case InvoiceFormActions.TOGGLE_LOADING:
      return {
        ...state,
        clientLoading: !state.clientLoading,
      };
    case InvoiceFormActions.FIND_CLIENTS:
      return {
        ...state,
        clientLoading: true,
      };
    case InvoiceFormActions.FIND_CLIENTS_OK:
      return {
        ...state,
        clientLoading: false,
        clientsFound: action.payload,
      };
    case InvoiceFormActions.FIND_CLIENTS_FAILED:
      return {
        ...state,
        clientLoading: false,
        clientsFound: action.payload,
      };
    case InvoiceFormActions.UPDATE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload.field]: action.payload.value,
        },
      };
    case InvoiceFormActions.UPDATE_TAXES:
      return {
        ...state,
        settings: {
          ...state.settings,
          tax: action.payload,
        },
      };
    case InvoiceFormActions.ADD_PRODUCT:
      debugger;
      return {
        ...state,
        products: [
          ...state.products,
          {
            quantity: 1,
            uuid: uuidv4(),
            price: 0,
            reference: '',
            description: '',
            discount: 0,
          },
        ],
      };
    case InvoiceFormActions.DELETE_PRODUCT:
      const newProducts = state.products.filter(
        item => item.uuid !== action.payload,
      );
      return {
        ...state,
        products: newProducts,
      };
    case InvoiceFormActions.SELECT_PRODUCT:
      const productIndex = state.products.findIndex(
        item => item.uuid === action.payload.uuid,
      );
      const productsCopy = [...state.products];
      productsCopy[productIndex] = {
        price: action.payload.product.price,
        uuid: action.payload.product.uuid,
        quantity: productsCopy[productIndex].quantity,
        reference: action.payload.product.reference,
        description: action.payload.product.description,
        discount: action.payload.product.discount,
      };
      return {
        ...state,
        products: productsCopy,
      };
    case InvoiceFormActions.SELECT_CUSTOM_PRODUCT: {
      const productIndex = state.products.findIndex(
        item => item.uuid === action.payload.uuid,
      );
      const productsCopy = state.products.map(a => Object.assign({}, a));
      productsCopy[productIndex][action.payload.key] = action.payload.value;
      return {
        ...state,
        products: productsCopy,
      };
    }
    case InvoiceFormActions.CHANGE_QUANTITY: {
      const productIndex = state.products.findIndex(
        item => item.uuid === action.payload.uuid,
      );
      const productsCopy = [...state.products];
      productsCopy[productIndex].quantity = action.payload.newQuantity;
      return {
        ...state,
        products: productsCopy,
      };
    }
    case InvoiceFormActions.DEFAULT_VALUES: {
      return {
        ...state,
        settings: action.payload.settings,
        products: action.payload.products,
      };
    }

    case InvoiceFormActions.SET_DISCOUNT: {
      const productIndex = state.products.findIndex(
        item => item.uuid === action.payload.uuid,
      );
      const productsCopy = [...state.products];
      productsCopy[productIndex].discount = action.payload.value;
      return {
        ...state,
        products: productsCopy,
      };
    }
    case InvoiceFormActions.MAKE_INVOICE_CLIENT:
      return {
        ...state,
        settings: {
          ...state.settings,
          client: { id: action.payload.id, name: action.payload.name },
        },
      };
    case InvoiceFormActions.CLEAR_INVOICE:
      return { ...initialState };
  }
  return state;
};
