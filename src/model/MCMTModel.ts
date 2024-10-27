import { checkCRC, getDataFromFrame, stringToUint16Array } from "src/utility/modelUtils";

class MCMTModel {
  private upsFrame: Uint16Array;
  private managedMeasures: string;

  constructor(frame: string) {
    const frameAsArray = stringToUint16Array(frame)
    if (checkCRC(frameAsArray)) {
      this.upsFrame = frameAsArray;
      this.managedMeasures = this.getAllManagedMeasures();
    } else {
      this.upsFrame = new Uint16Array(0);
      this.managedMeasures = "";
    }
  }

  private getAllManagedMeasures = () => {
    const data = getDataFromFrame(this.upsFrame!);
    let result = "";
    for (let i = 0; i < data.length; i++) result = result + data[i].toString(2);
    return result;
  };

  public isMeasureManaged = (index: number) => {
    if (this.managedMeasures && this.managedMeasures.length > 0)
      return parseInt(this.managedMeasures.charAt(index)) === 1;
    return false;
  };
}

export default MCMTModel;
