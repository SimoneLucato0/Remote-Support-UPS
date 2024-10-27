import { Form } from "react-bootstrap";
import { updateIsDataFiltered } from "src/store/call-info/actions";
import { useTypedDispatch } from "src/utility/hooks";

const StatesAndAlarmsFilter = () => {
  const dispatch = useTypedDispatch()

  const updateFilter = (checked: boolean) => {
    dispatch(updateIsDataFiltered(checked))
  }

  return (
    <span className="d-flex justify-content-end mt-4">
      <label
        className="d-flex justify-content-center align-items-center"
        htmlFor="states_and_alarm_filter"
      >
        <span style={{ marginRight: "10px" }}>All states and alarms</span>
        <Form.Check type="switch" id="states_and_alarm_filter" onChange={(event) => updateFilter(event.target.checked)} />
        <span>Active states and alarms</span>
      </label>
    </span>
  );
};

export default StatesAndAlarmsFilter;
