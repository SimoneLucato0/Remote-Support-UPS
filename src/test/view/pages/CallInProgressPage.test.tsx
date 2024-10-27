import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { store } from "src/store/StoreConfig"
import CallInProgressPage from "src/view/pages/CallInProgressPage"

describe("<CallInProgressPage/>", () => {
    const renderCallInProgressPage = () => {
        return <Provider store={store}>
            <BrowserRouter>
            <Routes>
                <Route path="*" element={<CallInProgressPage/>}/>
            </Routes>
            </BrowserRouter>
        </Provider>
    }

    test("should render sidebar", () => {
        render(renderCallInProgressPage())

        const code = screen.getByText("Code")
        expect(code).toBeInTheDocument()
    })
})