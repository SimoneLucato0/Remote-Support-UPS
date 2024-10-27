import Measure from "src/model/Measure";

describe("Measure", () => {
  const oneOneFalseMeasure = new Measure("", "", "", 1, 1, false);

  test("getFormattedMeasure() should return a properly formatted measure", () => {
    const measure = oneOneFalseMeasure.getFormattedMeasure(1, 10, 0);
    expect(measure).toStrictEqual(
      expect.objectContaining({
        number: expect.any(String),
        name: expect.any(String),
        value: expect.any(String),
        unitMeasure: expect.any(String)
      })
    );
  });

});
