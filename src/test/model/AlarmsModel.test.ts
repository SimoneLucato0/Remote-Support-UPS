import AlarmsModel from "src/model/AlarmsModel";

// npm run test -- --coverage .

describe("AlarmsModel", () => {
  /* const frame = new Uint16Array([
    0x01, 0x03, 0x10, 0x00, 0x08, 0x00, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xe9, 0x9c,
  ]);

  const invalidFrame = new Uint16Array([
    0x01, 0x03, 0x10, 0x00, 0x08, 0x00, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x0F, 0x00, 0x00, 0xe9, 0x9c,
  ]); */

  const frame = "01031000080003000000000000000000000000E99C"
  const invalidFrame = "010310000800030000000000000000000F0000E99C"

  test("getFormattedAlarms() should return an empty array if a non valid frame is provided", () => {
    const model = new AlarmsModel(invalidFrame);
    const alarms = model.getFormattedAlarms();
    expect(alarms).toHaveLength(0);
  })

  test("getFormattedAlarms() should return a non empty array if a valid frame is provided", () => {
    const model = new AlarmsModel(frame);
    const alarms = model.getFormattedAlarms();
    expect(alarms).not.toHaveLength(0);
  });

  test("getFormattedAlarms() should return a properly formatted array if a valid frame is provided", () => {
    const model = new AlarmsModel(frame);
    const alarms = model.getFormattedAlarms();
    expect(alarms).toContainEqual(
      expect.objectContaining({
        number: expect.any(String),
        name: expect.any(String),
        value: expect.any(String),
      })
    );
  });
});
