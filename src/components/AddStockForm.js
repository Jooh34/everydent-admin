import { Component } from "react";
import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
} from "shards-react";

import BarcodeReader from 'react-barcode-reader'

import { connect } from 'react-redux';

import CodeParser from '../data/CodeParser';

import { requestGetManufacturerList, requestGetOriginalProductInfoList,
  resetScannedStockList, addScannedStock,
  requestPostStock, resetSuccessState } from '../redux/modules/product';

class AddStockForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmiting: false,
    }
  }

  componentWillMount() {
    this.props.requestGetManufacturerList();
    this.props.requestGetOriginalProductInfoList();
    this.props.resetScannedStockList();
  }

  handleScan = (code) => {
    const { original_product_info_list, manufacturer_list } = this.props.product;
    const data = CodeParser(code, original_product_info_list, manufacturer_list);

    // ERROR : not registed
    if (data.product_code === undefined || data.product_name === undefined) {
      window.alert("등록되지 않은 제품입니다. '제품 추가' 메뉴에서 제품을 먼저 추가해주세요.");
      return;
    }

    this.props.addScannedStock({
      name: data.product_name,
      product_info: data.product_id,
      code: data.product_code,
      manufacturer: data.manufacturer_id,
      manufacturer_name: data.manufacturer_name,
      full_code: code,
      expiry_start: data.expiry_start,
      expiry_end: data.expiry_end,
    });
  }

  handleError = (err) => {
    console.log(err)
  }

  handleSubmit = (e) => {
    this.setState({
      isSubmiting: false,
    });
    this.props.requestPostStock();
  }
  render() {
    if (this.props.product.is_post_success || this.props.product.is_post_failure) {
      window.alert(this.props.product.message);
      this.props.resetSuccessState();
      window.location.reload();
    }
    //Loading
    if (this.props.product.original_product_info_list.length === 0) {
      return (
        <div>Loading....</div>
      )
    }

    const btnStyle = {
      float: 'right',
    }

    const { scanned_stock_list } = this.props.product;
    return (
      <div>
        <BarcodeReader
          onError={this.handleError}
          onScan={this.handleScan}
        />
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            스캔 제품 목록 (제품을 계속 스캔해주세요.)
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    #
                  </th>
                  <th scope="col" className="border-0">
                    제품명
                  </th>
                  <th scope="col" className="border-0">
                    코드
                  </th>
                  <th scope="col" className="border-0">
                    제조사
                  </th>
                  <th scope="col" className="border-0">
                    제조일자
                  </th>
                  <th scope="col" className="border-0">
                    유통기한
                  </th>
                </tr>
              </thead>
              <tbody>
                {scanned_stock_list.map((stock, i) => {
                  return (<TableRow index={i} key={i} data={stock} />)
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Button style={btnStyle} onClick={this.handleSubmit}>추가</Button>
        {/*<Button theme='danger' onClick={() => this.handleScan('010880638822090810190307A0671-01111903071724030621199240IF4510C-01')}>
          Don't Click this button (this is for test)
        </Button>*/}
      </div>
    )
  }
}

class TableRow extends Component {
  render() {
    const { index, data } = this.props;
    return(
      <tr>
        <td>{index+1}</td>
        <td>{data.name}</td>
        <td>{data.code}</td>
        <td>{data.manufacturer_name}</td>
        <td>{data.expiry_start}</td>
        <td>{data.expiry_end}</td>
      </tr>
    );
  }
}

let mapStateToProps = (state) => {
    return {
      product: state.product,
    };
};

let mapDispatchToProps = (dispatch) => {
  return {
    requestGetManufacturerList: () => dispatch(requestGetManufacturerList()),
    requestGetOriginalProductInfoList: () => dispatch(requestGetOriginalProductInfoList()),
    resetScannedStockList: () => dispatch(resetScannedStockList()),
    addScannedStock: (payload) => dispatch(addScannedStock(payload)),
    requestPostStock: () => dispatch(requestPostStock()),
    resetSuccessState: () => dispatch(resetSuccessState()),
  };
};

AddStockForm = connect(mapStateToProps, mapDispatchToProps)(AddStockForm);
export default AddStockForm;
