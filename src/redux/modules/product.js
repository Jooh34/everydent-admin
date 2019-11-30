import { createAction, handleActions, combineActions } from 'redux-actions';

// Actions
const REQUEST_INITIAL_INFO = 'product/REQUEST_INITIAL_INFO';
const SUCCESS_INITIAL_INFO = 'product/SUCCESS_INITIAL_INFO';

const REQUEST_COUNT_INFO = 'product/REQUEST_COUNT_INFO';
const SUCCESS_COUNT_INFO = 'product/SUCCESS_COUNT_INFO';

const REQUEST_EXPIRY_LIST = 'product/REQUEST_EXPIRY_LIST';
const SUCCESS_EXPIRY_LIST = 'product/SUCCESS_EXPIRY_LIST';
const REQUEST_RUNNING_OUT_LIST = 'product/REQUEST_RUNNING_OUT_LIST';
const SUCCESS_RUNNING_OUT_LIST = 'product/SUCCESS_RUNNING_OUT_LIST';

// stock
const RESET_SCANNED_STOCK_LIST = 'product/RESET_SCANNED_STOCK_LIST';
const ADD_SCANNED_STOCK = 'product/ADD_SCANNED_STOCK';

const REQUEST_POST_STOCK = 'product/REQUEST_POST_STOCK';
const SUCCESS_POST_STOCK = 'product/SUCCESS_POST_STOCK';
const REQUEST_DELETE_STOCK = 'product/REQUEST_DELETE_STOCK';
const SUCCESS_DELETE_STOCK = 'product/SUCCESS_DELETE_STOCK';
const REQUEST_RETURN_STOCK = 'product/REQUEST_RETURN_STOCK';
const SUCCESS_RETURN_STOCK = 'product/SUCCESS_RETURN_STOCK';

const REQUEST_STOCK_LIST = 'product/REQUEST_STOCK_LIST';
const SUCCESS_STOCK_LIST = 'product/SUCCESS_STOCK_LIST';
const REQUEST_DELETE_STOCK_BY_ID = 'product/REQUEST_DELETE_STOCK_BY_ID';
const SUCCESS_DELETE_STOCK_BY_ID = 'product/SUCCESS_DELETE_STOCK_BY_ID';

// product_info
const REQUEST_POST_PRODUCT_INFO = 'product/REQUEST_POST_PRODUCT_INFO';
const SUCCESS_POST_PRODUCT_INFO = 'product/SUCCESS_POST_PRODUCT_INFO';
const REQUEST_DELETE_PRODUCT_INFO = 'product/REQUEST_DELETE_PRODUCT_INFO';
const SUCCESS_DELETE_PRODUCT_INFO = 'product/SUCCESS_DELETE_PRODUCT_INFO';
const REQUEST_GET_PRODUCT_INFO_LIST = 'product/REQUEST_GET_PRODUCT_INFO_LIST';
const SUCCESS_GET_PRODUCT_INFO_LIST = 'product/SUCCESS_GET_PRODUCT_INFO_LIST';

// original product_info
const REQUEST_GET_ORIGINAL_PRODUCT_INFO_LIST = 'product/REQUEST_GET_ORIGINAL_PRODUCT_INFO_LIST';
const SUCCESS_GET_ORIGINAL_PRODUCT_INFO_LIST = 'product/SUCCESS_GET_ORIGINAL_PRODUCT_INFO_LIST';

const REQUEST_GET_PRODUCT_INFO = 'product/REQUEST_GET_PRODUCT_INFO';
const SUCCESS_GET_PRODUCT_INFO = 'product/SUCCESS_GET_PRODUCT_INFO';
const REQUEST_CHANGE_PRODUCT_INFO = 'product/REQUEST_CHANGE_PRODUCT_INFO';
const SUCCESS_CHANGE_PRODUCT_INFO = 'product/SUCCESS_CHANGE_PRODUCT_INFO';

// manufacturer
const REQUEST_POST_MANUFACTURER = 'product/REQUEST_POST_MANUFACTURER';
const SUCCESS_POST_MANUFACTURER = 'product/SUCCESS_POST_MANUFACTURER';
const REQUEST_GET_MANUFACTURER_LIST = 'product/REQUEST_GET_MANUFACTURER_LIST';
const SUCCESS_GET_MANUFACTURER_LIST = 'product/SUCCESS_GET_MANUFACTURER_LIST';

// state management
const CLEAR_ALL = 'product/CLEAR_ALL';
const POST_FAILURE = 'product/POST_FAILURE';
const RESET_SUCCESS_STATE = 'product/RESET_SUCCESS_STATE';

// Action Creators
export const requestInitialInfo = createAction(REQUEST_INITIAL_INFO);
export const successInitialInfo = createAction(SUCCESS_INITIAL_INFO);

export const requestCountInfo = createAction(REQUEST_COUNT_INFO);
export const successCountInfo = createAction(SUCCESS_COUNT_INFO);

export const requestExpiryList = createAction(REQUEST_EXPIRY_LIST);
export const successExpiryList = createAction(SUCCESS_EXPIRY_LIST);
export const requestRunningOutList = createAction(REQUEST_RUNNING_OUT_LIST);
export const successRunningOutList = createAction(SUCCESS_RUNNING_OUT_LIST);

//stock
export const resetScannedStockList = createAction(RESET_SCANNED_STOCK_LIST);
export const addScannedStock = createAction(ADD_SCANNED_STOCK);

