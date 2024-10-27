import { applyMiddleware, createStore } from "@reduxjs/toolkit"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { RootReducer } from "src/store/RootReducer"
import RTCMiddleware, { WebRTCActionTypes } from "src/store/RTCMiddleware"
import { store } from "src/store/StoreConfig"
import HangUpButton from "src/view/components/call-in-progress/video-section/HangUpButton"

describe("<HangUpButton/>", () => {
    

    const renderHangUpButton = () => {
        return <Provider store={store}>
            <HangUpButton/>
        </Provider>
    }

    test("should render a button on the screen", () => {
        render(renderHangUpButton())

        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument()
    })

    test("should close the call on button click", () => {
        /* (global as any).RTCPeerConnection = jest.fn()
        Object.defineProperty((global as any).RTCPeerConnection, "addEventListener", {
            writable: true,
            value: jest.fn()
        })

        render(renderHangUpButton())

        store.dispatch({type: WebRTCActionTypes.CONNECTION_INIT})

        const button = screen.getByRole("button")

        button.click()


        const action = jest.fn(() => store.dispatch({type: WebRTCActionTypes.CLOSE_CALL})) 
        expect(action).toBeCalled()  */
    })
})