import { Component } from "react";
import React from "react";

import { Container, Row, Col, ListGroupItem } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UseStockForm from "../components/UseStockForm";

class AddStock extends Component {
  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="재고 사용" subtitle="재고 관리" className="text-sm-left" />
        </Row>
        <Row>
          <Col lg="6" md="12">
            <ListGroupItem className="p-3">
              <Row>
                <UseStockForm />
              </Row>
            </ListGroupItem>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AddStock;
