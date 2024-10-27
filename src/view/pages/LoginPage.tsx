import { Row } from "react-bootstrap";
import LoginBox from "../components/login/LoginBox";

const LoginPage: React.FC = () => {
  return (
    <div className="bg-socomec min-height">
      <Row className="d-flex justify-content-center w-100 pt-5">
        <LoginBox />
      </Row>
    </div>
  );
};

export default LoginPage;
