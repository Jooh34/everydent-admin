import { Component } from "react";
import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, CardHeader, CardBody, Button } from "shards-react";

import { requestGetManufacturerList } from "../redux/modules/product";

class ManufacturerList extends Component {
  componentDidMount() {
    this.props.requestGetManufacturerList();
  }
  render() {
    const { manufacturer_list } = this.props;
    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <Link to="/manufacturer/add/">
            <Button> 제조사 추가 </Button>
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
                  이름
                </th>
                <th scope="col" className="border-0">
                  제품 수
                </th>
              </tr>
            </thead>
            <tbody>
              {manufacturer_list.map((data, i) => {
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
        <td>{data.product_info_count}</td>
      </tr>
    );
  }
}

let mapStateToProps = (state) => {
    return {
      manufacturer_list: state.product.manufacturer_list,
    };
};

let mapDispatchToProps = (dispatch) => {
  return {
    requestGetManufacturerList: () => dispatch(requestGetManufacturerList()),
  };
};

ManufacturerList = connect(mapStateToProps, mapDispatchToProps)(ManufacturerList);
export default ManufacturerList;
