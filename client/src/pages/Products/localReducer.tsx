export const initialState = {
  showModal: false,
  action: null as 'added' | 'modified' | 'deleted' | null,
  selectedProductId: null as string | null,
  search: '' as string,
};

export type ProductsComponentState = typeof initialState;

interface ToggleModal {
  type: 'TOGGLE_MODAL';
}

interface CloseModal {
  type: 'CLOSE_MODAL';
}

interface AddProduct {
  type: 'ADD_PRODUCT';
}

interface DeleteProduct {
  type: 'DELETE_PRODUCT';
}

interface EditProduct {
  type: 'EDIT_PRODUCT';
  payload: string;
}

interface SetSearch {
  type: 'SET_SEARCH';
  payload: string;
}

type Actions =
  | ToggleModal
  | AddProduct
  | DeleteProduct
  | EditProduct
  | CloseModal
  | SetSearch;

export const reducer = (
  state: ProductsComponentState,
  action: Actions,
): ProductsComponentState => {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return {
        ...state,
        showModal: !state.showModal,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        showModal: false,
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        action: 'added',
        selectedProductId: null,
        showModal: true,
      };
    case 'EDIT_PRODUCT':
      return {
        ...state,
        action: 'modified',
        selectedProductId: action.payload,
        showModal: true,
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        action: 'deleted',
        showModal: false,
      };
    case 'SET_SEARCH':
      return {
        ...state,
        search: action.payload,
      };
  }
};
