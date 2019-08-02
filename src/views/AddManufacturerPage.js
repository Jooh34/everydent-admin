import { Component } from "react";
import React from "react";

import { Container, Row, Col, ListGroupItem } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import AddManufacturerForm from "../components/AddManufacturerForm";

class AddManufacturerPage extends Component {
  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="새 제조사 추가" subtitle="제조사 관리" className="text-sm-left" />
        </Row>
        <Row>
          <Col lg="6" md="12">
            <ListGroupItem className="p-3">
              <Row>
                <AddManufacturerForm/>
              </Row>
            </ListGroupItem>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AddManufacturerPage;
