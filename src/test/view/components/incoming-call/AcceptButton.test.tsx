import { applyMiddleware, createStore } from "@reduxjs/toolkit"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { RootReducer } from "src/store/RootReducer"
import RTCMiddleware, { WebRTCActionTypes } from "src/store/RTCMiddleware"
import { store } from "src/store/StoreConfig"
import AcceptButton from "src/view/components/incoming-call/AcceptButton"

describe("<AcceptButton/>", () => {
    
    const renderAcceptButton = () => {
        return <Provider store={store}>
            <AcceptButton/>
        </Provider>
    }

        test("should render a button on the screen", () => {
            render(renderAcceptButton())
    
            const button = screen.getByRole("button")
            expect(button).toBeInTheDocument()
        })

    test("should dispatch accept call on button click", () => {
        /* render(renderAcceptButton())
        store.dispatch({type: WebRTCActionTypes.CONNECTION_INIT})

        const button = screen.getByRole("button")

        button.click()

        const action = jest.fn(() => store.dispatch({type: WebRTCActionTypes.CLOSE_CALL})) 
        expect(action).toBeCalled() */
    })

})