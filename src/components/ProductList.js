import { Component } from "react";
import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Card, CardHeader, CardBody, Col,
InputGroupText, FormInput, FormSelect, FormCheckbox,
InputGroup,
InputGroupAddon, } from "shards-react";

import {
  requestGetProductInfoList,
  requestGetManufacturerList,
  requestDeleteProductInfo,
  resetSuccessState,
} from "../redux/modules/product";

import {
  addCheckedProduct,
  reassignCheckedProduct,
} from "../redux/modules/product_list";

let stylePointer = {
  cursor: 'pointer',
}

let floatLeft = {
  float: 'left',
}

let floatRight = {
  float: 'right',
}

const MyCheckBox = styled.div`
  width: 14px;
  height: 14px;
  border: 2px solid #007bff;
  background-color: ${props => props.checked ? '#007bff' : 'white' }
`

const CountText = styled.div`
  color : ${props => props.red ? 'red' : 'black' }
`

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
    this.props.reassignCheckedProduct([])
  }

  handleKeywordChange = (e) => {
    this.setState(
      {
        ...this.state,
        keyword: e.target.value,
      }
    )
    this.props.reassignCheckedProduct([])
  }

  handleManufactureSelect = (e) => {
    this.setState(
      {
        ...this.state,
        selected_manufacturer: e.target.value,
      }
    )
    this.props.reassignCheckedProduct([])
  }

  handleDeleteButtonClick = (data) => {
    if (data.product_count == 0) {
      if (window.confirm("정말로 제품을 삭제하시겠습니까?")){
        this.props.requestDeleteProductInfo(data.id);
      }
    }
    else {
      if (window.confirm("남아있는 재고가 있고, 제품 삭제 시 재고도 모두 삭제됩니다.\n정말로 제품을 삭제하시겠습니까?")){
        this.props.requestDeleteProductInfo(data.id);
      }
    }
  }

  handleToggleCheckAll = (isCheckedAll, filtered_list) => {
    if (isCheckedAll) {
      this.props.reassignCheckedProduct([])
    }
    else {
      const id_list = []
      for (var el of filtered_list) {
        id_list.push(el.id)
      }
      this.props.reassignCheckedProduct(id_list);
    }
  }

  render() {
    const { product_info_list, manufacturer_list } = this.props.product;
    const { keyword, selected_manufacturer } = this.state;
    const { checked_product_list } = this.props;

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

    if (this.props.product.is_post_success || this.props.product.is_post_failure) {
      window.alert(this.props.product.message);
      this.props.resetSuccessState();
      window.location.reload();
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
          <Link to="/product/min_count">
            <Button style={floatLeft}> 최소 개수 수정 </Button>
          </Link>
          <Link to="/product/add">
            <Button style={floatRight}> 제품 추가 </Button>
          </Link>
        </CardHeader>
        <CardBody className="p-0 pb-2">
          <table className="table mb-0">
            <thead className="bg-light">
              <tr>
                <th scope="col" className="border-0" style={stylePointer} onClick={() => this.handleToggleCheckAll(checked_product_list.length === filtered_list.length, filtered_list)}>
                  <MyCheckBox checked={filtered_list.length !== 0 && checked_product_list.length === filtered_list.length}/>
                </th>
                <th scope="col" className="border-0" style={stylePointer} onClick={() => this.handleToggleCheckAll(checked_product_list.length === filtered_list.length, filtered_list)}>
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
                <th scope="col" className="border-0">
                  사용 개수
                </th>
                <th scope="col" className="border-0">
                  반품 개수
                </th>
                <th scope="col" className="border-0">
                  최소 보유 개수
                </th>
                <th scope="col" className="border-0">
                  제품 삭제
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered_list.map((data, i) => {
                return (<TableRow
                  key={i}
                  index={i}
                  data={data}
                  handleDeleteButtonClick={this.handleDeleteButtonClick}
                  addCheckedProduct={this.props.addCheckedProduct}
                  checked={checked_product_list.includes(data.id)}
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
    const { index, data, handleDeleteButtonClick, addCheckedProduct, checked } = this.props;
    return(
      <tr>
        <td style={stylePointer} onClick={() => addCheckedProduct(data.id)}>
          <MyCheckBox checked={checked}/>
        </td>
        <td style={stylePointer} onClick={() => addCheckedProduct(data.id)}>
          {index+1}
        </td>
        <td>
          <Link to={`/product/change/${data.id}/`}>{data.name}</Link>
        </td>
        <td>{data.code}</td>
        <td>{data.manufacturer_name}</td>
        <td>
          <CountText red={ data.product_total_count < data.min_stock }>
          {
            (data.product_total_count) ?
            <Link to={`/stock_list/${data.id}?status=1`}>{data.product_total_count}</Link> :
            data.product_total_count
          }
          </CountText>
        </td>
        <td>
          {
            (data.used_total_count) ?
            <Link to={`/stock_list/${data.id}?status=2`}>{data.used_total_count}</Link> :
            data.used_total_count
          }
        </td>
        <td>
          {
            (data.returned_total_count) ?
            <Link to={`/stock_list/${data.id}?status=3`}>{data.returned_total_count}</Link> :
            data.returned_total_count
          }
        </td>
        <td>
          {data.min_stock}
        </td>
        <td>
          <Button onClick={() => {
              handleDeleteButtonClick(data);
          }} theme="danger">삭제</Button>
        </td>
      </tr>
    );
  }
}

let mapStateToProps = (state) => {
    return {
      product: state.product,
      checked_product_list: state.product_list.checked_product_list,
    };
};

let mapDispatchToProps = (dispatch) => {
  return {
    requestGetProductInfoList: () => dispatch(requestGetProductInfoList()),
    requestGetManufacturerList: () => dispatch(requestGetManufacturerList()),
    requestDeleteProductInfo: (id) => dispatch(requestDeleteProductInfo(id)),
    resetSuccessState: () => dispatch(resetSuccessState()),
    addCheckedProduct: (id) => dispatch(addCheckedProduct(id)),
    reassignCheckedProduct: (list) => dispatch(reassignCheckedProduct(list)),
  };
};

ProductList = connect(mapStateToProps, mapDispatchToProps)(ProductList);
export default ProductList;
