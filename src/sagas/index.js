import { select, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  successInitialInfo,
  successGetProductInfoList,
  successGetManufacturerList,
  successCountInfo
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

function* requestPostStock() {
  let sub_url = `/products/`;
  let data = yield select(getProductForm);
  console.log(data)
  try {
    const response = yield call(postRequest, sub_url, data);
    console.log(response)
  } catch (error) {
    console.log('error:' + error)
  }
}

function* requestDeleteStock() {
  let sub_url = `/products/`;
  let data = yield select(getProductForm);
  console.log(data)
  try {
    const response = yield call(deleteRequest, sub_url, data);
    console.log(response)
  } catch (error) {
    console.log('error:' + error)
  }
}

function* requestPostProductInfo() {
  let sub_url = `/product_infos/`;
  let data = yield select(getProductForm);
  console.log(JSON.stringify(data));
  const response = yield call(postRequest, sub_url, data);

  console.log('----- POST DATA -------')
  console.log(JSON.stringify(response.data));
}

function* requestGetProductInfoList() {
  let sub_url = `/product_infos/`;

  try {
    const response = yield call(getRequest, sub_url);
    const data = response.data;

    yield put(successGetProductInfoList(data));
  } catch (error) {
    console.log('error:' + error)
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
    console.log('error:' + error)
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
