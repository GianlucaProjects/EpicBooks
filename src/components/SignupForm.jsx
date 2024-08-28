import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setSignupError("Le password non corrispondono.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role: "USER" }), // Passa l'email, la password e il ruolo
      });

      if (response.ok) {
        setSignupSuccess("Registrazione completata con successo!");
        setSignupError("");
        setTimeout(() => {
          navigate("/login"); // Reindirizza alla pagina di login dopo la registrazione
        }, 2000);
      } else {
        const errorData = await response.text();
        setSignupError(errorData || "Errore durante la registrazione.");
      }
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      setSignupError("Errore di rete. Impossibile connettersi al server.");
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center my-5">
      <Row className="justify-content-center">
        <Col>
          <h4>Registrati per accedere al sito!</h4>
          {signupError && (
            <Alert variant="danger" className="mt-3">
              {signupError}
            </Alert>
          )}
          {signupSuccess && (
            <Alert variant="success" className="mt-3">
              {signupSuccess}
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

            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>Conferma Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Conferma Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Registrati
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignupForm;
