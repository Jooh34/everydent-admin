import { select, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  successInitialInfo,
  successPostStock,
  successDeleteStock,
  successGetProductInfoList,
  successPostProductInfo,
  successGetManufacturerList,
  successCountInfo,
  postFailure,
} from '../redux/modules/product';

export const getProductForm = (state) => state.form.product.values;
let domain = 'http://' + window.location.hostname;
let port = 8000;

function getRequest(sub_url) {
  let url = domain + ':' + port + sub_url;
  return axios ({
    method: 'get',
    url: url
  })
}

function postRequest(sub_url, data) {
  let url = domain + ':' + port + sub_url;
  return axios ({
    method: 'post',
    url: url,
    data: data,
  })
}

function deleteRequest(sub_url, data) {
  let url = domain + ':' + port + sub_url;
  return axios ({
    method: 'delete',
    url: url,
    data: data,
  })
}

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
    yield put(postFailure(error));
  }
}

function* requestPostStock() {
  let sub_url = `/products/`;
  let data = yield select(getProductForm);

  try {
    const response = yield call(postRequest, sub_url, data);
    yield put(successPostStock(`제품명: ${data.name}\n재고가 성공적으로 추가되었습니다`));
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

function* requestPostProductInfo() {
  let sub_url = `/product_infos/`;
  let data = yield select(getProductForm);
  console.log(JSON.stringify(data));

  try {
    const response = yield call(postRequest, sub_url, data);
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

function* requestPostManufacturer() {
  let sub_url = `/manufacturers/`;
  let data = yield select(getProductForm);
  console.log(JSON.stringify(data));
  const response = yield call(postRequest, sub_url, data);

  console.log('----- POST DATA -------')
  console.log(JSON.stringify(response.data));
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
  yield takeEvery('product/REQUEST_POST_STOCK', requestPostStock);
  yield takeEvery('product/REQUEST_DELETE_STOCK', requestDeleteStock);
  yield takeEvery('product/REQUEST_POST_PRODUCT_INFO', requestPostProductInfo);
  yield takeEvery('product/REQUEST_GET_PRODUCT_INFO_LIST', requestGetProductInfoList);
  yield takeEvery('product/REQUEST_POST_MANUFACTURER', requestPostManufacturer);
  yield takeEvery('product/REQUEST_GET_MANUFACTURER_LIST', requestGetManufacturerList);
}

export default rootSaga;
