import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HomeComponent({ isLogged }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <Container className="d-flex flex-column align-items-center my-5">
      {!isLogged ? (
        <>
          <Row className="justify-content-center">
            <Col>
              <h4>Non sei loggato! Devi loggarti prima...</h4>
            </Col>
          </Row>
          <Row className="w-100 my-3">
            <Col className="text-center">
              <Button variant="primary" onClick={handleRedirect}>
                Vai al Login
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row className="w-100">
            <Col>
              <h4 className="text-center">Benvenuto in EpicBooks!</h4>
            </Col>
          </Row>
          <Row className="w-100 my-3">
            <Col>
              <p className="text-center">
                Questo sito è stato pensato per la tua libreria!
                <br />
                Con esso infatti potrai gestire il tuo catalogo online di libri e
                mostrarlo a potenziali clienti.
                <br />
                Naviga con i tasti in alto per esplorarne le varie funzionalità!
              </p>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default HomeComponent;
