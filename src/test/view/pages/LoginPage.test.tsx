import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { store } from "src/store/StoreConfig"
import LoginPage from "src/view/pages/LoginPage"

describe("<LoginPage/>", () => {
    const renderLoginPage = () => {
        return <Provider store={store}>
            <BrowserRouter>
            <Routes>
                <Route path="*" element={<LoginPage/>}/>
            </Routes>
            </BrowserRouter>
        </Provider>
    }

    test("should render one button", () => {
        render(renderLoginPage())

        const button = screen.getAllByRole("button")
        expect(button).toHaveLength(1)
    })
})