export const requestPostStock = createAction(REQUEST_POST_STOCK);
export const successPostStock = createAction(SUCCESS_POST_STOCK);
export const requestDeleteStock = createAction(REQUEST_DELETE_STOCK);
export const successDeleteStock = createAction(SUCCESS_DELETE_STOCK);
export const requestReturnStock = createAction(REQUEST_RETURN_STOCK);
export const successReturnStock = createAction(SUCCESS_RETURN_STOCK);

export const requestStockList = createAction(REQUEST_STOCK_LIST);
export const successStockList = createAction(SUCCESS_STOCK_LIST);
export const requestDeleteStockByID = createAction(REQUEST_DELETE_STOCK_BY_ID)
export const successDeleteStockByID = createAction(SUCCESS_DELETE_STOCK_BY_ID)

//product info
export const requestPostProductInfo = createAction(REQUEST_POST_PRODUCT_INFO);
export const successPostProductInfo = createAction(SUCCESS_POST_PRODUCT_INFO);
export const requestDeleteProductInfo = createAction(REQUEST_DELETE_PRODUCT_INFO);
export const successDeleteProductInfo = createAction(SUCCESS_DELETE_PRODUCT_INFO);
export const requestGetProductInfoList = createAction(REQUEST_GET_PRODUCT_INFO_LIST);
export const successGetProductInfoList = createAction(SUCCESS_GET_PRODUCT_INFO_LIST);

//original
export const requestGetOriginalProductInfoList = createAction(REQUEST_GET_ORIGINAL_PRODUCT_INFO_LIST);
export const successGetOriginalProductInfoList = createAction(SUCCESS_GET_ORIGINAL_PRODUCT_INFO_LIST);

export const requestGetProductInfo = createAction(REQUEST_GET_PRODUCT_INFO);
export const successGetProductInfo = createAction(SUCCESS_GET_PRODUCT_INFO);
export const requestChangeProductInfo = createAction(REQUEST_CHANGE_PRODUCT_INFO);
export const successChangeProductInfo = createAction(SUCCESS_CHANGE_PRODUCT_INFO);

//manufacturer
export const requestPostManufacturer = createAction(REQUEST_POST_MANUFACTURER);
export const successPostManufacturer = createAction(SUCCESS_POST_MANUFACTURER);
export const requestGetManufacturerList = createAction(REQUEST_GET_MANUFACTURER_LIST);
export const successGetManufacturerList = createAction(SUCCESS_GET_MANUFACTURER_LIST);

//stat management
export const clearAll = createAction(CLEAR_ALL);
export const postFailure = createAction(POST_FAILURE);
export const resetSuccessState = createAction(RESET_SUCCESS_STATE);

const initialState = {
  count: [],
  expiry_list: [],
  running_out_list: [],
  product_info_list: [],
  original_product_info_list: [],
  manufacturer_list: [],
  scanned_stock_list: [],
  stock_list: [],
  product_detail: undefined,
  is_post_success: false,
  is_post_failure: false,
  message: '',
};

export default handleActions({
  [CLEAR_ALL]: (state, action) => {
    return {
      ...state,
      product_detail: undefined,
    }
  },

  [RESET_SCANNED_STOCK_LIST]: (state, action) => {
    return {
      ...state,
      scanned_stock_list: [],
    }
  },

  [ADD_SCANNED_STOCK]: (state, action) => {
    return {
      ...state,
      scanned_stock_list: [
        ...state.scanned_stock_list,
        action.payload,
      ]
    }
  },

  [SUCCESS_STOCK_LIST]: (state, action) => {
    return {
      ...state,
      stock_list: action.payload,
    }
  },

  [SUCCESS_INITIAL_INFO]: (state, action) => {
    return {
      ...state,
      product_info_list: action.payload,
    }
  },

  [SUCCESS_COUNT_INFO]: (state, action) => {
    return {
      ...state,
      count: action.payload,
    }
  },

  [SUCCESS_EXPIRY_LIST]: (state, action) => {
    return {
      ...state,
      expiry_list: action.payload,
    }
  },

  [SUCCESS_RUNNING_OUT_LIST]: (state, action) => {
    return {
      ...state,
      running_out_list: action.payload,
    }
  },

  [SUCCESS_GET_MANUFACTURER_LIST]: (state, action) => {
    return {
      ...state,
      manufacturer_list: action.payload,
    }
  },

  [SUCCESS_GET_PRODUCT_INFO_LIST]: (state, action) => {
    return {
      ...state,
      product_info_list: action.payload,
    }
  },

  [SUCCESS_GET_PRODUCT_INFO]: (state, action) => {
    return {
      ...state,
      product_detail: action.payload,
    }
  },

  [SUCCESS_GET_ORIGINAL_PRODUCT_INFO_LIST]: (state, action) => {
    return {
      ...state,
      original_product_info_list: action.payload,
    }
  },

  [combineActions(
    SUCCESS_POST_STOCK,
    SUCCESS_POST_PRODUCT_INFO,
    SUCCESS_DELETE_STOCK,
    SUCCESS_DELETE_STOCK_BY_ID,
    SUCCESS_RETURN_STOCK,
    SUCCESS_DELETE_PRODUCT_INFO,
    SUCCESS_CHANGE_PRODUCT_INFO)]: (state, action) => {
    return {
      ...state,
      is_post_success: true,
      message: action.payload,
    }
  },

  [POST_FAILURE]: (state, action) => {
    return {
      ...state,
      is_post_failure: true,
      message: action.payload,
    }
  },

  [RESET_SUCCESS_STATE]: (state, action) => {
    return {
      ...state,
      is_post_success: false,
      is_post_failure: false,
      message: '',
    }
  }

}, initialState);
