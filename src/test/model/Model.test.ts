import AlarmsModel from "src/model/AlarmsModel"
import MCMTModel from "src/model/MCMTModel"
import MeasuresModel from "src/model/MeasuresModel"
import Model from "src/model/model"
import StatesModel from "src/model/StatesModel"

describe("Model", () => {
    const model = new Model()
    const alarmsFrame = "01031000080003000000000000000000000000E99C"
    const measuresFrame = "0103A0000000000000000000000000000000000000000000000000000000000000015400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400005462"
    const MCMTFrame = "01030AFFFFFFFFFFFFFFFFFFFF1535"
    const statesFrame = "01031000080003000000000000000000000000E99C"

    test("getFormattedAlarms() should return an empty array if AlarmsModel is undefined", () => {
        const alarms = model.getFormattedAlarms()
        expect(alarms).toHaveLength(0)
    })

    test("getFormattedAlarms() should not return an empty array if AlarmsModel is defined", () => {
        model.setAlarmsModel(alarmsFrame)
        const alarms = model.getFormattedAlarms()
        expect(alarms).not.toHaveLength(0)
    })

    test("getFormattedAlarms() should return a properly formatted array if AlarmsModel is defined", () => {
        model.setAlarmsModel(alarmsFrame)
        const alarms = model.getFormattedAlarms()
        expect(alarms).toContainEqual(expect.objectContaining({
            number: expect.any(String),
            name: expect.any(String),
            value: expect.any(String),
        }))
    })

    test("getFormattedMeasures() should return an empty array if both of measures frame and selected format are undefined", () => {
        const measures = model.getFormattedMeasures()
        expect(measures).toHaveLength(0)
    })

    test("getFormattedMeasures() should return an empty array if one of measures frame and selected format are undefined", () => {
        model.setMeasuresModel(measuresFrame)
        const measures = model.getFormattedMeasures()
        expect(measures).toHaveLength(0)

        const model2 = new Model()
        model2.setSelectedFormat(0)
        const measures2 = model2.getFormattedMeasures()
        expect(measures2).toHaveLength(0)
    })

    test("getFormattedMeasures() should not return an empty array if MeasuresModel is defined", () => {
        model.setSelectedFormat(0)
        model.setMeasuresModel(measuresFrame)
        const measures = model.getFormattedMeasures()
        expect(measures).not.toHaveLength(0)
    })

    test("getFormattedMeasures() should return a properly formatted array if MeasuresModel is defined", () => {
        model.setSelectedFormat(0)
        model.setMeasuresModel(measuresFrame)
        const measures = model.getFormattedMeasures()
        expect(measures).toContainEqual(expect.objectContaining({
            name: expect.any(String),
            values: expect.any(Array),
        }))
    })

    test("getFormattedStates() should return an empty array if AlarmsModel is undefined", () => {
        const states = model.getFormattedStates()
        expect(states).toHaveLength(0)
    })

    test("getFormattedStates() should not return an empty array if AlarmsModel is defined", () => {
        model.setStatesModel(statesFrame)
        const states = model.getFormattedStates()
        expect(states).not.toHaveLength(0)
    })

    test("getFormattedStates() should a return a properly formatted array if AlarmsModel is defined", () => {
        model.setStatesModel(statesFrame)
        const states = model.getFormattedStates()
        expect(states).toContainEqual(expect.objectContaining({
            number: expect.any(String),
            name: expect.any(String),
            value: expect.any(String),
        }))
    })
})