import { Component } from "react";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
} from "shards-react";

import { connect } from 'react-redux';

import { requestRunningOutList } from '../redux/modules/product';

class RunningOutList extends Component {
  componentWillMount() {
    this.props.requestRunningOutList();
  }

  render() {
    const { running_out_list } = this.props.product;
    return (
      <div>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            재고 부족 목록
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
                    개수
                  </th>
                  <th scope="col" className="border-0">
                    최소 보유 개수
                  </th>
                </tr>
              </thead>
              <tbody>
                {running_out_list.map((data, i) => {
                  return (<TableRow index={i} key={i} data={data} />)
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
    console.log(data)
    return(
      <tr>
        <td>{index+1}</td>
        <td>{data.name}</td>
        <td>{data.manufacturer_name}</td>
        <td>{data.product_total_count}</td>
        <td>{data.product_min_stock}</td>
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
    requestRunningOutList: () => dispatch(requestRunningOutList()),
  };
};

RunningOutList = connect(mapStateToProps, mapDispatchToProps)(RunningOutList);
export default RunningOutList;
