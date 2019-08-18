import { Component } from "react";
import React from "react";

import { Container, Row, Col, ListGroupItem } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import AddStockForm from "../components/AddStockForm";

class AddStock extends Component {
  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="재고 추가" subtitle="재고 관리" className="text-sm-left" />
        </Row>
        <Row>
          <Col lg="12" md="12">
            <AddStockForm/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AddStock;
