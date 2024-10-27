import { useEffect, useMemo, useState } from "react";
import { Mic, MicOff } from "react-feather";
import { WebRTCActionTypes } from "src/store/RTCMiddleware";
import { useTypedDispatch, useTypedSelector } from "src/utility/hooks";
import ButtonUI from "../../UI/ButtonUI";

const ToggleMuteButton: React.FC = () => {
  const dispatch = useTypedDispatch()
  const { technicianStream } = useTypedSelector(
    (state) => state.callInfo
  );

  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const icon = useMemo(() => {
    return isAudioEnabled ? <Mic /> : <MicOff/>
  }, [isAudioEnabled])

  const onClick = () => {
    technicianStream.getAudioTracks()[0].enabled =
      !technicianStream.getAudioTracks()[0].enabled;

    dispatch({type: WebRTCActionTypes.SEND_MEDIA_STATUS, payload: {isMicEnabled: technicianStream.getAudioTracks()[0].enabled, isVideoEnabled: null}})

    setIsAudioEnabled(isAudioEnabled => !isAudioEnabled)
  };

  useEffect(() => {
    if(technicianStream) setIsAudioEnabled(technicianStream.getAudioTracks()[0].enabled)
  }, [technicianStream])

  return (
    <ButtonUI
      className="bg-socomec"
      icon={icon}
      onClick={onClick}
    />
    );
};

export default ToggleMuteButton;
