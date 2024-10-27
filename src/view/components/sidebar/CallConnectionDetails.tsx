import { useEffect } from "react";
import { Row } from "react-bootstrap";
import { useStopwatch } from "react-timer-hook";
import { useTypedSelector } from "src/utility/hooks";
import { formatDoubleDigit } from "src/utility/modelUtils";

const CallConnectionDetails: React.FC = () => {
  const { seconds, minutes, hours, start, reset } = useStopwatch({
    autoStart: true,
  });
  const { acceptedCall, closedCall } = useTypedSelector(
    (state) => state.callStates
  );

  useEffect(() => {
    //if (acceptedCall) start();
    if (closedCall) reset();
  }, []);



  return (
    <Row className="justify-content-center text-warning h3 border mx-3">
      {formatDoubleDigit(hours)}:{formatDoubleDigit(minutes)}:
      {formatDoubleDigit(seconds)}
    </Row>
  );
};

export default CallConnectionDetails;
