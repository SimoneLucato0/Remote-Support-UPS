import { Container, Row } from "react-bootstrap";
import vecio from "src/img/vecio.jpg";

const NotAuthorizedPage: React.FC = () => {
  return (
    <Container className="d-flex flex-column justify-content-center">
      <Row className="text-center">
        <h1>Utente non autorizzato a visualizzare questa pagina.</h1>
      </Row>
    </Container>
  );
};

export default NotAuthorizedPage;
