import { Component } from "react";
import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
} from "shards-react";

import { connect } from 'react-redux';

import { requestStockList, requestDeleteStockByID, resetSuccessState } from "../redux/modules/product";

class StockList extends Component {
  componentWillMount() {
    const { id } = this.props;
    this.props.requestStockList(id);
  }
  render() {
    if (this.props.product.is_post_success || this.props.product.is_post_failure) {
      window.alert(this.props.product.message);
      this.props.resetSuccessState();
      window.location.reload();
    }

    const { stock_list } = this.props.product;
    const { usable } = this.props;
    return (
      <div>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
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
                    입력 시간
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
                  {usable &&
                    <th scope="col" className="border-0">
                      사용
                    </th>
                  }
                </tr>
              </thead>
              <tbody>
                {stock_list.map((expiry, i) => {
                  return (<TableRow
                    index={i}
                    key={i}
                    data={expiry}
                    usable={usable}
                    requestDeleteStockByID={this.props.requestDeleteStockByID}/>
                  )
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
    const { index, data, usable, requestDeleteStockByID } = this.props;
    return(
      <tr>
        <td>{index+1}</td>
        <td>{data.name}</td>
        <td>{data.created_time}</td>
        <td>{data.manufacturer_name}</td>
        <td>{data.expiry_start}</td>
        <td>{data.expiry_end}</td>
        <td>
        {usable &&
          <Button theme="danger" onClick={() => requestDeleteStockByID(data.id)}>
            사용
          </Button>
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
    requestStockList: (id) => dispatch(requestStockList(id)),
    requestDeleteStockByID: (id) => dispatch(requestDeleteStockByID(id)),
    resetSuccessState: () => dispatch(resetSuccessState()),
  };
};

StockList = connect(mapStateToProps, mapDispatchToProps)(StockList);
export default StockList;
