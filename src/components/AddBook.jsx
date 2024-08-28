import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

function AddBook() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token"); // Recupera il token JWT da localStorage

    try {
      const response = await fetch("http://localhost:8080/api/books/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Includi il token JWT nell'header
        },
        body: JSON.stringify({ title, genre, year }), // Invia i dati del libro
      });

      if (response.ok) {
        setAddSuccess("Libro aggiunto con successo!");
        setAddError("");
        setTitle("");
        setGenre("");
        setYear("");
      } else {
        const errorData = await response.text();
        setAddError(errorData || "Errore durante l'aggiunta del libro.");
      }
    } catch (error) {
      console.error("Errore durante l'aggiunta del libro:", error);
      setAddError("Errore di rete. Impossibile connettersi al server.");
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center my-5">
      <Row className="justify-content-center">
        <Col>
          <h4>Aggiungi un nuovo libro</h4>
          {addError && (
            <Alert variant="danger" className="mt-3">
              {addError}
            </Alert>
          )}
          {addSuccess && (
            <Alert variant="success" className="mt-3">
              {addSuccess}
            </Alert>
          )}
        </Col>
      </Row>
      <Row className="w-100">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Nome Libro</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il nome del libro"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formGenre" className="mb-3">
              <Form.Label>Genere</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il genere"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formYear" className="mb-3">
              <Form.Label>Anno di Pubblicazione</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci l'anno"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Aggiungi Libro
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddBook;
