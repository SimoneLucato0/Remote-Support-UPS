import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "src/store/StoreConfig"
import TechnicianRegistry from "src/view/components/technician-details/TechnicianRegistry"

describe("<TechnicianRegistry/>", () => {
    const renderTechnicianRegistry = () => {
        return <Provider store={store}>
            <TechnicianRegistry/>
        </Provider>
    }

    test("should render the headers", () => {
        render(renderTechnicianRegistry())

        const name = screen.getByText("Name")
        const surname = screen.getByText("Surname")
        const code = screen.getByText("Code")
        const email = screen.getByText("Email")

        expect(name).toBeInTheDocument()
        expect(surname).toBeInTheDocument()
        expect(code).toBeInTheDocument()
        expect(email).toBeInTheDocument()
    })
})