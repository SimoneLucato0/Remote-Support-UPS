import { useTypedDispatch } from "src/utility/hooks";
import ButtonUI from "../UI/ButtonUI";

import { WebRTCActionTypes } from "src/store/RTCMiddleware";

const RefuseButton = () => {
    const dispatch = useTypedDispatch()

    const onRejectHandler = () => {
        dispatch({type: WebRTCActionTypes.REFUSE_CALL})
    }

    return <ButtonUI variant="danger" size="lg" onClick={() => {onRejectHandler()}}>Refuse</ButtonUI>
}

export default RefuseButton