import { Component } from "react";
import React from "react";

import { Container, Row, Col, ListGroupItem } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";

class BlogOverviewPage extends Component {
  constructor(props) {
    super(props)
      this.smallStats = [
        {
          label: "제조사",
          value: 1,
          datasets: [
            {
              data: []
            }
          ]
        },
        {
          label: "제품",
          value: 3,
          datasets: [
            {
              data: []
            }
          ]
        },
        {
          label: "재고",
          value: 5,
          datasets: [
            {
              data: []
            }
          ]
        },
      ]
  }
  render() {
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
      </Container>
    )
  }
}

export default BlogOverviewPage;
