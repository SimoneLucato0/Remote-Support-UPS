import MCMTModel from "src/model/MCMTModel";

describe("MCMTModel", () => {
  /* const frame = new Uint16Array([
    0x01, 0x03, 0x0a, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
    0xff, 0x15, 0x35,
  ]);
  const invalidFrame = new Uint16Array([
    0x01, 0x03, 0x0a, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
    0xfe, 0x15, 0x35,
  ]);
 */
  const frame = "01030AFFFFFFFFFFFFFFFFFFFF1535"
  const invalidFrame = "01030AFFFFFFFFFFFFFFFFFFFE1535"

  test("isMeasureManaged() should return true if a measure is managed", () => {
    const model = new MCMTModel(frame);
    for (let i = 0; i < 80; i++) {
      const result = model.isMeasureManaged(i);
      expect(result).toBeTruthy();
    }
  });

  test("isMeasureManaged() should return false if a measure is not managed", () => {
    const model = new MCMTModel(invalidFrame);
    const result = model.isMeasureManaged(79);
    expect(result).toBeFalsy();
  });
});
