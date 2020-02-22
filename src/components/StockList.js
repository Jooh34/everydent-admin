import { Component } from "react";
import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
} from "shards-react";

import { connect } from 'react-redux';

import { requestStockList, requestChangeStockStatus ,resetSuccessState } from "../redux/modules/product";

class StockList extends Component {
  componentWillMount() {
    const { id } = this.props;
    const payload = {
      'id' : this.props.id,
      'status' : parseInt(this.props.query.status),
    }
    this.props.requestStockList(payload);
  }
  render() {
    if (this.props.product.is_post_success || this.props.product.is_post_failure) {
      window.alert(this.props.product.message);
      this.props.resetSuccessState();
      window.location.reload();
    }

    const { stock_list } = this.props.product;
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
                    상태 수정 시간
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
                  {this.props.query.status!=1 &&
                    <th scope="col" className="border-0">
                      복구
                    </th>
                  }
                  {this.props.query.status!=2 &&
                    <th scope="col" className="border-0">
                      사용
                    </th>
                  }
                  {this.props.query.status!=3 &&
                    <th scope="col" className="border-0">
                      반품
                    </th>
                  }
                  <th scope="col" className="border-0">
                    현재 상태
                  </th>
                </tr>
              </thead>
              <tbody>
                {stock_list.map((expiry, i) => {
                  return (<TableRow
                    index={i}
                    key={i}
                    data={expiry}
                    requestChangeStockStatus={this.props.requestChangeStockStatus}
                    status={this.props.query.status}/>
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
    const { index, data, requestChangeStockStatus, status } = this.props;
    let status_KR;
    if (status == 1) {
      status_KR = '보유 중';
    }
    else if (status == 2) {
      status_KR = '사용됨';
    }
    else {
      status_KR = '반품됨';
    }
    return(
      <tr>
        <td>{index+1}</td>
        <td>{data.name}</td>
        <td>{data.created_time}</td>
        <td>{data.status_edit_date}</td>
        <td>{data.manufacturer_name}</td>
        <td>{data.expiry_start}</td>
        <td>{data.expiry_end}</td>
        {
        status!=1 &&
        <td>
          <Button theme="primary" onClick={() => requestChangeStockStatus({
              'id': data.id,
              'status': 1
            })}>
            복구
          </Button>
        </td>
        }
        {
        status!=2 &&
        <td>
          <Button theme="danger" onClick={() => requestChangeStockStatus({
              'id': data.id,
              'status': 2
            })}>
            사용
          </Button>
        </td>
        }
        {
        status!=3 &&
        <td>
          <Button theme="warning" onClick={() => requestChangeStockStatus({
              'id': data.id,
              'status': 3
            })}>
            반품
          </Button>
        </td>
        }
        <td>
          {status_KR}
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
    requestStockList: (payload) => dispatch(requestStockList(payload)),
    requestChangeStockStatus: (payload) => dispatch(requestChangeStockStatus(payload)),
    resetSuccessState: () => dispatch(resetSuccessState()),
  };
};

StockList = connect(mapStateToProps, mapDispatchToProps)(StockList);
export default StockList;
