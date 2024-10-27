import { Row, Spinner } from "react-bootstrap";

const WaitingCallPage: React.FC = () => {
  return (
    <div className="d-flex flex-column align-items-center my-5 pt-5">
      <Row className="h2 socomec">Waiting for a call...</Row>
      <Spinner
        className="mt-5 socomec spinner-size"
        animation="border"
        role="status"
      >
        <span className="d-none">Loading...</span>
      </Spinner>
    </div>
  );
};

export default WaitingCallPage;
