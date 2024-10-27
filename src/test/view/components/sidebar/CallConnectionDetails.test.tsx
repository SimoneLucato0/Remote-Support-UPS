import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "src/store/StoreConfig"
import CallConnectionDetails from "src/view/components/sidebar/CallConnectionDetails"

describe("<CallConnectionDetails/>", () => {
    const renderCallConnectionDetails = () => {
        return <Provider store={store}><CallConnectionDetails/></Provider>
    }

    test("should return hours, minutes and seconds", () => {
        render(renderCallConnectionDetails())

        const initialValues = screen.getByText("00:00:00")
        expect(initialValues).toBeInTheDocument()
    })
})