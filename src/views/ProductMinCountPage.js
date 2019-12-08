import { Component } from "react";
import React from "react";
import { Container, Row, Col } from "shards-react";

import { withRouter } from 'react-router-dom';

import PageTitle from "../components/common/PageTitle";

import ProductMinCountForm from "../components/ProductMinCountForm";

class ProductMinCountPage extends Component {
  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="제품 최소 개수 수정" subtitle="제품 관리" className="text-sm-left" />
        </Row>
        <Row>
          <Col lg="12" md="12">
            <ProductMinCountForm/>
          </Col>
        </Row>
      </Container>
    )
  }
}

ProductMinCountPage = withRouter(ProductMinCountPage)
export default ProductMinCountPage;
