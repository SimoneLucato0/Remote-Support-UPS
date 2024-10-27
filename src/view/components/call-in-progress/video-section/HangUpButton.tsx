import { PhoneOff } from "react-feather";
import { WebRTCActionTypes } from "src/store/RTCMiddleware";
import { useTypedDispatch } from "src/utility/hooks";
import ButtonUI from "../../UI/ButtonUI";

const HangUpButton: React.FC = () => {
  const dispatch = useTypedDispatch();

  const onClick = () => dispatch({type: WebRTCActionTypes.CLOSE_CALL});

  return <ButtonUI icon={<PhoneOff />} variant="danger" onClick={onClick} />;
};

export default HangUpButton;
