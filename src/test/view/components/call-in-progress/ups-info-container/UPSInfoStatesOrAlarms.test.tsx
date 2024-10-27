import { render, screen } from "@testing-library/react"
import UPSInfoStatesOrAlarms, { singleStateOrAlarmModel, UPSInfoStatesOrAlarmsModel } from "src/view/components/call-in-progress/ups-info-container/UPSInfoStatesOrAlarms"

describe("<UPSInfoStatesOrAlarms/>", () => {
    const empty = [] as Array<singleStateOrAlarmModel>
    const nonEmpty = [
        {number: "S000", name: "State1", value: "0"}
    ]

    const emptyUPSInfoStatesOrAlarms = (props : Partial<UPSInfoStatesOrAlarmsModel> = {}) => {
        const defaultProps = {
            data: empty
        }
        return <UPSInfoStatesOrAlarms {...defaultProps} {...props}/>
    }

    const nonEmptyUPSInfoStatesOrAlarms = (props : Partial<UPSInfoStatesOrAlarmsModel> = {}) => {
        const defaultProps = {
            data: nonEmpty
        }
        return <UPSInfoStatesOrAlarms {...defaultProps} {...props}/>
    }

    test("should not return any data if an empty array is passed", () => {
        render(emptyUPSInfoStatesOrAlarms())

        const value = screen.queryAllByText("0")

        expect(value).toHaveLength(0)
    })

    test("should return the values if non empty array is passed", () => {
        render(nonEmptyUPSInfoStatesOrAlarms())

        const number = screen.getByText("S000")
        const name = screen.getByText("State1")
        const value = screen.getByText("0")

        expect(number).toBeInTheDocument()
        expect(name).toBeInTheDocument()
        expect(value).toBeInTheDocument()
    })
})