import { ProductsPaginated } from 'api/responses/products.type';
import { ICreateProduct } from 'forms/formValidations/add-product';

export const SEARCH_ALL = 'PRODUCTS:SEARCH_ALL';
export const SEARCH_ALL_OK = 'PRODUCTS:SEARCH_ALL_OK';
export const SEARCH_ALL_FAILED = 'PRODUCTS:SEARCH_ALL_FAILED';

export const DELETE = 'PRODUCTS::DELETE';
export const DELETE_OK = 'PRODUCTS::DELETE_OK';
export const DELETE_FAILED = 'PRODUCTS::DELETE_FAILED';

export const NEW_PRODUCT = 'PRODUCTS::NEW_PRODUCT';
export const NEW_PRODUCT_OK = 'PRODUCTS::NEW_PRODUCT_OK';
export const NEW_PRODUCT_FAILED = 'PRODUCTS::NEW_PRODUCT_FAILED';

export const UPDATE_PRODUCT = 'PRODUCTS::UPDATE_PRODUCT';
export const UPDATE_PRODUCT_OK = 'PRODUCTS::UPDATE_PRODUCT_OK';
export const UPDATE_PRODUCT_FAILED = 'PRODUCTS::UPDATE_PRODUCT_FAILED';

export const RESET_SUCCESS = 'PRODUCTS::RESET_SUCCESS';
export const RESET_ERROR = 'PRODUCTS::RESET_ERROR';
export interface SearchAll {
  type: typeof SEARCH_ALL;
}

export const searchAll = ({ url }: { url: string }) => ({
  type: SEARCH_ALL,
  payload: url,
});

export interface SearchAllOk {
  type: typeof SEARCH_ALL_OK;
  payload: ProductsPaginated;
}

export const searchAllOk = (data: ProductsPaginated) => ({
  type: SEARCH_ALL_OK,
  payload: data,
});

export interface SearchAllFailed {
  type: typeof SEARCH_ALL_FAILED;
  payload: string;
}

export const searchAllFailed = (message: string) => ({
  type: SEARCH_ALL_FAILED,
  payload: message,
});

export interface DeleteProduct {
  type: typeof DELETE;
  payload: string;
}

export const deleteProduct = (id: string) => ({
  type: DELETE,
  payload: id,
});

export interface DeleteProductOk {
  type: typeof DELETE_OK;
  payload: string;
}

export const deleteProductOk = (data: ProductsPaginated) => ({
  type: DELETE_OK,
  payload: data,
});

export interface DeleteProductFailed {
  type: typeof DELETE_FAILED;
  payload: string;
}

export const deleteProductFailed = (message: string) => ({
  type: DELETE_FAILED,
  payload: message,
});

export interface NewProduct {
  type: typeof NEW_PRODUCT;
  payload: ICreateProduct;
}

export const newProduct = (data: ICreateProduct) => ({
  type: NEW_PRODUCT,
  payload: data,
});

export interface NewProductOk {
  type: typeof NEW_PRODUCT_OK;
  data: any;
}

export const newProductOk = data => ({
  type: NEW_PRODUCT_OK,
  payload: data,
});

export interface NewProductFailed {
  type: typeof NEW_PRODUCT_FAILED;
  payload: string;
}

export const newProductFailed = (message: string) => ({
  type: NEW_PRODUCT_FAILED,
  payload: message,
});

export interface UpdateProduct {
  type: typeof UPDATE_PRODUCT;
  payload: ICreateProduct;
}

export const updateProduct = (data: ICreateProduct, id: string) => ({
  type: UPDATE_PRODUCT,
  payload: { data, id },
});

export interface UpdateProductOk {
  type: typeof UPDATE_PRODUCT_OK;
  data: any;
}

export const updateProductOk = data => ({
  type: UPDATE_PRODUCT_OK,
  payload: data,
});

export interface UpdateProductFailed {
  type: typeof UPDATE_PRODUCT_FAILED;
  payload: string;
}

export const updateProductFailed = (message: string) => ({
  type: UPDATE_PRODUCT_FAILED,
  payload: message,
});

export interface ResetSuccess {
  type: typeof RESET_SUCCESS;
}

export const resetSuccess = () => ({
  type: RESET_SUCCESS,
});

export interface ResetError {
  type: typeof RESET_ERROR;
}

export const resetError = () => ({
  type: RESET_ERROR,
});
