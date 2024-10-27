import {
  checkCRC,
  getDataFromFrame,
  stringToUint16Array,
  uint16ArrayToBinary,
} from "src/utility/modelUtils";
import { singleStateOrAlarmModel } from "src/view/components/call-in-progress/ups-info-container/UPSInfoStatesOrAlarms";
import { AlarmsList } from "./AlarmsList";

class AlarmsModel {
  private upsFrame?: Uint16Array;

  constructor(frame: string) {
    const frameAsArray = stringToUint16Array(frame)

    if (checkCRC(frameAsArray)) {
      this.upsFrame = frameAsArray;
    } else {
      this.upsFrame = new Uint16Array(0)
    }
  }

  public getFormattedAlarms = () : Array<singleStateOrAlarmModel> => {
    let result = [] as Array<singleStateOrAlarmModel>;
    const data = getDataFromFrame(this.upsFrame!);
    const binaryFrame = uint16ArrayToBinary(data);
    for (let i = 0; i < binaryFrame.length; i++) {
      result[i] = { ...AlarmsList[i], value: binaryFrame[i] };
    }
    return result;
  };
}

export default AlarmsModel;
