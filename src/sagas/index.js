import { select, takeEvery, call, put } from 'redux-saga/effects';

import {
  successInitialInfo,
  successPostStock,
  successDeleteStock,
  successReturnStock,
  successStockList,
  successChangeStockStatus,
  successGetProductInfoList,
  successGetOriginalProductInfoList,
  successPostProductInfo,
  successDeleteProductInfo,
  successGetProductInfo,
  successChangeProductInfo,
  successGetManufacturerList,
  successCountInfo,
  successExpiryList,
  successRunningOutList,
  successSetMinStock,
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
  try {
    const response = yield call(getRequest, sub_url);
    const data = response.data;

    console.log(data)
    yield put(successExpiryList(data));
  } catch (error) {
    console.log('error:' + error)
  }
}

function* requestRunningOutList() {
  let sub_url = `/running_out_list/`;
  console.log('requestRunningOutList')
  try {
    const response = yield call(getRequest, sub_url);
    const data = response.data;

    console.log(data)
    yield put(successRunningOutList(data));
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
  let sub_url = `/products/status/`;
  let product = yield select(getProductState);
  let data = {
    'list': product.scanned_stock_list,
    'status': 2
  };

  try {
    const response = yield call(postRequest, sub_url, data);
    if (response.status === 200) {
      if (response.data.error_message) {
        yield put(successDeleteStock(response.data.error_message));
      }
      else {
        yield put(successDeleteStock(`재고가 성공적으로 사용되었습니다`));
      }
    }
  } catch (error) {
    console.log('error:' + error);
    yield put(postFailure(error));
  }
}

function* requestChangeStockStatus(action) {
  let sub_url = `/products/status/${action.payload.id}/`;
  let data = {
    status: action.payload.status
  };

  try {
    const response = yield call(postRequest, sub_url, data);
    if (response.status === 200) {
      yield put(successChangeStockStatus(`제품명: ${response.data.name}\n재고가 성공적으로 처리되었습니다.`));
    }
    else if (response.status === 204 || response.status === 404) {
      yield put(successChangeStockStatus(`해당 정보의 재고가 존재하지 않습니다.`));
    }
  } catch (error) {
    console.log('error:' + error);
    yield put(postFailure(error));
  }
}

function* requestReturnStock() {
  let sub_url = `/products/status/`;
  let product = yield select(getProductState);
  let data = {
    'list': product.scanned_stock_list,
    'status': 3,
  }

  try {
    const response = yield call(postRequest, sub_url, data);
    console.log(response)
    if (response.status === 200) {
      if (response.data.error_message) {
        yield put(successReturnStock(response.data.error_message));
      }
      else {
        yield put(successReturnStock(`재고가 성공적으로 반품되었습니다`));
      }
    }
  } catch (error) {
    console.log('error:' + error);
    yield put(postFailure(error));
  }
}

function* requestStockList(action) {
  let sub_url = `/stock_list/${action.payload.id}?status=${action.payload.status}`;

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
    console.log('error:' + '식별되지 않는 바코드 번호입니다. 바코드번호를 관리자에게 문의해주세요.');
    yield put(postFailure('error:' + '식별되지 않는 바코드 번호입니다. 바코드번호를 관리자에게 문의해주세요.'));
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

function* requestGetOriginalProductInfoList() {
  let sub_url = `/product_infos/all/`;

  try {
    const response = yield call(getRequest, sub_url);
    const data = response.data;

    yield put(successGetOriginalProductInfoList(data));
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

function* requestSetMinStock(action) {
  let sub_url = `/product_infos/min_stock/`;
  let data = action.payload;
  console.log(JSON.stringify(data));

  try {
    yield call(postRequest, sub_url, data);

    yield put(successSetMinStock(`최소 개수 설정이 완료되었습니다.`));
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
  yield takeEvery('product/REQUEST_RUNNING_OUT_LIST', requestRunningOutList);

  yield takeEvery('product/REQUEST_POST_STOCK', requestPostStock);
  yield takeEvery('product/REQUEST_DELETE_STOCK', requestDeleteStock);
  yield takeEvery('product/REQUEST_RETURN_STOCK', requestReturnStock);

  yield takeEvery('product/REQUEST_STOCK_LIST', requestStockList);
  yield takeEvery('product/REQUEST_CHANGE_STOCK_STATUS', requestChangeStockStatus);

  yield takeEvery('product/REQUEST_POST_PRODUCT_INFO', requestPostProductInfo);
  yield takeEvery('product/REQUEST_GET_PRODUCT_INFO_LIST', requestGetProductInfoList);
  yield takeEvery('product/REQUEST_GET_ORIGINAL_PRODUCT_INFO_LIST', requestGetOriginalProductInfoList);
  yield takeEvery('product/REQUEST_DELETE_PRODUCT_INFO', requestDeleteProductInfo);
  yield takeEvery('product/REQUEST_GET_PRODUCT_INFO', requestGetProductInfo);

  yield takeEvery('product/REQUEST_CHANGE_PRODUCT_INFO', requestChangeProductInfo);
  yield takeEvery('product_list/REQUEST_SET_MIN_STOCK', requestSetMinStock);

  yield takeEvery('product/REQUEST_POST_MANUFACTURER', requestPostManufacturer);
  yield takeEvery('product/REQUEST_GET_MANUFACTURER_LIST', requestGetManufacturerList);
}

export default rootSaga;
