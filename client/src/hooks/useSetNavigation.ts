import React, { useEffect } from 'react';
import { Pages } from '../store/reducers/navigationReducer';
import { useDispatch } from 'react-redux';
import { SET_PAGE } from 'store/actions/navigationActions';

export const useSetNavigation = (page: Pages) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_PAGE, payload: page });
  }, []);
};
