import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "src/store/StoreConfig"
import AvailabilitySwitch from "src/view/components/technician-details/AvailabilitySwitch"

describe("<AvailabilitySwitch/>", () => {
    const renderAvailabilitySwitch = () => {
        return <Provider store={store}><AvailabilitySwitch/></Provider> 
    }

    test("should render a switch", () => {
        render(renderAvailabilitySwitch())

        const availabilityLabel = screen.getByText("Availability")
        expect(availabilityLabel).toBeInTheDocument()
    })
})