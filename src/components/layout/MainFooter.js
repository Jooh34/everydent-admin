import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Nav } from "shards-react";

const MainFooter = ({ contained, menuItems, copyright }) => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
    <Container fluid={contained}>
      <Row>
        <Nav>
        </Nav>
        <span className="copyright ml-auto my-auto mr-2">주소 : 강원도 원주시 능라동길 73 3층 | TEL : 033-812-2882</span>
      </Row>
    </Container>
  </footer>
);

MainFooter.propTypes = {
  /**
   * Whether the content is contained, or not.
   */
  contained: PropTypes.bool,
  /**
   * The menu items array.
   */
  menuItems: PropTypes.array,
  /**
   * The copyright info.
   */
  copyright: PropTypes.string
};

MainFooter.defaultProps = {
  contained: false,
};

export default MainFooter;
