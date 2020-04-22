export const initialState = {
  showModal: false,
  action: null as 'added' | 'modified' | 'deleted' | 'searching' | null,
  loading: false as boolean,
  selectedClientId: null as string | null,
  search: '' as string,
};

export type ClientsComponentState = typeof initialState;

interface ToggleModal {
  type: 'TOGGLE_MODAL';
}

interface CloseModal {
  type: 'CLOSE_MODAL';
}

interface AddClient {
  type: 'ADD_CLIENT';
}

interface DeleteClient {
  type: 'DELETE_CLIENT';
}

interface EditClient {
  type: 'EDIT_CLIENT';
  payload: string;
}

interface SetSearch {
  type: 'SET_SEARCH';
  payload: string;
}

type Actions =
  | ToggleModal
  | AddClient
  | DeleteClient
  | EditClient
  | CloseModal
  | SetSearch;

export const reducer = (
  state: ClientsComponentState,
  action: Actions,
): ClientsComponentState => {
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
    case 'ADD_CLIENT':
      return {
        ...state,
        action: 'added',
        selectedClientId: null,
        showModal: true,
      };
    case 'EDIT_CLIENT':
      return {
        ...state,
        action: 'modified',
        selectedClientId: action.payload,
        showModal: true,
      };
    case 'DELETE_CLIENT':
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
  return state;
};
