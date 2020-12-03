import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  return (
    <Navbar className="navbar-expand-lg bg-light" variant="dark">
      <Navbar.Brand style={{ color: "black" }} href="/">
        URL Shortener
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="d-flex p-2">
          <Nav.Link style={{ color: "black" }} href="/">
            Create URL
          </Nav.Link>
          <Nav.Link style={{ color: "black" }} href="/list">
            All URLs
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
