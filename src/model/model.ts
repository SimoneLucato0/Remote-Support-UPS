import AlarmsModel from "./AlarmsModel";
import MCMTModel from "./MCMTModel";
import MeasuresModel from "./MeasuresModel";
import StatesModel from "./StatesModel";

class Model {
  private alarmsModel?: AlarmsModel;
  private measuresModel?: MeasuresModel;
  private MCMTModel?: MCMTModel;
  private statesModel?: StatesModel;
  private selectedFormat?: number;

  public getFormattedAlarms = () =>
    this.alarmsModel ? this.alarmsModel.getFormattedAlarms() : [];

  public getFormattedMeasures = () =>
    this.measuresModel ? this.measuresModel.getFormattedMeasures() : [];

  public getFormattedStates = () =>
    this.statesModel ? this.statesModel.getFormattedStates() : [];

  public setAlarmsModel = (frame: string) =>
    (this.alarmsModel = new AlarmsModel(frame));

  public setMeasuresModel = (frame: string) => {
    this.measuresModel = new MeasuresModel(frame, this.selectedFormat!);
    this.measuresModel.setMCMTModel(this.MCMTModel!);
  };

  public setMCMTModel = (frame: string) => (this.MCMTModel = new MCMTModel(frame));

  public setStatesModel = (frame: string) =>
    (this.statesModel = new StatesModel(frame));

  public setSelectedFormat = (format: number) => (this.selectedFormat = format);
}

export default Model;
