import { Card } from "react-bootstrap";
import { useTypedSelector } from "src/utility/hooks";


const ClientInfo: React.FC = ({ ...rest }) => {
  const { clientInfo } = useTypedSelector(state => state.callInfo)

  return (
    <Card {...rest} className="px-0">
      <Card.Header>Client</Card.Header>
      <Card.Body>
        <div>
          Name: <strong>{clientInfo?.name}</strong>
        </div>
        <div>
          Surname: <strong>{clientInfo?.surname}</strong>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ClientInfo;
