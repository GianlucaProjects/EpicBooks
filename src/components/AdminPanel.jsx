import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Alert } from "react-bootstrap";

function AdminPanel() {
  const [booksList, setBooksList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [usersTotalPages, setUsersTotalPages] = useState(0);

  useEffect(() => {
    fetchBooksList();
    fetchUsersList(currentPage);
  }, [currentPage]);

  const fetchBooksList = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/books", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        if (response.status === 204) {
          setBooksList([]); // Nessun libro trovato
        } else {
          throw new Error("Errore nel recupero dei libri");
        }
      } else {
        const data = await response.text();
        if (data) {
          setBooksList(JSON.parse(data));
        } else {
          setBooksList([]);
        }
      }
    } catch (error) {
      console.error("Errore nel recupero dei libri:", error);
      setError("Impossibile recuperare la lista dei libri.");
    }
  };

  const fetchUsersList = async (page) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users?page=${page}&size=5`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsersList(data.content);
        setUsersTotalPages(data.totalPages);
      } else {
        throw new Error("Errore nel recupero degli utenti");
      }
    } catch (error) {
      console.error("Errore nel recupero degli utenti:", error);
      setError("Impossibile recuperare la lista degli utenti.");
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/books/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setBooksList(booksList.filter((book) => book.id !== bookId));
      } else {
        console.error("Errore durante l'eliminazione del libro:", response);
        setError("Non è stato possibile eliminare il libro.");
      }
    } catch (error) {
      console.error("Errore durante l'eliminazione del libro:", error);
      setError("Errore di rete. Impossibile connettersi al server.");
    }
  };

  const handleNextPage = () => {
    if (currentPage < usersTotalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h4 className="text-center">Pannello di Amministrazione</h4>
          {error && <Alert variant="danger">{error}</Alert>}
          
          {/* Gestione del messaggio quando non ci sono libri */}
          {booksList.length === 0 ? (
            <Alert variant="info" className="mt-4">Nessun libro disponibile.</Alert>
          ) : (
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th className="text-center">Nome Libro</th>
                  <th className="text-center">Genere</th>
                  <th className="text-center">Anno</th>
                  <th className="text-center">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {booksList.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.genre}</td>
                    <td>{book.year}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteBook(book.id)}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {/* Tabella degli utenti registrati */}
          <h4 className="text-center mt-5">Utenti Registrati</h4>
          {usersList.length === 0 ? (
            <Alert variant="info" className="mt-4">Nessun utente registrato.</Alert>
          ) : (
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th className="text-center">Username</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Data Registrazione</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.registrationDate).toLocaleString()}</td> {/* Formatta la data */}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {/* Paginazione per gli utenti registrati */}
          <div className="d-flex justify-content-between mt-3">
            <Button variant="primary" onClick={handlePreviousPage} disabled={currentPage === 0}>
              Precedente
            </Button>
            <Button variant="primary" onClick={handleNextPage} disabled={currentPage === usersTotalPages - 1}>
              Prossimo
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPanel;