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

import { connect } from 'react-redux';
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";

import {
  requestGetManufacturerList,
  requestGetProductInfo,
  requestChangeProductInfo,
  resetSuccessState } from '../redux/modules/product';

class ChangeProductForm extends Component {

  componentWillMount() {
    const { id } = this.props;
    this.props.requestGetManufacturerList();
    this.props.requestGetProductInfo(id);
  }

  handleSubmit() {
    const { id } = this.props;
    this.props.requestChangeProductInfo(id);
  }

  render() {
    const { manufacturer_list, product_detail } = this.props.product;
    if (this.props.product.is_post_success || this.props.product.is_post_failure) {
      window.alert(this.props.product.message);
      this.props.resetSuccessState();
      this.props.history.push("/product/")
    }
    if (this.props.product_form) {
      if (!('values' in this.props.product_form) && product_detail !== undefined) {
        this.props.initialize(product_detail);
      }
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
              <Button onClick={() => this.handleSubmit()}>추가</Button>
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
    requestGetProductInfo: (id) => dispatch(requestGetProductInfo(id)),
    requestChangeProductInfo: (id) => dispatch(requestChangeProductInfo(id)),
    resetSuccessState: () => dispatch(resetSuccessState()),
  };
};

ChangeProductForm= reduxForm({
  form: 'product'
})(ChangeProductForm)

ChangeProductForm = connect(mapStateToProps, mapDispatchToProps)(ChangeProductForm);

export default withRouter(ChangeProductForm);
