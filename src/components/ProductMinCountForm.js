import { Component } from "react";
import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  ListGroup,
  ListGroupItem,
} from "shards-react";

import { connect } from 'react-redux';
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";

import {
  resetSuccessState,
} from "../redux/modules/product";

import {
  requestSetMinStock,
} from "../redux/modules/product_list";

class ProductMinCountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  handleCountChange = (e) => {
    this.setState({
      ...this.state,
      value: e.target.value
    })
  }

  handleSubmit = () => {
    let checked_product_list = this.props.checked_product_list;
    let value = this.state.value;
    let data = {
      product_id_list: checked_product_list,
      count: value,
    }

    console.log(data)
    this.props.requestSetMinStock(data);
  }

  render() {
    const { product_info_list, checked_product_list } = this.props;

    if (this.props.product.is_post_success || this.props.product.is_post_failure) {
      window.alert(this.props.product.message);
      this.props.resetSuccessState();
      this.props.history.push("/product/")
    }

    let filtered_list = product_info_list.filter(pi => checked_product_list.includes(pi.id));
    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <Col md="3" className="form-group">
            <InputGroup>
              <InputGroupAddon type="prepend">
                <InputGroupText>개수</InputGroupText>
              </InputGroupAddon>
              <FormInput name="keyword" type="text" onChange={this.handleCountChange}/>
              <Button theme="secondary" onClick={this.handleSubmit}> 적용 </Button>
            </InputGroup>
          </Col>
        </CardHeader>
        <CardBody className="p-0 pb-2">
          <table className="table mb-0">
            <thead className="bg-light">
              <tr>
                <th scope="col" className="border-0">
                  선택된 제품 ({filtered_list.length})
                </th>
                <th scope="col" className="border-0">
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered_list.map((data, i) => {
                return (<TableRow
                  index={i}
                  data={data}
                />)
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    )
  }
}

class TableRow extends Component {
  render() {
    const { index, data } = this.props;
    return(
      <tr>
        <td>
          {index+1}
        </td>
        <td>
          {data.name}
        </td>
      </tr>
    );
  }
}

let mapStateToProps = (state) => {
    return {
      product: state.product,
      product_info_list: state.product.product_info_list,
      checked_product_list: state.product_list.checked_product_list,
    };
};

let mapDispatchToProps = (dispatch) => {
  return {
    requestSetMinStock: (data) => dispatch(requestSetMinStock(data)),
    resetSuccessState: () => dispatch(resetSuccessState()),
  };
};

ProductMinCountForm = connect(mapStateToProps, mapDispatchToProps)(ProductMinCountForm);
export default withRouter(ProductMinCountForm);
