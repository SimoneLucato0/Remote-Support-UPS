import { Col, Row } from "react-bootstrap";
import { Home, User } from "react-feather";
import { useNavigate } from "react-router-dom";

const IconMenu: React.FC = () => {
  const navigate = useNavigate();

  const homeHandler = () => navigate("/dashboard");

  const technicianDetailsHandler = () => navigate("/technician-details");

  return (
    <>
      <Col sm="6" className="text-center mr-1">
        <Home
          size={40}
          className="border rounded p-2 mb-3"
          color="white"
          role="button"
          onClick={() => homeHandler()}
        />
      </Col>
      <Col sm="6" className="text-center">
        <User
          size={40}
          className="border rounded p-2"
          color="white"
          role="button"
          onClick={() => technicianDetailsHandler()}
        />
      </Col>
    </>
  );
};

export default IconMenu;
