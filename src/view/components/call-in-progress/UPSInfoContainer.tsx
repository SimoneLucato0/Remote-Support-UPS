import { Tabs, Tab } from "react-bootstrap";
import UPSInfoMeasures from "./ups-info-container/UPSInfoMeasures";
import UPSInfoStatesOrAlarms from "./ups-info-container/UPSInfoStatesOrAlarms";

import { useTypedSelector } from "src/utility/hooks";
import StatesAndAlarmsFilter from "./ups-info-container/StatesAndAlarmsFilter";

const UPSInfoContainer: React.FC = () => {
  const { states, alarms, measures, isBatteryPresent, isBypassPresent } =
    useTypedSelector((state) => state.callInfo);

  return (
    <>
      <StatesAndAlarmsFilter />
      <Tabs className="bg-white">
        <Tab eventKey="states" title="States">
          <UPSInfoStatesOrAlarms data={states} />
        </Tab>
        <Tab eventKey="alarms" title="Alarms">
          <UPSInfoStatesOrAlarms data={alarms} />
        </Tab>
        <Tab eventKey="measures" title="Measures">
          <UPSInfoMeasures
            data={measures}
            isBatteryPresent={isBatteryPresent}
            isBypassPresent={isBypassPresent}
          />
        </Tab>
      </Tabs>
    </>
  );
};

export default UPSInfoContainer;
