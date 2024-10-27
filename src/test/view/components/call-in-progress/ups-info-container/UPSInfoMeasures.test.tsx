import { render, screen } from "@testing-library/react"
import UPSInfoMeasures, { singleMeasureModel, UPSInfoMeasuresModel } from "src/view/components/call-in-progress/ups-info-container/UPSInfoMeasures"

describe("<UPSInfoMeasures/>", () => {
    const empty = [] as Array<singleMeasureModel>
    const nonEmpty = [
        {
            name: "Battery",
            values: [{number: "M000", name: "Battery1", value: "1", unitMeasure: "A"}],
        },
        {
            name: "Bypass",
            values: [{number: "M001", name: "Bypass1", value: "2", unitMeasure: "B"}],
        },
    ]

    const emptyUPSInfoMeasures = (props: Partial<UPSInfoMeasuresModel> = {}) => {
        const defaultProps = {
            data: empty,
            isBatteryPresent: true,
            isBypassPresent: true,
        }
        return <UPSInfoMeasures {...defaultProps} {...props} />
    }

    const nonEmptyUPSInfoMeasures = (props: Partial<UPSInfoMeasuresModel> = {}) => {
        const defaultProps = {
            data: nonEmpty,
            isBatteryPresent: true,
            isBypassPresent: true,
        }
        return <UPSInfoMeasures {...defaultProps} {...props} />
    }

    test("should not render any tabs if an empty array is passed", () => {
        render(emptyUPSInfoMeasures())

        const tabList = screen.queryAllByRole("tab")
        expect(tabList).toHaveLength(0)
    })

    test("should render a tab for each object passed as parameter", () => {
        render(nonEmptyUPSInfoMeasures())

        const tabList = screen.getAllByRole("tab")
        expect(tabList.length).toEqual(nonEmpty.length)
    })

    test("should render a tab whose name is the same given in each object", () => {
        render(nonEmptyUPSInfoMeasures())

        const tabList = screen.getAllByRole("tab")
        for(let i = 0; i < tabList.length; i++)
            expect(tabList[i].textContent).toEqual(nonEmpty[i].name)
    })

    test("should render by default the values of the first object", () => {
        render(nonEmptyUPSInfoMeasures())

        const number = screen.getByText("M000")
        const name = screen.getByText("Battery1")
        const value = screen.getByText("1")
        const unitMeasure = screen.getByText("A")

        expect(number).toBeInTheDocument()
        expect(name).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(unitMeasure).toBeInTheDocument()
    })

    test("should render the corresponding values when a tab is clicked", () => {
        render(nonEmptyUPSInfoMeasures())

        const tabList = screen.getAllByRole("tab")
        const bypassTab = tabList.find(element => element.textContent === "Bypass")
        bypassTab?.click()

        const number = screen.getByText("M001")
        const name = screen.getByText("Bypass1")
        const value = screen.getByText("2")
        const unitMeasure = screen.getByText("B")

        expect(number).toBeInTheDocument()
        expect(name).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(unitMeasure).toBeInTheDocument()
    })
})