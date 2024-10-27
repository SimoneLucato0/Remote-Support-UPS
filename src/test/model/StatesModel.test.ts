import StatesModel from "src/model/StatesModel"

describe("StatesModel", () => {
    const frame = "01031000080003000000000000000000000000E99C"
    const invalidFrame = "01031000080003F00000000000000000000000E99C"

    test("getFormattedStates() should return an empty array if a non valid frame is provided", () => {
        const model = new StatesModel(invalidFrame);
        const states = model.getFormattedStates();
        expect(states).toHaveLength(0);
      })
    
      test("getFormattedStates() should return a non empty array if a valid frame is provided", () => {
        const model = new StatesModel(frame);
        const states = model.getFormattedStates();
        expect(states).not.toHaveLength(0);
      });
    
      test("getFormattedStates() should return a properly formatted array if a valid frame is provided", () => {
        const model = new StatesModel(frame);
        const states = model.getFormattedStates();
        expect(states).toContainEqual(
          expect.objectContaining({
            number: expect.any(String),
            name: expect.any(String),
            value: expect.any(String),
          })
        );
      });
})