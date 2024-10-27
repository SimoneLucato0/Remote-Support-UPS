import { Col, Container, Row } from "react-bootstrap";
import { useTypedSelector } from "src/utility/hooks";

export type singleStateOrAlarmModel = {
  number: string;
  name: String;
  value: String;
};

export type UPSInfoStatesOrAlarmsModel = {
  data: Array<singleStateOrAlarmModel>;
};

const UPSInfoStatesOrAlarms: React.FC<UPSInfoStatesOrAlarmsModel> = ({
  data,
}) => {
  const { isDataFiltered } = useTypedSelector((state) => state.callInfo);

  return (
    <Container
      className="bg-white ups-container max-height-44 px-2 border"
      style={{ maxHeight: "40vh" }}
    >
      {data.map((row, index) => {
        if (isDataFiltered && row.value === "0") return null;

        return (
          <Row key={index} className="ups-row">
            <Col md="2">{row.number}</Col>
            <Col md="7">{row.name}</Col>
            <Col md="3">{row.value}</Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default UPSInfoStatesOrAlarms;
