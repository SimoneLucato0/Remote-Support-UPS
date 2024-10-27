import { useTypedDispatch } from "src/utility/hooks";
import ButtonUI from "../UI/ButtonUI";

import { WebRTCActionTypes } from "src/store/RTCMiddleware";

const AcceptButton = () => {
    const dispatch = useTypedDispatch()

    const onAcceptHandler = () => {
        dispatch({type: WebRTCActionTypes.ACCEPT_CALL})
    }

    return <ButtonUI variant="success" size="lg" onClick={() => {onAcceptHandler()}}>Accept</ButtonUI>
}

export default AcceptButton