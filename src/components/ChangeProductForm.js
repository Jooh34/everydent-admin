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
import { axios } from 'axios';

import { requestGetManufacturerList, requestGetProductInfoList, requestPostProductInfo, resetSuccessState } from '../redux/modules/product';
import CodeParser from '../data/CodeParser';

class ChangeProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScanned: false,
    }
  }

  componentWillMount() {
  }

  render() {
    const { manufacturer_list } = this.props.product;
    if (this.props.product.is_post_success || this.props.product.is_post_failure) {
      window.alert(this.props.product.message);
      this.props.resetSuccessState();
    }
    return (
      <Col sm="12" md="8">
        <ListGroup flush>
          <ListGroupItem className="px-3">
            <Form>
              <strong className="text-muted d-block mb-2"> 제품 정보 </strong>
              <InputGroup className="mb-3">
                <InputGroupAddon type="prepend">
                  <InputGroupText>이름</InputGroupText>
                </InputGroupAddon>
                <Field name="name" component="input" type="text" />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroupAddon type="prepend">
                  <InputGroupText>제품 코드</InputGroupText>
                </InputGroupAddon>
                <Field disabled name="code" component="input" type="text"  />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroupAddon type="prepend">
                  <InputGroupText>전체 코드</InputGroupText>
                </InputGroupAddon>
                <Field disabled name="full_code" component="input" type="text"  />
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
              <Button>추가</Button>
            </Form>
          </ListGroupItem>
        </ListGroup>
      </Col>
    )
  }
}
let mapStateToProps = (state) => {
    return {
      product: state.product,
      product_form: state.form.product,
    };
};

let mapDispatchToProps = (dispatch) => {
  return {
    requestGetManufacturerList: () => dispatch(requestGetManufacturerList()),
    requestGetProductInfoList: () => dispatch(requestGetProductInfoList()),
    requestPostProductInfo: () => dispatch(requestPostProductInfo()),
    resetSuccessState: () => dispatch(resetSuccessState()),
  };
};

ChangeProductForm= reduxForm({
  form: 'product'
})(ChangeProductForm)

ChangeProductForm = connect(mapStateToProps, mapDispatchToProps)(ChangeProductForm);
export default ChangeProductForm;
