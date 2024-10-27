import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "src/store/StoreConfig"
import ClientInfo from "src/view/components/sidebar/ClientInfo"

describe("<ClientInfo/>", () => {
    const renderClientInfo = () => {
        return <Provider store={store}><ClientInfo/></Provider>
    }

    test("should render the structure", () => {
        render(renderClientInfo())

        const header = screen.getByText("Client")
        const name = screen.getByText("Name:")
        const surname = screen.getByText("Surname:")

        expect(header).toBeInTheDocument()
        expect(name).toBeInTheDocument()
        expect(surname).toBeInTheDocument()
    })
})