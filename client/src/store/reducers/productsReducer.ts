import * as ProductsActions from '../actions/productsActions';
import { ProductsPaginated } from 'api/responses/products.type';
import Swal from 'sweetalert2';
import { alertProp } from 'utils/swal';

export const initialState = {
  products: {} as ProductsPaginated,
  loading: false as boolean,
  formLoading: false as boolean,
  error: null as string | null,
  formError: null as string | null,
  success: false as boolean,
};

export const key = 'products';

export type ProductState = typeof initialState;

type Actions =
  | ProductsActions.SearchAll
  | ProductsActions.SearchAllOk
  | ProductsActions.SearchAllFailed
  | ProductsActions.DeleteProduct
  | ProductsActions.DeleteProductOk
  | ProductsActions.DeleteProductFailed
  | ProductsActions.NewProduct
  | ProductsActions.NewProductOk
  | ProductsActions.NewProductFailed
  | ProductsActions.ResetSuccess
  | ProductsActions.UpdateProduct
  | ProductsActions.UpdateProductOk
  | ProductsActions.UpdateProductFailed
  | ProductsActions.ResetError;

export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ProductsActions.SEARCH_ALL:
      return {
        ...state,
        loading: true,
      };
    case ProductsActions.SEARCH_ALL_OK:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case ProductsActions.SEARCH_ALL_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ProductsActions.DELETE:
      return {
        ...state,
        loading: true,
      };
    case ProductsActions.DELETE_OK:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ProductsActions.DELETE_FAILED:
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
    case ProductsActions.NEW_PRODUCT:
      return {
        ...state,
        formLoading: true,
      };
    case ProductsActions.NEW_PRODUCT_OK:
      return {
        ...state,
        formLoading: false,
        success: true,
      };
    case ProductsActions.NEW_PRODUCT_FAILED:
      return {
        ...state,
        formLoading: false,
        success: false,
        formError: action.payload,
      };
    case ProductsActions.UPDATE_PRODUCT:
      return {
        ...state,
        formLoading: true,
      };
    case ProductsActions.UPDATE_PRODUCT_OK:
      return {
        ...state,
        formLoading: false,
        success: true,
      };
    case ProductsActions.UPDATE_PRODUCT_FAILED:
      return {
        ...state,
        formLoading: false,
        success: false,
        formError: action.payload,
      };
    case ProductsActions.RESET_SUCCESS:
      return {
        ...state,
        success: false,
      };
    case ProductsActions.RESET_ERROR:
      return {
        ...state,
        formError: null,
      };
    default:
      return state;
  }
};
