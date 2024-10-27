import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { store } from "src/store/StoreConfig"
import IncomingCallPage from "src/view/pages/IncomingCallPage"

describe("<IncomingCallPage/>", () => {
    const renderIncomingCallPage = () => {
        return <Provider store={store}>
            <BrowserRouter>
            <Routes>
                <Route path="*" element={<IncomingCallPage/>}/>
            </Routes>
            </BrowserRouter>
        </Provider>
    }

    test("should render two buttons", () => {
        render(renderIncomingCallPage())

        const buttons = screen.getAllByRole("button")
        expect(buttons).toHaveLength(5)
    })
})