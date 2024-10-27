import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "src/store/StoreConfig"
import TechnicianVideo from "src/view/components/call-in-progress/video-section/TechnicianVideo"

describe("<TechnicianVideo/>", () => {
    
    const renderTechnicianVideo = () => {
        return <Provider store={store}>
            <TechnicianVideo />
        </Provider>
    }

    test("should not render any video if stream is not set", () => {
        render(renderTechnicianVideo())

        const video = document.querySelector("video")
        expect(video?.currentTime).not.toBeGreaterThan(0)
        expect(video?.paused).toBeTruthy()
        expect(video?.ended).toBeFalsy()
    })

})