import { Col, Row } from "react-bootstrap";
import { useTypedSelector } from "src/utility/hooks";
import CallConnectionDetails from "./CallConnectionDetails";
import IconMenu from "./IconMenu";
import LogoutButton from "./LogoutButton";
import TechnicianCode from "./TechnicianCode";
import UserInfo from "./ClientInfo";
import socomec_logo_bianco from "src/img/socomec_logo_bianco.png";
import UPSUserConnectionDetails from "../call-in-progress/UPSUserConnectionDetails";

const Sidebar: React.FC = () => {
  const { incomingCall, acceptedCall } = useTypedSelector(
    (state) => state.callStates
  );

  return (
    <Row className="flex flex-column p-2 min-height bg-socomec justify-content-start" id="sidebar">
      <Row className="mx-1 my-2">
        <img src={socomec_logo_bianco} alt="logo di socomec" />
      </Row>

      <Row className="m-1 my-3">
        <IconMenu />
      </Row>

      <Row className="mx-1 mt-1 tcode">
        <TechnicianCode />
      </Row>

      {incomingCall || acceptedCall ? (
        <Row className="mx-1 mt-3">
          <UserInfo />
        </Row>
      ) : null}

      {acceptedCall ? (
        <>
          <Row className="mt-auto">
            <UPSUserConnectionDetails />
          </Row>
          <Row>
            <CallConnectionDetails />
          </Row>
        </>
      ) : null}

      <Row className={`mx-1 mt-auto ${!acceptedCall ? "mt-5" : ""}`}>
        <LogoutButton />
      </Row>
    </Row>
  );
};

export default Sidebar;
