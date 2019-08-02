import { Component } from "react";
import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import ProductList from "../components/ProductList";

class ProductListPage extends Component {
  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="제품 목록" subtitle="제품 관리" className="text-sm-left" />
        </Row>
        <Row>
          <Col lg="12" md="12">
            <ProductList />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ProductListPage;
