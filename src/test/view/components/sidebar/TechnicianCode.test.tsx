import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "src/store/StoreConfig"
import TechnicianCode from "src/view/components/sidebar/TechnicianCode"

describe("<TechnicianCode/>", () => {
    const renderTechnicianCode = () => {
        return <Provider store={store}>
            <TechnicianCode/>
        </Provider>
    }

    test("should render header", () => {
        render(renderTechnicianCode())

        const header = screen.getByText("Code")
        expect(header).toBeInTheDocument()
    })
})