import { Component } from "react";
import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import ManufacturerList from "../components/ManufacturerList";

class ManufacturerListPage extends Component {
  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="제조사 목록" subtitle="제조사 관리" className="text-sm-left" />
        </Row>
        <Row>
          <Col lg="12" md="12">
            <ManufacturerList />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ManufacturerListPage;
