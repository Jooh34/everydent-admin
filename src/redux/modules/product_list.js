import { createAction, handleActions, combineActions } from 'redux-actions';

// Actions
const ADD_CHECKED_PRODUCT = 'product_list/ADD_CHECKED_PRODUCT';
const REASSIGN_CHECKED_PRODUCT = 'product_list/REASSIGN_CHECKED_PRODUCT';

const REQUEST_SET_MIN_STOCK = 'product_list/REQUEST_SET_MIN_STOCK';

// Action Creators
export const addCheckedProduct = createAction(ADD_CHECKED_PRODUCT);
export const reassignCheckedProduct = createAction(REASSIGN_CHECKED_PRODUCT);

export const requestSetMinStock = createAction(REQUEST_SET_MIN_STOCK);

const initialState = {
  checked_product_list: [],
};

export default handleActions({
  [ADD_CHECKED_PRODUCT]: (state, action) => {
    let id = action.payload
    if (state.checked_product_list.includes(id)) {
      return {
        ...state,
        checked_product_list: [...state.checked_product_list.filter(el => el !== id)],
      }
    }
    else {
      return {
        ...state,
        checked_product_list: [...state.checked_product_list, id]
      }
    }
  },

  [REASSIGN_CHECKED_PRODUCT]: (state, action) => {
    return {
      ...state,
      checked_product_list: action.payload
    }
  }
}, initialState);
