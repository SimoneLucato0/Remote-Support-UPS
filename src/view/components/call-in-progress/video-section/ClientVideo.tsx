import { useEffect } from "react";
import { useTypedSelector } from "src/utility/hooks";

const ClientVideo: React.FC = () => {
  const { clientStreams } = useTypedSelector((state) => state.callInfo);
  const { closedCall } = useTypedSelector(state => state.callStates)

  useEffect(() => {
    if (clientStreams.length > 0) {
      let clientVideo = document.getElementById(
        "client-video"
      ) as HTMLVideoElement;
      clientVideo.srcObject = clientStreams[0];
    }
  }, [clientStreams]);

  useEffect(() => {
    if(closedCall) {
      let clientVideo = document.getElementById(
        "client-video"
      ) as HTMLVideoElement;
      clientVideo.srcObject = null
    }
  }, [closedCall])

  return (
    <video
      className="border"
      playsInline
      autoPlay
      id="client-video"
      width="75%"
      style={{maxHeight: "43vh"}}
    />
  );
};

export default ClientVideo;
