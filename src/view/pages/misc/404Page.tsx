import { Container, Row } from "react-bootstrap";
import vecio from "src/img/vecio.jpg";

const FourOFourPage: React.FC = () => {
  return (
    <Container className="d-flex flex-column justify-content-center">
      <Row className="text-center">
        <h1>Errore 404. Nessuna pagina trovata.</h1>
      </Row>
    </Container>
  );
};

export default FourOFourPage;
