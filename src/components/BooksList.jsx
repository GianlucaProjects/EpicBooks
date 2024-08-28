import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";

function BooksList() {
  const [booksList, setBooksList] = useState([]); // Stato per la lista dei libri
  const [error, setError] = useState(null); // Stato per gestire eventuali errori

  // Funzione per recuperare la lista dei libri dal backend
  const fetchBooksList = async () => {
    const token = localStorage.getItem("token"); // Recupera il token JWT da localStorage

    try {
      const response = await fetch("http://localhost:8080/api/books/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Includi il token JWT nell'header
        },
      });

      if (response.ok) {
        const books = await response.json();
        setBooksList(books); // Aggiorna lo stato con i dati ricevuti dal server
      } else {
        setError("Errore nel recupero dei libri.");
      }
    } catch (err) {
      setError("Errore di rete. Impossibile connettersi al server.");
    }
  };

  // useEffect per chiamare fetchBooksList quando il componente viene montato
  useEffect(() => {
    fetchBooksList();
  }, []); // L'array vuoto [] assicura che l'effetto venga eseguito solo una volta al montaggio

  return (
    <Container className="d-flex flex-column align-items-center my-5">
      <Row className="w-100">
        <Col>
          <h4 className="text-center">Lista dei Libri</h4>
          {error ? (
            <p className="text-danger">{error}</p> // Mostra un messaggio di errore se c'è un problema
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center">Nome Libro</th>
                  <th className="text-center">Genere Libro</th>
                  <th className="text-center">Anno Uscita Libro</th>
                </tr>
              </thead>
              <tbody>
                {booksList.map((book, id) => (
                  <tr key={id}>
                    <td>{book.title}</td>
                    <td>{book.genre}</td>
                    <td>{book.year}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default BooksList;
