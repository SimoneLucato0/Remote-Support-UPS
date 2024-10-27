import { useEffect, useRef } from "react";
import { useTypedSelector } from "src/utility/hooks";

const TechnicianVideo: React.FC = () => {
  const technicianRef = useRef() as React.MutableRefObject<HTMLVideoElement>;
  const { technicianStream } = useTypedSelector(
    (state) => state.callInfo
  );

  const {closedCall} = useTypedSelector(state => state.callStates)

  useEffect(() => {
    if (technicianStream) technicianRef.current.srcObject = technicianStream;
  }, [technicianStream]);

  useEffect(() => {
    if(closedCall) technicianRef.current.srcObject = null
  }, [closedCall])

  return (
    <video
      className="border"
      playsInline
      autoPlay
      muted
      id="technician-video"
      ref={technicianRef}
      width="75%"
    />
  );
};

export default TechnicianVideo;
