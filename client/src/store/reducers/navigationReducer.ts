import * as NavigationActions from '../actions/navigationActions';

export type Pages =
  | 'clients'
  | 'products'
  | 'invoices'
  | 'salesOrders'
  | 'business-info';

export const initialState = {
  currentPage: null as Pages | null,
};

export const key = 'navigation';

export type NavigationState = typeof initialState;

type Actions = NavigationActions.SetPage;

export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case NavigationActions.SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};
