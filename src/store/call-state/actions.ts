export const ActionTypes = {
    CALL_INCOMING: "CALL_INCOMING",
    CALL_ACCEPTED: "CALL_ACCEPTED",
    CALL_REFUSED: "CALL_REFUSED",
    CALL_IN_PROGRESS: "CALL_IN_PROGRESS",
    CALL_CLOSED: "CALL_CLOSED",
}

export const incomingCall = () => ({
    type: ActionTypes.CALL_INCOMING,
})

export const acceptCall = () => ({
    type: ActionTypes.CALL_ACCEPTED,
})

export const refuseCall = () => ({
    type: ActionTypes.CALL_REFUSED,
})

export const inProgressCall = () => ({
    type: ActionTypes.CALL_IN_PROGRESS,
})

export const closeCall = () => ({
    type: ActionTypes.CALL_CLOSED
})