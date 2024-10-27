import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "src/store/StoreConfig"
import ToggleMuteButton from "src/view/components/call-in-progress/video-section/ToggleMuteButton"

describe("<ToggleMuteButton/>", () => {
    const renderToggleMuteButton = () => {
        return <Provider store={store}>
            <ToggleMuteButton/>
        </Provider>
    }

    test("should render a button", () => {
        render(renderToggleMuteButton())

        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument()
    })
})