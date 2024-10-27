import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { store } from "src/store/StoreConfig"
import WaitingCallPage from "src/view/pages/WaitingCallPage"

describe("<WaitingCallPage/>", () => {
    const renderWaitingCallPage = () => {
        return <Provider store={store}>
            <BrowserRouter>
            <Routes>
                <Route path="*" element={<WaitingCallPage/>}/>
            </Routes>
            </BrowserRouter>
        </Provider>
    }

    test("should render waiting call text", () => {
        render(renderWaitingCallPage())

        const waitingForACallText = screen.getByText("Waiting for a call...")
        expect(waitingForACallText).toBeInTheDocument()
    })
})