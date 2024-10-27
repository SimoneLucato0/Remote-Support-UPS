import { Col, Row } from "react-bootstrap";
import { Wifi, WifiOff } from "react-feather";
import { useTypedSelector } from "src/utility/hooks";

const UPSUserConnectionDetails: React.FC = () => {
  const { upsUserConnectionDetails } = useTypedSelector(
    (state) => state.callInfo
  );

  return (
    <Row className="d-flex justify-content-evenly align-items-center text-white my-1">
      <Col>
        {upsUserConnectionDetails === "connected" ? (
          <Wifi color="#198754" size={30} />
        ) : null}
        {upsUserConnectionDetails === "disconnected" ? (
          <WifiOff color="#DC3545" size={30} />
        ) : null}
      </Col>
      <Col>
        {upsUserConnectionDetails === "connected" ? (
          <span>Connected</span>
        ) : null}
        {upsUserConnectionDetails === "disconnected" ? (
          <span>Not Connected</span>
        ) : null}
      </Col>
    </Row>
  );
};

export default UPSUserConnectionDetails;
