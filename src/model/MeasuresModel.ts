import {
  checkCRC,
  getDataFromFrame,
  stringToUint16Array,
} from "src/utility/modelUtils";
import { measureModel, singleMeasureModel } from "src/view/components/call-in-progress/ups-info-container/UPSInfoMeasures";
import MCMTModel from "./MCMTModel";
import { MeasuresList } from "./MeasuresList";

class MeasuresModel {
  private upsFrame: Uint16Array;
  private selectedFormat: number;
  private MCMTModel?: MCMTModel;

  constructor(frame: string, selectedFormat?: number) {
    const frameAsArray = stringToUint16Array(frame);
    if (selectedFormat === 0 || selectedFormat === 1)
      this.selectedFormat = selectedFormat;
    else this.selectedFormat = -1;
    if (checkCRC(frameAsArray)) {
      this.upsFrame = frameAsArray;
    } else {
      this.upsFrame = new Uint16Array(0);
    }
  }

  private formatData = (data: Uint16Array) => {
    const formattedData = new Array(data.length / 2);
    for (let i = 0; i < data.length; i = i + 2) {
      formattedData[i / 2] = parseInt(
        data[i].toString(16) + data[i + 1].toString(16),
        16
      );
    }
    return formattedData;
  };

  getFormattedMeasures = () : Array<singleMeasureModel> => {
    const data = getDataFromFrame(this.upsFrame);
    const formattedData = this.formatData(data);
    let measures = [] as Array<measureModel>;

    if (formattedData.length === 0 || this.selectedFormat === -1) return [];

    for (let i = 0; i < MeasuresList.length; i++) {
      if (this.MCMTModel!.isMeasureManaged(i))
        measures[i] = MeasuresList[i].getFormattedMeasure(
          i,
          formattedData[i],
          this.selectedFormat!
        );
      else measures[i] = {};
    }

    const separatedMeasures = this.separateMeasureByComponent(measures);
    return separatedMeasures;
  };

  private isBatteryMeasure = (measure: measureModel) => {
    if (
      measure.number === "M016" ||
      measure.number === "M017" ||
      measure.number === "M018" ||
      measure.number === "M019" ||
      measure.number === "M022" ||
      measure.number === "M023" ||
      measure.number === "M024" ||
      measure.number === "M025" ||
      measure.number === "M026" ||
      measure.number === "M027"
    )
      return true;
    return false;
  };

  private isBypassMeasure = (measure: measureModel) => {
    if (
      measure.number === "M039" ||
      measure.number === "M040" ||
      measure.number === "M041" ||
      measure.number === "M042" ||
      measure.number === "M043" ||
      measure.number === "M044" ||
      measure.number === "M045" ||
      measure.number === "M070" ||
      measure.number === "M071" ||
      measure.number === "M072" ||
      measure.number === "M073" ||
      measure.number === "M074" ||
      measure.number === "M075"
    )
      return true;
    return false;
  };

  private isInputMeasure = (measure: measureModel) => {
    if (
      measure.number === "M032" ||
      measure.number === "M033" ||
      measure.number === "M034" ||
      measure.number === "M035" ||
      measure.number === "M036" ||
      measure.number === "M037" ||
      measure.number === "M038" ||
      measure.number === "M064" ||
      measure.number === "M065" ||
      measure.number === "M066" ||
      measure.number === "M067" ||
      measure.number === "M068" ||
      measure.number === "M069"
    )
      return true;
    return false;
  };

  private isInverterMeasure = (measure: measureModel) => {
    if (
      measure.number === "M010" ||
      measure.number === "M011" ||
      measure.number === "M012" ||
      measure.number === "M013" ||
      measure.number === "M015" ||
      measure.number === "M054" ||
      measure.number === "M055" ||
      measure.number === "M056"
    )
      return true;
    return false;
  };

  private isOutputMeasure = (measure: measureModel) => {
    if (
      measure.number === "M000" ||
      measure.number === "M001" ||
      measure.number === "M002" ||
      measure.number === "M003" ||
      measure.number === "M004" ||
      measure.number === "M005" ||
      measure.number === "M006" ||
      measure.number === "M007" ||
      measure.number === "M008" ||
      measure.number === "M009" ||
      measure.number === "M010" ||
      measure.number === "M011" ||
      measure.number === "M012" ||
      measure.number === "M013" ||
      measure.number === "M014" ||
      measure.number === "M046" ||
      measure.number === "M048" ||
      measure.number === "M049" ||
      measure.number === "M050" ||
      measure.number === "M051" ||
      measure.number === "M052" ||
      measure.number === "M053" ||
      measure.number === "M054" ||
      measure.number === "M055" ||
      measure.number === "M056" ||
      measure.number === "M057" ||
      measure.number === "M058" ||
      measure.number === "M059" ||
      measure.number === "M060" ||
      measure.number === "M061" ||
      measure.number === "M062"
    )
      return true;
    return false;
  };

  private separateMeasureByComponent = (measures: Array<measureModel>) => {
    const batteryMeasures = {
      name: "Battery",
      values: [] as Array<measureModel>,
    };
    const bypassMeasures = {
      name: "Bypass",
      values: [] as Array<measureModel>,
    };
    const inputMeasures = { name: "Input", values: [] as Array<measureModel> };
    const inverterMeasures = {
      name: "Inverter",
      values: [] as Array<measureModel>,
    };
    const outputMeasures = {
      name: "Output",
      values: [] as Array<measureModel>,
    };

    for (const measure of measures) {
      if (this.isBatteryMeasure(measure)) batteryMeasures.values.push(measure);
      else if (this.isBypassMeasure(measure))
        bypassMeasures.values.push(measure);
      else if (this.isInputMeasure(measure)) inputMeasures.values.push(measure);
      else if (this.isInverterMeasure(measure))
        inverterMeasures.values.push(measure);
      else if (this.isOutputMeasure(measure))
        outputMeasures.values.push(measure);
    }

    const separatedMeasures = [
      { ...batteryMeasures },
      { ...bypassMeasures },
      { ...inputMeasures },
      { ...inverterMeasures },
      { ...outputMeasures },
    ];

    return separatedMeasures;
  };

  setMCMTModel = (model: MCMTModel) => this.MCMTModel = model
}

export default MeasuresModel;
