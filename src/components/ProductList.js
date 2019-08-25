import { Component } from "react";
import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Card, CardHeader, CardBody, Col,
InputGroupText, FormInput, FormSelect,
InputGroup,
InputGroupAddon, } from "shards-react";

import { requestGetProductInfoList, requestGetManufacturerList } from "../redux/modules/product";

let btnStyle = {
  float: 'right',
}

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      selected_manufacturer: 'all',
    }
  }

  componentWillMount() {
    this.props.requestGetProductInfoList();
    this.props.requestGetManufacturerList();
  }

  handleKeywordChange = (e) => {
    this.setState(
      {
        ...this.state,
        keyword: e.target.value,
      }
    )
  }

  handleManufactureSelect = (e) => {
    this.setState(
      {
        ...this.state,
        selected_manufacturer: e.target.value,
      }
    )
  }
  render() {
    const { product_info_list, manufacturer_list } = this.props.product;
    const { keyword, selected_manufacturer } = this.state;
    let filtered_list = product_info_list;

    if (keyword !== '') {
      filtered_list = filtered_list.filter(
        product_info => product_info.name.includes(keyword)
      )
    }

    if (selected_manufacturer !== 'all') {
      filtered_list = filtered_list.filter(
        product_info => product_info.manufacturer === Number(selected_manufacturer)
      )
    }

    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <Col md="3" className="form-group">
            <InputGroup>
              <InputGroupAddon type="prepend">
                <InputGroupText>제품명 검색</InputGroupText>
              </InputGroupAddon>
              <FormInput name="keyword" type="text" onChange={this.handleKeywordChange}/>
            </InputGroup>
            <InputGroup>
              <InputGroupAddon type="prepend">
                <InputGroupText>제조사 검색</InputGroupText>
              </InputGroupAddon>
              <FormSelect onChange={this.handleManufactureSelect} defaultValue='all'>
                <option value='all'> 모두 </option>
                {
                  manufacturer_list.map((manufacturer, i) => {
                    return (
                      <option key={i} value={manufacturer.id}> {manufacturer.name} </option>
                    )
                  })
                }
              </FormSelect>
            </InputGroup>
          </Col>
          <Link to="/product/add/">
            <Button style={btnStyle}> 제품 추가 </Button>
          </Link>
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
                  재고 개수
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered_list.map((data, i) => {
                return (<TableRow key={i} data={data} />)
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
    const { data } = this.props;
    return(
      <tr>
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>{data.code}</td>
        <td>{data.manufacturer_name}</td>
        <td>
        {
          (data.product_count) ?
          <Link to={`/stock_list/${data.id}/`}>{data.product_count}</Link> :
          data.product_count
        }
        </td>
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
    requestGetProductInfoList: () => dispatch(requestGetProductInfoList()),
    requestGetManufacturerList: () => dispatch(requestGetManufacturerList()),
  };
};

ProductList = connect(mapStateToProps, mapDispatchToProps)(ProductList);
export default ProductList;
