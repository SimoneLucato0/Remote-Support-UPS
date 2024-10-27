import { useEffect } from "react";
import { LogOut } from "react-feather";
import { useNavigate } from "react-router-dom";
import { logout } from "src/store/auth/actions";
import { WebRTCActionTypes } from "src/store/RTCMiddleware";
import { useTypedDispatch, useTypedSelector } from "src/utility/hooks";
import ButtonUI from "../UI/ButtonUI";

const LogoutButton: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { clientInfo } = useTypedSelector(
    (state) => state.callInfo
  );
  const navigate = useNavigate();

  const onClick = () => {
    if (clientInfo) dispatch({ type: WebRTCActionTypes.CLOSE_CALL });
    
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      if (clientInfo) dispatch({ type: WebRTCActionTypes.CLOSE_CALL });
    })

    return () => {
      window.removeEventListener("beforeunload", () =>  {
        if (clientInfo) dispatch({ type: WebRTCActionTypes.CLOSE_CALL });
      })
    }
  }, [])

  return (
    <ButtonUI
      onClick={onClick}
      icon={<LogOut />}
      className="d-flex justify-content-center"
      variant="danger"
    >
      Logout
    </ButtonUI>
  );
};

export default LogoutButton;
