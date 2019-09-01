import { Component } from "react";
import React from "react";
import { Container, Row, Col } from "shards-react";

import { withRouter } from 'react-router-dom';

import PageTitle from "../components/common/PageTitle";
import ChangeProductForm from "../components/ChangeProductForm";

class ProductDetailPage extends Component {
  render() {
    console.log(this.props)
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="제품 이름 변경" subtitle="제품 관리" className="text-sm-left" />
        </Row>
        <Row>
          <Col lg="12" md="12">
            <ChangeProductForm id={this.props.match.params.id}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

ProductDetailPage = withRouter(ProductDetailPage)
export default ProductDetailPage;
