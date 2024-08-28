import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyNavbar({ onLogout, isLogged }) {
  const username = localStorage.getItem("username"); // Recupera l'username dal localStorage

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          EpicBooks
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {isLogged && (
              <>
                <Nav.Link as={Link} to="/addBook">
                  Aggiungi Libro
                </Nav.Link>
                <Nav.Link as={Link} to="/bookList">
                  Lista Libri
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {isLogged ? (
              <>
                <Navbar.Text className="me-3">Ciao, {username}</Navbar.Text>
                <Button variant="outline-light" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
