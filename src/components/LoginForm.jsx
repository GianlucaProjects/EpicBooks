import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    console.log("Attempting to login with:", email, password); // Verifica che questi log vengano stampati
  
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      console.log("Response status:", response.status); // Verifica lo stato della risposta
  
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful, received JWT:", data.jwt);
        localStorage.setItem("token", data.jwt);
        onLogin(true);
        navigate("/");
      } else {
        console.log("Login failed with status:", response.status); // Verifica lo stato della risposta quando il login fallisce
        setLoginError(true);
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      setLoginError(true);
    }
  };
  

  return (
    <Container className="d-flex flex-column align-items-center my-5">
      <Row className="justify-content-center">
        <Col>
          <h4>Fai ora il login per poter accedere al sito!</h4>
          {loginError && (
            <Alert variant="danger" className="mt-3">
              Credenziali non corrette. Riprova!
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
