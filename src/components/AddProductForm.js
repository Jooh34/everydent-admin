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

import { requestGetManufacturerList, requestGetOriginalProductInfoList, requestPostProductInfo, resetSuccessState } from '../redux/modules/product';
import CodeParser from '../data/CodeParser';

class AddProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScanned: false,
    }
  }

  componentWillMount() {
    this.props.requestGetManufacturerList();
    this.props.requestGetOriginalProductInfoList();
  }

  handleScan = (code) => {
    const { original_product_info_list, manufacturer_list } = this.props.product;
    console.log(code);

    const data = CodeParser(code, original_product_info_list, manufacturer_list);
    console.log(data)
    // Error : already registered
    if (data.product_name) {
      window.alert("이미 등록된 제품입니다.");
      return;
    }

    this.props.initialize({
      name: '',
      code: data.product_code,
      manufacturer: data.manufacturer_id,
      full_code:code
    });

    this.setState(
      {
        isScanned: true,
      }
    )
  }
  handleError = (err) => {
    console.log(err)
  }
  handleSubmit = () => {
    this.props.requestPostProductInfo();
  }
  render() {
    const { manufacturer_list } = this.props.product;
    if (this.props.product.is_post_success || this.props.product.is_post_failure) {
      window.alert(this.props.product.message);
      this.props.resetSuccessState();
      window.location.reload();
      this.props.history.push("/product/")
    }
    return (
      <Col sm="12" md="8">
        <BarcodeReader
          stopPropagation={true}
          onError={this.handleError}
          onScan={this.handleScan}
        />
        <ListGroup flush>
          <ListGroupItem className="px-3">
            {
              (this.state.isScanned) ?
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
                  <Field name="manufacturer" component="select">
                    {
                      manufacturer_list.map((manufacturer, i) => {
                        return (
                          <option key={i} value={manufacturer.id}> {manufacturer.name} </option>
                        )
                      })
                    }
                  </Field>
                </InputGroup>
                <Button onClick={() => this.handleSubmit()}>추가</Button>
              </Form>
              :
              <div>
              <strong className="text-muted d-block mb-2"> 제품을 스캔해주세요. </strong>
              {/*<Button onClick={() => this.handleScan('010880638822090810190307A0671-01111903071724030621199240IF4510C-01')}>Don't Click this button (this is for test)</Button>*/}
              </div>
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
      product_form: state.form.product,
    };
};

let mapDispatchToProps = (dispatch) => {
  return {
    requestGetManufacturerList: () => dispatch(requestGetManufacturerList()),
    requestGetOriginalProductInfoList: () => dispatch(requestGetOriginalProductInfoList()),
    requestPostProductInfo: () => dispatch(requestPostProductInfo()),
    resetSuccessState: () => dispatch(resetSuccessState()),
  };
};

AddProductForm= reduxForm({
  form: 'product'
})(AddProductForm)

AddProductForm = connect(mapStateToProps, mapDispatchToProps)(AddProductForm);
export default AddProductForm;
