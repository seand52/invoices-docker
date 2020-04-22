import { Pages } from 'store/reducers/navigationReducer';

export const SET_PAGE = 'NAVIGATION::SET_PAGE';

export interface SetPage {
  type: typeof SET_PAGE;
  payload: string;
}

export const setPage = (page: Pages) => ({
  type: SET_PAGE,
  payload: page,
});
