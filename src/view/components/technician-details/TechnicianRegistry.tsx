import { useTypedSelector } from "src/utility/hooks";
import { Container, Col, Row } from "react-bootstrap";

const TechnicianRegistry: React.FC = () => {
  const { technician } = useTypedSelector((state) => state.auth);

  return (
    <Container className="w-100 px-0">
      <Row>
        <Col>
          <p className="h3">Name</p>
          {technician?.name}
        </Col>
        <Col>
          <p className="h3">Surname</p>
          {technician?.surname}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <p className="h3">Code</p>
          {technician?.id}
        </Col>
        <Col>
          <p className="h3">Email</p>
          {technician?.email}
        </Col>
      </Row>
    </Container>
  );
};

export default TechnicianRegistry;
