import { Component } from "react";
import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  ListGroup,
  ListGroupItem,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "shards-react";

import { connect } from 'react-redux';

import { requestExpiryList } from '../redux/modules/product';

class ExpiryList extends Component {
  componentWillMount() {
    this.props.requestExpiryList();
  }

  render() {
    const { expiry_list } = this.props.product;
    return (
      <div>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            유통 기한 2000일 이내 만료 목록
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
                    제조사
                  </th>
                  <th scope="col" className="border-0">
                    제조일자
                  </th>
                  <th scope="col" className="border-0">
                    유통기한
                  </th>
                </tr>
              </thead>
              <tbody>
                {expiry_list.map((expiry, i) => {
                  return (<TableRow index={i} key={i} data={expiry} />)
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    )
  }
}

class TableRow extends Component {
  render() {
    const { index, data } = this.props;
    return(
      <tr>
        <td>{index+1}</td>
        <td>{data.name}</td>
        <td>{data.manufacturer_name}</td>
        <td>{data.expiry_start}</td>
        <td>{data.expiry_end}</td>
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
    requestExpiryList: () => dispatch(requestExpiryList()),
  };
};

ExpiryList = connect(mapStateToProps, mapDispatchToProps)(ExpiryList);
export default ExpiryList;
