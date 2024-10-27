import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { WebRTCActionTypes } from "src/store/RTCMiddleware";
import { useTypedDispatch, useTypedSelector } from "src/utility/hooks";

const AvailabilitySwitch: React.FC = () => {
  const dispatch = useTypedDispatch();
  const { technician } = useTypedSelector(state => state.auth)

  const [isAvailable, setIsAvailable] = useState(true)

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
    dispatch({
      type: WebRTCActionTypes.UPDATE_AVAILABILITY,
      payload: event.target.checked,
    });
    setIsAvailable(prevIsAvailable => !prevIsAvailable)
  }

  useEffect(() => {
    if(technician) setIsAvailable(technician.getIsAvailable())
  }, [technician])

  return (
    <Form className="mt-5">
      <Form.Label htmlFor="availability-switch" className="h2">Availability</Form.Label>
      <Form.Check
        type="switch"
        name="availability-switch"
        id="availability-switch"
        onChange={onChangeHandler}
        checked={isAvailable}
      />
    </Form>
  );
};

export default AvailabilitySwitch;
