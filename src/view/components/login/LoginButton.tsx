import { MouseEventHandler } from "react";
import { LogIn } from "react-feather";
import ButtonUI from "../UI/ButtonUI";

const LoginButton : React.FC = () => {
  return (
    <ButtonUI type="submit" className="bg-socomec d-flex justify-content-center w-100">
      Login
    </ButtonUI>
  );
};

export default LoginButton;
