import { formatDoubleDigit } from "src/utility/modelUtils";
import { measureModel } from "src/view/components/call-in-progress/ups-info-container/UPSInfoMeasures";

class Measure {
  private number: string;
  private name: string;
  private unitMeasure: string;
  private firstDivisor: number;
  private secondDivisor: number;
  private isSigned: boolean;

  constructor(
    number: string,
    name: string,
    unitMeasure: string,
    firstDivisor: number,
    secondDivisor: number,
    isSigned: boolean
  ) {
    this.number = number;
    this.name = name;
    this.unitMeasure = unitMeasure;
    this.firstDivisor = firstDivisor;
    this.secondDivisor = secondDivisor;
    this.isSigned = isSigned;
  } 

  // ** Value represent number of minutes => HH:MM:00
  private formatMeasure24 = (value: number) : measureModel => {
    const numberOfHours = Math.floor(value / 60);
    const numberOfMinutes = value % 60;

    const formattedNumberOfHours = formatDoubleDigit(numberOfHours);
    const formattedNumberOfMinutes = formatDoubleDigit(numberOfMinutes);

    return {
      number: this.number,
      name: this.name,
      value: `${formattedNumberOfHours}:${formattedNumberOfMinutes}:00`,
      unitMeasure: this.unitMeasure,
    };
  };

  // ** Value represent number of seconds => HH:MM:SS
  private formatMeasure25 = (value: number) : measureModel => {
    const numberOfHours = Math.floor(value / 3600);
    const numberOfMinutes = Math.floor((value - numberOfHours * 3600) / 60);
    const numberOfSeconds = value - numberOfHours * 3600 - numberOfMinutes * 60;

    const formattedNumberOfHours = formatDoubleDigit(numberOfHours);
    const formattedNumberOfMinutes = formatDoubleDigit(numberOfMinutes);
    const formattedNumberOfSeconds = formatDoubleDigit(numberOfSeconds);

    return {
      number: this.number,
      name: this.name,
      value: `${formattedNumberOfHours}:${formattedNumberOfMinutes}:${formattedNumberOfSeconds}`,
      unitMeasure: this.unitMeasure,
    };
  };

  public getFormattedMeasure = (
    number: number,
    value: number,
    format: number
  ): measureModel => {
    // ** Reserved measure, no need to handle it
    if (number === 47) return {};

    // ** Time measures
    if (number === 24) return this.formatMeasure24(value);
    if (number === 25) return this.formatMeasure25(value);

    return {
      number: this.number,
      name: this.name,
      value: this.getFormattedValue(value, format),
      unitMeasure: this.unitMeasure,
    };
  };

  private getFormattedValue = (value: number, format: number) => {
    let formattedValue: number;

    if (this.isSigned) {
      const signedValue = new Int16Array([value])[0];
      formattedValue =
        signedValue / (format === 0 ? this.firstDivisor : this.secondDivisor);
    } else
      formattedValue =
        value / (format === 0 ? this.firstDivisor : this.secondDivisor);
    return formattedValue!.toString();
  };
}

export default Measure;
