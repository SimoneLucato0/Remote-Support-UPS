import { applyMiddleware, createStore } from "@reduxjs/toolkit"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { setClientStreams } from "src/store/call-info/actions"
import { RootReducer } from "src/store/RootReducer"
import RTCMiddleware from "src/store/RTCMiddleware"
import ClientVideo from "src/view/components/call-in-progress/video-section/ClientVideo"

describe("<ClientVideo/>", () => {
    const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk, RTCMiddleware)))
    
    const renderClientVideo = () => {
        return <Provider store={store}>
            <ClientVideo />
        </Provider>
    }

    test("should not render any video if stream is not set", () => {
        render(renderClientVideo())

        const video = document.querySelector("video")
        expect(video?.currentTime).not.toBeGreaterThan(0)
        expect(video?.paused).toBeTruthy()
        expect(video?.ended).toBeFalsy()
    })

    test("should render video if stream is set", () => {
        
    })
})