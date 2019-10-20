import { Component } from "react";
import React from "react";
import { Container, Row, Col } from "shards-react";

import { withRouter } from 'react-router-dom';

import PageTitle from "../components/common/PageTitle";
import ChangeManufacturerForm from "../components/ChangeManufacturerForm";

class ManufacturerDetailPage extends Component {
  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="제조사 이름 변경" subtitle="제조사 관리" className="text-sm-left" />
        </Row>
        <Row>
          <Col lg="12" md="12">
            <ChangeManufacturerForm id={this.props.match.params.id}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

ManufacturerDetailPage = withRouter(ManufacturerDetailPage)
export default ManufacturerDetailPage;
