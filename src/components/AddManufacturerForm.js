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

import { requestPostManufacturer } from '../redux/modules/product';
import CodeParser from '../data/CodeParser';

class AddManufacturerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScanned: false,
    }
  }
  handleScan = (code) => {
    console.log(code);
    const data = CodeParser(code, [], this.props.product.manufacturer_list);
    console.log(data);
    this.props.initialize({
      name: '',
      code: data.manufacturer_code,
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
  handleSubmit = (e) => {
    this.props.requestPostManufacturer();
  }
  render() {
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
                <strong className="text-muted d-block mb-2"> 제조사 정보 </strong>
                <InputGroup className="mb-3">
                  <InputGroupAddon type="prepend">
                    <InputGroupText>이름</InputGroupText>
                  </InputGroupAddon>
                  <Field name="name" component="input" type="text" />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroupAddon type="prepend">
                    <InputGroupText>코드</InputGroupText>
                  </InputGroupAddon>
                  <Field name="code" component="input" type="text" disabled/>
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
    requestPostManufacturer: () => dispatch(requestPostManufacturer()),
  };
};

AddManufacturerForm= reduxForm({
  form: 'product'
})(AddManufacturerForm)

AddManufacturerForm = connect(mapStateToProps, mapDispatchToProps)(AddManufacturerForm);
export default AddManufacturerForm;
