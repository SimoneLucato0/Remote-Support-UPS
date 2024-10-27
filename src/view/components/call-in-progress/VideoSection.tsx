import { Col, Row } from "react-bootstrap";
import TechnicianVideo from "./video-section/TechnicianVideo";
import ToggleMuteButton from "./video-section/ToggleMuteButton";
import ToggleVideoButton from "./video-section/ToggleVideoButton";
import ClientVideo from "./video-section/ClientVideo";
import HangUpButton from "./video-section/HangUpButton";

const VideoSection: React.FC = () => {
  return (
    <Row className="mt-3 justify-content-center" style={{maxHeight: "50vh"}}>
      <Col className="d-flex flex-column align-items-center">
        <TechnicianVideo />
        <Row className="justify-content-evenly my-1">
          <Col>
            <ToggleMuteButton />
          </Col>
          <Col>
            <ToggleVideoButton />
          </Col>
        </Row>
      </Col>
      <Col className="d-flex flex-column align-items-center">
        <ClientVideo />
        <Row className="my-1">
          <HangUpButton />
        </Row>
      </Col>
    </Row>
  );
};

export default VideoSection;
