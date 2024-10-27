import { applyMiddleware, createStore } from "@reduxjs/toolkit"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { setUPSInfo } from "src/store/call-info/actions"
import { RootReducer } from "src/store/RootReducer"
import RTCMiddleware from "src/store/RTCMiddleware"
import UPSInfoContainer from "src/view/components/call-in-progress/UPSInfoContainer"

describe("<UPSInfoContainer/>", () => {
    const states = [{number: "S000", name: "State1", value: "0"}]
    const alarms = [{number: "A000", name: "Alarm1", value: "1"}]
    const measures = [
        {
            name: "Battery",
            values: [{number: "M000", name: "Battery1", value: "10", unitMeasure: "A"}],
        },
        {
            name: "Bypass",
            values: [{number: "M001", name: "Bypass1", value: "2", unitMeasure: "B"}],
        },
    ]
    const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk, RTCMiddleware)))

    const renderUPSInfoContainer = () => {

        return <Provider store={store}>
            <UPSInfoContainer/>
        </Provider>
    }

    test("should render the three tabs for states, alarms and measures", () => {
        render(renderUPSInfoContainer())

        const tabList = screen.getAllByRole("tab")
        expect(tabList[0].textContent).toEqual("States")
        expect(tabList[1].textContent).toEqual("Alarms")
        expect(tabList[2].textContent).toEqual("Measures")
    })

    test("should render no data for the three tabs if no data is dispatched", () => {
        render(renderUPSInfoContainer())

        const tabList = screen.getAllByRole("tab")
        
        const stateNumber = screen.queryByText(states[0].number)
        const stateName = screen.queryByText(states[0].name)
        const stateValue = screen.queryByText(states[0].value)

        const alarmNumber = screen.queryByText(alarms[0].number)
        const alarmName = screen.queryByText(alarms[0].name)
        const alarmValue = screen.queryByText(alarms[0].value)

        const measureNumber = screen.queryByText(measures[0].values[0].number)
        const measureName = screen.queryByText(measures[0].values[0].name)
        const measureValue = screen.queryByText(measures[0].values[0].value)
        const measureUnitMeasure = screen.queryByText(measures[0].values[0].unitMeasure)

        expect(stateNumber).not.toBeInTheDocument()
        expect(stateName).not.toBeInTheDocument()
        expect(stateValue).not.toBeInTheDocument()
        
        tabList.find(element => element.textContent === "Alarms")?.click()
        
        expect(alarmNumber).not.toBeInTheDocument()
        expect(alarmName).not.toBeInTheDocument()
        expect(alarmValue).not.toBeInTheDocument()
        
        tabList.find(element => element.textContent === "Measures")?.click()
        
        expect(measureNumber).not.toBeInTheDocument()
        expect(measureName).not.toBeInTheDocument()
        expect(measureValue).not.toBeInTheDocument()
        expect(measureUnitMeasure).not.toBeInTheDocument()
    })

    test("should render data for the three tabs if data is dispatched", () => {
        render(renderUPSInfoContainer())

        store.dispatch(setUPSInfo(states, alarms, measures, true, true))

        const tabList = screen.getAllByRole("tab")
        
        const stateNumber = screen.queryByText(states[0].number)
        const stateName = screen.queryByText(states[0].name)
        const stateValue = screen.queryByText(states[0].value)

        const alarmNumber = screen.queryByText(alarms[0].number)
        const alarmName = screen.queryByText(alarms[0].name)
        const alarmValue = screen.queryByText(alarms[0].value)

        const measureNumber = screen.queryByText(measures[0].values[0].number)
        const measureName = screen.queryByText(measures[0].values[0].name)
        const measureValue = screen.queryByText(measures[0].values[0].value)
        const measureUnitMeasure = screen.queryByText(measures[0].values[0].unitMeasure)

        expect(stateNumber).toBeInTheDocument()
        expect(stateName).toBeInTheDocument()
        expect(stateValue).toBeInTheDocument()
        
        tabList.find(element => element.textContent === "Alarms")?.click()
        
        expect(alarmNumber).toBeInTheDocument()
        expect(alarmName).toBeInTheDocument()
        expect(alarmValue).toBeInTheDocument()
        
        tabList.find(element => element.textContent === "Measures")?.click()
        
        expect(measureNumber).toBeInTheDocument()
        expect(measureName).toBeInTheDocument()
        expect(measureValue).toBeInTheDocument()
        expect(measureUnitMeasure).toBeInTheDocument()
    })
})