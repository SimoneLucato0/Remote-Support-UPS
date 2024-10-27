import { Col, Row } from "react-bootstrap";
import { useTypedSelector } from "src/utility/hooks";
import AcceptButton from "../components/incoming-call/AcceptButton";
import RejectButton from "../components/incoming-call/RefuseButton";

const IncomingCallPage: React.FC = () => {
  const { clientInfo } = useTypedSelector((state) => state.callInfo);

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <Row className="h1 mt-5">
        {" "}
        {clientInfo?.name ?? "Simone"} is calling you!{" "}
      </Row>
      <Row className="w-100 my-5 justify-content-evenly">
        <Col className="d-flex justify-content-center">
          <AcceptButton />
        </Col>
        <Col className="d-flex justify-content-center">
          <RejectButton />
        </Col>
      </Row>
    </div>
  );
};

export default IncomingCallPage;
