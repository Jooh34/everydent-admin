import { Component } from "react";
import React from "react";

import { connect } from 'react-redux';

import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import ExpiryList from "../components/ExpiryList";

import { requestCountInfo } from "../redux/modules/product";
class BlogOverviewPage extends Component {
  componentDidMount() {
    this.props.requestCountInfo();
  }
  render() {
    const { product_count, product_info_count, manufacturer_count } = this.props.count;
    this.smallStats = [
      {
        label: "제조사",
        value: manufacturer_count,
        datasets: [
          {
            data: []
          }
        ]
      },
      {
        label: "제품",
        value: product_info_count,
        datasets: [
          {
            data: []
          }
        ]
      },
      {
        label: "재고",
        value: product_count,
        datasets: [
          {
            data: []
          }
        ]
      },
    ]

    this.expiredProductList = [
      {
        id: 1,
        date: "2019.08.03",
        name: "제품 1",
        author: {
          name: "John Doe",
          url: "#"
        },
        post: {
          title: "Hello World!",
          url: "#"
        },
      },
    ]

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Blog Overview" subtitle="Dashboard" className="text-sm-left mb-3" />
        </Row>
        {/* Small Stats Blocks */}
        <Row>
          {this.smallStats.map((stats, idx) => (
            <Col className="col-lg mb-4 md-6 sm-6" key={idx}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                label={stats.label}
                value={stats.value}
              />
            </Col>
          ))}
        </Row>
        <Row>
          {/* ExpirationAlert */}
          <Col lg="12" md="12">
            <ExpiryList/>
          </Col>
        </Row>
      </Container>
    )
  }
}


let mapStateToProps = (state) => {
    return {
      count: state.product.count,
    };
};

let mapDispatchToProps = (dispatch) => {
  return {
    requestCountInfo: () => dispatch(requestCountInfo()),
  };
};

BlogOverviewPage = connect(mapStateToProps, mapDispatchToProps)(BlogOverviewPage);
export default BlogOverviewPage;
