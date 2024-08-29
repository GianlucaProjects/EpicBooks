import React, { useEffect, useState } from "react";
import { Table, Container, Alert } from "react-bootstrap";

const BooksList = () => {
  const [booksList, setBooksList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooksList = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/books", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          if (response.status === 204) {
            // Gestisci il caso in cui non ci sono libri
            setBooksList([]);
          } else {
            throw new Error("Errore nel recupero dei libri");
          }
        } else {
          // Aggiungi una verifica per assicurarti che la risposta non sia vuota
          const data = await response.text(); // Legge la risposta come testo
          if (data) {
            setBooksList(JSON.parse(data)); // Esegue il parsing solo se la risposta non è vuota
          } else {
            setBooksList([]);
          }
        }
      } catch (error) {
        console.error("Errore nel recupero dei libri:", error);
        setError("Impossibile recuperare la lista dei libri.");
      }
    };

    fetchBooksList();
  }, []);

  return (
    <Container className="my-5">
      {error ? (
        <Alert variant="danger">{error}</Alert>
      ) : booksList.length === 0 ? (
        <Alert variant="info">Nessun libro disponibile.</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome Libro</th>
              <th>Genere Libro</th>
              <th>Anno Uscita Libro</th>
            </tr>
          </thead>
          <tbody>
            {booksList.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.genre}</td>
                <td>{book.year}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default BooksList;
