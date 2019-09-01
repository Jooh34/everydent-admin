import { select, takeEvery, call, put } from 'redux-saga/effects';

import {
  successInitialInfo,
  successPostStock,
  successDeleteStock,
  successStockList,
  successDeleteStockByID,
  successGetProductInfoList,
  successPostProductInfo,
  successDeleteProductInfo,
  successGetProductInfo,
  successChangeProductInfo,
  successGetManufacturerList,
  successCountInfo,
  successExpiryList,
  postFailure,
} from '../redux/modules/product';

import {
  getRequest,
  postRequest,
  deleteRequest,
} from './api'

export const getProductForm = (state) => state.form.product.values;
export const getProductState = (state) => state.product;

function* requestInitialInfo() {
  let sub_url = `/product_infos/`;

  try {
    const response = yield call(getRequest, sub_url);
    const data = response.data;

    yield put(successInitialInfo(data));
  } catch (error) {
    console.log('error:' + error)
    yield put(postFailure(error));
  }
}

function* requestCountInfo() {
  let sub_url = `/count/`;

  try {
    const response = yield call(getRequest, sub_url);
    const data = response.data;

    yield put(successCountInfo(data));
  } catch (error) {
    console.log('error:' + error)
  }
}

function* requestExpiryList() {
  let sub_url = `/expiry_list/`;
  console.log('requestExpiryList')
  try {
    const response = yield call(getRequest, sub_url);
    const data = response.data;

    console.log(data)
    yield put(successExpiryList(data));
  } catch (error) {
    console.log('error:' + error)
  }
}

function* requestPostStock() {
  let sub_url = `/products/`;
  let product = yield select(getProductState);
  let data = product.scanned_stock_list;
  console.log(data)

  try {
    yield call(postRequest, sub_url, data);
    yield put(successPostStock(`재고가 성공적으로 추가되었습니다`));
  } catch (error) {
    console.log('error:' + error)
    yield put(postFailure(error));
  }
}

function* requestDeleteStock() {
  let sub_url = `/products/`;
  let data = yield select(getProductForm);

  try {
    const response = yield call(deleteRequest, sub_url, data);
    if (response.status === 200) {
      yield put(successDeleteStock(`제품명: ${data.name}\n재고가 성공적으로 사용되었습니다`));
    }
    else if (response.status === 204) {
      yield put(successDeleteStock(`해당 바코드 정보의 재고가 존재하지 않습니다.`));
    }
  } catch (error) {
    console.log('error:' + error);
    yield put(postFailure(error));
  }
}

function* requestDeleteStockByID(action) {
  let sub_url = `/products/${action.payload}/`;

  try {
    const response = yield call(deleteRequest, sub_url);
    if (response.status === 200) {
      yield put(successDeleteStockByID(`제품명: ${response.data.name}\n재고가 성공적으로 사용되었습니다`));
    }
    else if (response.status === 204) {
      yield put(successDeleteStockByID(`해당 정보의 재고가 존재하지 않습니다.`));
    }
  } catch (error) {
    console.log('error:' + error);
    yield put(postFailure(error));
  }
}

function* requestStockList(action) {
  let sub_url = `/stock_list/${action.payload}/`;

  try {
    const response = yield call(getRequest, sub_url);
    const data = response.data;

    yield put(successStockList(data));
  } catch (error) {
    console.log('error:' + error);
  }
}

function* requestPostProductInfo() {
  let sub_url = `/product_infos/`;
  let data = yield select(getProductForm);
  console.log(JSON.stringify(data));

  try {
    yield call(postRequest, sub_url, data);
    yield put(successPostProductInfo(`제품명: ${data.name}\n제품이 성공적으로 추가되었습니다`));
  } catch (error) {
    console.log('error:' + error);
    yield put(postFailure(error));
  }
}

function* requestGetProductInfoList() {
  let sub_url = `/product_infos/`;

  try {
    const response = yield call(getRequest, sub_url);
    const data = response.data;

    yield put(successGetProductInfoList(data));
  } catch (error) {
    console.log('error:' + error);
    yield put(postFailure(error));
  }
}

function* requestDeleteProductInfo(action) {
  let sub_url = `/product_infos/${action.payload}/`;

  try {
    const response = yield call(deleteRequest, sub_url);
    const data = response.data;

    yield put(successDeleteProductInfo(`제품명: ${data.name}\n제품이 성공적으로 삭제되었습니다`));
  } catch (error) {
    console.log('error:' + error);
    yield put(postFailure(error));
  }
}

function* requestGetProductInfo(action) {
  let sub_url = `/product_infos/${action.payload}/`;

  try {
    const response = yield call(getRequest, sub_url);
    const data = response.data;

    yield put(successGetProductInfo(data));
  } catch (error) {
    console.log('error:' + error);
    yield put(postFailure(error));
  }
}

function* requestChangeProductInfo(action) {
  let sub_url = `/product_infos/${action.payload}/`;
  let data = yield select(getProductForm);
  console.log(JSON.stringify(data));

  try {
    yield call(postRequest, sub_url, data);

    yield put(successChangeProductInfo(`제품명: ${data.name}\n제품이 성공적으로 변경되었습니다`));
  } catch (error) {
    console.log('error:' + error);
    yield put(postFailure(error));
  }
}

function* requestPostManufacturer() {
  let sub_url = `/manufacturers/`;
  let data = yield select(getProductForm);

  yield call(postRequest, sub_url, data);
}

function* requestGetManufacturerList() {
  let sub_url = `/manufacturers/`;

  try {
    const response = yield call(getRequest, sub_url);
    const data = response.data;

    yield put(successGetManufacturerList(data));
  } catch (error) {
    console.log('error:' + error);
    yield put(postFailure(error));
  }
}

function* rootSaga() {
  yield takeEvery('product/REQUEST_INITIAL_INFO', requestInitialInfo);
  yield takeEvery('product/REQUEST_COUNT_INFO', requestCountInfo);
  yield takeEvery('product/REQUEST_EXPIRY_LIST', requestExpiryList);

  yield takeEvery('product/REQUEST_POST_STOCK', requestPostStock);
  yield takeEvery('product/REQUEST_DELETE_STOCK', requestDeleteStock);
  yield takeEvery('product/REQUEST_STOCK_LIST', requestStockList);
  yield takeEvery('product/REQUEST_DELETE_STOCK_BY_ID', requestDeleteStockByID);

  yield takeEvery('product/REQUEST_POST_PRODUCT_INFO', requestPostProductInfo);
  yield takeEvery('product/REQUEST_GET_PRODUCT_INFO_LIST', requestGetProductInfoList);
  yield takeEvery('product/REQUEST_DELETE_PRODUCT_INFO', requestDeleteProductInfo);
  yield takeEvery('product/REQUEST_GET_PRODUCT_INFO', requestGetProductInfo);
  yield takeEvery('product/REQUEST_CHANGE_PRODUCT_INFO', requestChangeProductInfo);

  yield takeEvery('product/REQUEST_POST_MANUFACTURER', requestPostManufacturer);
  yield takeEvery('product/REQUEST_GET_MANUFACTURER_LIST', requestGetManufacturerList);
}

export default rootSaga;
