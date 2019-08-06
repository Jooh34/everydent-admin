import { createAction, handleActions } from 'redux-actions';

// Actions
const REQUEST_INITIAL_INFO = 'product/REQUEST_INITIAL_INFO';
const SUCCESS_INITIAL_INFO = 'product/SUCCESS_INITIAL_INFO';

const REQUEST_COUNT_INFO = 'product/REQUEST_COUNT_INFO';
const SUCCESS_COUNT_INFO = 'product/SUCCESS_COUNT_INFO';

// stock
const REQUEST_POST_STOCK = 'product/REQUEST_POST_STOCK';
const SUCCESS_POST_STOCK = 'product/SUCCESS_POST_STOCK';

// product_info
const REQUEST_POST_PRODUCT_INFO = 'product/REQUEST_POST_PRODUCT_INFO';
const SUCCESS_POST_PRODUCT_INFO = 'product/SUCCESS_POST_PRODUCT_INFO';
const REQUEST_GET_PRODUCT_INFO_LIST = 'product/REQUEST_GET_PRODUCT_INFO_LIST';
const SUCCESS_GET_PRODUCT_INFO_LIST = 'product/SUCCESS_GET_PRODUCT_INFO_LIST';

// manufacturer
const REQUEST_POST_MANUFACTURER = 'product/REQUEST_POST_MANUFACTURER';
const SUCCESS_POST_MANUFACTURER = 'product/SUCCESS_POST_MANUFACTURER';
const REQUEST_GET_MANUFACTURER_LIST = 'product/REQUEST_GET_MANUFACTURER_LIST';
const SUCCESS_GET_MANUFACTURER_LIST = 'product/SUCCESS_GET_MANUFACTURER_LIST';

const SCAN_CODE = 'product/SCAN_CODE';

// Action Creators
export const requestInitialInfo = createAction(REQUEST_INITIAL_INFO);
export const successInitialInfo = createAction(SUCCESS_INITIAL_INFO);

export const requestCountInfo = createAction(REQUEST_COUNT_INFO);
export const successCountInfo = createAction(SUCCESS_COUNT_INFO);

export const requestPostStock = createAction(REQUEST_POST_STOCK);
export const successPostStock = createAction(SUCCESS_POST_STOCK);

export const requestPostProductInfo = createAction(REQUEST_POST_PRODUCT_INFO);
export const successPostProductInfo = createAction(SUCCESS_POST_PRODUCT_INFO);
export const requestGetProductInfoList = createAction(REQUEST_GET_PRODUCT_INFO_LIST);
export const successGetProductInfoList = createAction(SUCCESS_GET_PRODUCT_INFO_LIST);

export const requestPostManufacturer = createAction(REQUEST_POST_MANUFACTURER);
export const successPostManufacturer = createAction(SUCCESS_POST_MANUFACTURER);
export const requestGetManufacturerList = createAction(REQUEST_GET_MANUFACTURER_LIST);
export const successGetManufacturerList = createAction(SUCCESS_GET_MANUFACTURER_LIST);


export const scanCode = createAction(SCAN_CODE);



const initialState = {
  product_info_list: [],
  manufacturer_list: [],
  name: '',
  full_code: '',
  code: '',
  manufacturer: '',
  made_date: '',
  expiry_date: '',
  count: [],
};

export default handleActions({
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

  [SCAN_CODE]: (state, action) => {
    return {
      ...state,
      name: action.product.name,
      code: action.product.code,
      manufacturer: action.product.manufacturer,
      made_date: action.product.made_date,
      expiry_date: action.product.expiry_date,
    };
  },
}, initialState);
