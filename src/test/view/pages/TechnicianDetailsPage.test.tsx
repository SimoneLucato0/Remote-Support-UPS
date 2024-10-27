import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { store } from "src/store/StoreConfig"
import TechnicianDetailsPage from "src/view/pages/TechnicianDetailsPage"

describe("<TechnicianDetailsPage/>", () => {
    const renderTechnicianDetailsPage = () => {
        return <Provider store={store}>
            <BrowserRouter>
            <Routes>
                <Route path="*" element={<TechnicianDetailsPage/>}/>
            </Routes>
            </BrowserRouter>
        </Provider>
    }

    test("should render availability label", () => {
        render(renderTechnicianDetailsPage())

        const availabilityText = screen.getByText("Availability")
        expect(availabilityText).toBeInTheDocument()
    })
})