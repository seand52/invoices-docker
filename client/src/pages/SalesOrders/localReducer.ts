type Action = 'added' | 'modified' | 'deleted';

export const initialState = {
  showModal: false,
  action: null as Action | null,
  selectedSalesOrderId: null as string | null,
  search: '' as string,
};

export type SalesOrderComponentState = typeof initialState;

interface ToggleModal {
  type: 'TOGGLE_MODAL';
}

interface CloseModal {
  type: 'CLOSE_MODAL';
}

interface DeleteSalesOrder {
  type: 'DELETE_SALES_ORDER';
}
interface SetAction {
  type: 'SET_ACTION';
  payload: Action;
}

interface SetSearch {
  type: 'SET_SEARCH';
  payload: string;
}

type Actions =
  | ToggleModal
  | DeleteSalesOrder
  | CloseModal
  | SetAction
  | SetSearch;

export const reducer = (
  state: SalesOrderComponentState,
  action: Actions,
): SalesOrderComponentState => {
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
    case 'DELETE_SALES_ORDER':
      return {
        ...state,
        action: 'deleted',
        showModal: false,
      };
    case 'SET_ACTION':
      return {
        ...state,
        action: action.payload,
      };
    case 'SET_SEARCH':
      return {
        ...state,
        search: action.payload,
      };
  }
};
