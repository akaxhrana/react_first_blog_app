import React, { Component } from "react";
import styled from "styled-components";
import Links from "./Links";
import "../styles/css/custom-navbar.css"


const Container = styled.div.attrs({
  className: "no-gutters ",
})``;

const Nav = styled.nav.attrs({
  className: "navbar navbar-expand-lg navbar-dark bg-dark p-3",
})`
  margin-bottom: 20 px;
`;

class NavBar extends Component {
  render() {
    return (
      <>
      <div className="navigation-bar"></div>
      </>
    )
  }
}

/* 
class NavBar extends Component {
  render() {
    return (
      <Container>
        <Nav>
          <Links />
        </Nav>
      </Container>
    );
  }
} */

export default NavBar;
