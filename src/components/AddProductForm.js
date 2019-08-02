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

import { requestGetManufacturerList, requestPostProductInfo } from '../redux/modules/product';
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
  }

  handleScan = (code) => {
    console.log(code);
    const data = CodeParser(code, this.props.product.manufacturer_list);
    this.props.initialize({ name: '', code: data.product_code, manufacturer: data.manufacturer, full_code:code });
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
    this.props.requestPostProductInfo();
  }
  render() {
    const { manufacturer_list } = this.props.product;
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
              <Form onSubmit={this.handleSubmit}>
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
    requestPostProductInfo: () => dispatch(requestPostProductInfo()),
  };
};

AddProductForm= reduxForm({
  form: 'product'
})(AddProductForm)

AddProductForm = connect(mapStateToProps, mapDispatchToProps)(AddProductForm);
export default AddProductForm;
