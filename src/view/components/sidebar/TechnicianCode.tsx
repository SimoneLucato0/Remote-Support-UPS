import { Card, Row } from "react-bootstrap";
import { useTypedSelector } from "src/utility/hooks";


const TechnicianCode: React.FC = ({ ...rest }) => {
  const { technician } = useTypedSelector(state => state.auth)

  return (
    <Card {...rest} className="px-0">
      <Card.Header>Code</Card.Header>
      <Card.Body>{technician?.id}</Card.Body>
    </Card>
  );
};

export default TechnicianCode;
