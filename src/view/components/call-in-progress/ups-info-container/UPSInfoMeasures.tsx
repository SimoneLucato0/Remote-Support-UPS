import { Tabs, Tab, Row, Col, Container } from "react-bootstrap";

/*  STRUCTURE:   
    data: [
      {
        name: "Input",
        values: [
          {
            number: string,
            name: string,
            value: string,
            unitMeasure: string
          }
        ]
      }, 
    ]
*/

export type measureModel = {
  number?: string;
  name?: string;
  value?: string;
  unitMeasure?: string;
};

export type singleMeasureModel = {
  name: string;
  values: Array<measureModel>;
};

export type UPSInfoMeasuresModel = {
  data: Array<singleMeasureModel>;
  isBatteryPresent: boolean;
  isBypassPresent: boolean;
};

const UPSInfoMeasures: React.FC<UPSInfoMeasuresModel> = ({
  data,
  isBatteryPresent,
  isBypassPresent,
}) => {
  return (
    <Tabs className="bg-white max-height-44">
      {data.map((row, index) => (
        <Tab eventKey={row.name} title={row.name} key={index}>
          <Container
            className="bg-white ups-container px-2 border"
            style={{ maxHeight: "35vh" }}
          >
            {(!isBatteryPresent && row.name === "Battery") ||
            (!isBypassPresent && row.name === "Bypass") ? (
              <Row className="justify-content-center">
                {`No ${row.name} present`}
              </Row>
            ) : (
              row.values.map((value, valueIndex) => (
                <Row key={valueIndex} className="ups-row">
                  <Col>{value.number}</Col>
                  <Col>{value.name}</Col>
                  <Col>{value.value}</Col>
                  <Col>{value.unitMeasure}</Col>
                </Row>
              ))
            )}
          </Container>
        </Tab>
      ))}
    </Tabs>
  );
};

export default UPSInfoMeasures;
