import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("JWT received from server:", data.jwt); // Debugging: mostra il token JWT
        localStorage.setItem("token", data.jwt);  // Salva il token JWT nel localStorage
        onLogin(true);  // Aggiorna lo stato di autenticazione
        navigate("/");  // Reindirizza alla home page
      } else {
        setLoginError("Credenziali non valide!");
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      setLoginError("Errore di rete. Impossibile connettersi al server.");
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center my-5">
      <Row className="justify-content-center">
        <Col>
          <h4>Fai ora il login per poter accedere al sito!</h4>
          {loginError && (
            <Alert variant="danger" className="mt-3">
              {loginError}
            </Alert>
          )}
        </Col>
      </Row>
      <Row className="w-100">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
