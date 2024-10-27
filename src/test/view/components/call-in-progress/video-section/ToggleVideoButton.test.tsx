import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "src/store/StoreConfig"
import ToggleVideoButton from "src/view/components/call-in-progress/video-section/ToggleVideoButton"

describe("<ToggleVideoButton/>", () => {
    const renderToggleVideoButton = () => {
        return <Provider store={store}>
            <ToggleVideoButton/>
        </Provider>
    }

    test("should render a button", () => {
        render(renderToggleVideoButton())

        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument()
    })
})