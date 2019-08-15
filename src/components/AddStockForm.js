import { Component } from "react";
import React from "react";
import {
  Button,
  Col,
  ListGroup,
  ListGroupItem,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "shards-react";

import BarcodeReader from 'react-barcode-reader'

import { connect } from 'react-redux';
import { reduxForm, Field } from "redux-form";

import CodeParser from '../data/CodeParser';

import { requestGetManufacturerList, requestGetProductInfoList, requestPostStock } from '../redux/modules/product';

class AddStockForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScanned: false,
    }
  }

  componentWillMount() {
    this.props.requestGetManufacturerList();
    this.props.requestGetProductInfoList();
  }

  handleScan = (code) => {
    const { product_info_list, manufacturer_list } = this.props.product;

    console.log(code);
    const data = CodeParser(code, product_info_list, manufacturer_list);
    this.props.initialize({ name: data.product_name, product_info: data.product_id, code: data.product_code, manufacturer: data.manufacturer_id, full_code: code });

    // ERROR
    if (this.state.name == undefined || this.state.code == undefined) {
      window.alert("등록되지 않은 제품입니다. '제품 추가' 메뉴에서 제품을 먼저 추가해주세요.");
      return;
    }

    this.setState(
      {
        isScanned: true,
      }
    )
  }

  handleError = (err) => {
    console.log(err)
  }

  handleSubmit = (e) => {
    this.props.requestPostStock();
  }
  render() {
    const { manufacturer_list } = this.props.product;
    return (
      <Col sm="12" md="8">
        <BarcodeReader
          onError={this.handleError}
          onScan={this.handleScan}
        />
        <ListGroup flush>
          <ListGroupItem className="px-3">
            {
              (this.state.isScanned) ?
              <Form onSubmit={this.handleSubmit}>
                <strong className="text-muted d-block mb-2"> 재고 정보 </strong>
                <InputGroup className="mb-3">
                  <InputGroupAddon type="prepend">
                    <InputGroupText>이름</InputGroupText>
                  </InputGroupAddon>
                  <Field name="name" component="input" type="text" disabled/>
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroupAddon type="prepend">
                    <InputGroupText>제품id</InputGroupText>
                  </InputGroupAddon>
                  <Field name="product_info" component="input" type="text" disabled/>
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroupAddon type="prepend">
                    <InputGroupText>코드</InputGroupText>
                  </InputGroupAddon>
                  <Field name="code" component="input" type="text" disabled/>
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroupAddon type="prepend">
                    <InputGroupText>전체 코드</InputGroupText>
                  </InputGroupAddon>
                  <Field name="full_code" component="input" type="text" disabled/>
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroupAddon type="prepend">
                    <InputGroupText>제조사</InputGroupText>
                  </InputGroupAddon>
                  <Field name="manufacturer" component="select" disabled>
                    {
                      manufacturer_list.map((manufacturer, i) => {
                        return (
                          <option key={i} value={manufacturer.id}> {manufacturer.name} </option>
                        )
                      })
                    }
                  </Field>
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroupAddon type="prepend">
                    <InputGroupText>제조일자</InputGroupText>
                  </InputGroupAddon>
                  <Field name="made_date" component="input" type="text" disabled/>
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroupAddon type="prepend">
                    <InputGroupText>유통기한</InputGroupText>
                  </InputGroupAddon>
                  <Field name="expiry_date" component="input" type="text" disabled/>
                </InputGroup>
                <Button type='submit'>추가</Button>
              </Form>
              :
              <strong className="text-muted d-block mb-2"> 제품을 스캔해주세요. </strong>
            }
          </ListGroupItem>
        </ListGroup>
      </Col>
    )
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
    requestGetProductInfoList: () => dispatch(requestGetProductInfoList()),
    requestPostStock: () => dispatch(requestPostStock()),
  };
};

AddStockForm= reduxForm({
  form: 'product'
})(AddStockForm)

AddStockForm = connect(mapStateToProps, mapDispatchToProps)(AddStockForm);
export default AddStockForm;
