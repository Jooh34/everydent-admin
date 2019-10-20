import { Component } from "react";
import React from "react";

import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import ReturnStockForm from "../components/ReturnStockForm";

class ReturnStock extends Component {
  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="재고 반품" subtitle="재고 관리" className="text-sm-left" />
        </Row>
        <Row>
          <Col lg="12" md="12">
            <ReturnStockForm/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ReturnStock;
