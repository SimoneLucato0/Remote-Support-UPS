import { useMemo, useState } from "react";
import { Video, VideoOff } from "react-feather";
import { WebRTCActionTypes } from "src/store/RTCMiddleware";
import { useTypedDispatch, useTypedSelector } from "src/utility/hooks";
import ButtonUI from "../../UI/ButtonUI";

const ToggleVideoButton: React.FC = () => {
  const dispatch = useTypedDispatch()
  const { technicianStream } = useTypedSelector(
    (state) => state.callInfo
  );

  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const icon = useMemo(() => {
    return isVideoEnabled ? <Video /> : <VideoOff />;
  }, [isVideoEnabled]);

  const onClick = () => {
    technicianStream.getVideoTracks()[0].enabled =
      !technicianStream.getVideoTracks()[0].enabled;

    dispatch({type: WebRTCActionTypes.SEND_MEDIA_STATUS, payload: {isVideoEnabled: technicianStream.getVideoTracks()[0].enabled, isMicEnabled: null}})


    setIsVideoEnabled((prevIsVideoEnabled) => !prevIsVideoEnabled);
  };

  return <ButtonUI className="bg-socomec" icon={icon} onClick={onClick} />;
};

export default ToggleVideoButton;
