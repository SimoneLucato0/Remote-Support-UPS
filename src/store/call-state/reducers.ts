import { AnyAction, Reducer } from '@reduxjs/toolkit'
import { ActionTypes } from './actions'

type initialCallStateModel = {
    incomingCall: boolean,
    acceptedCall: boolean,
    inProgressCall: boolean,
    closedCall: boolean,
}

const initialState : initialCallStateModel = {
    incomingCall: false,
    acceptedCall: false,
    inProgressCall: false,
    closedCall: false,
}

export const callState : Reducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case ActionTypes.CALL_INCOMING:
            return {
                ...state,
                incomingCall: true,
                closedCall: false,
            }

        case ActionTypes.CALL_ACCEPTED:
            return {
                ...state,
                acceptedCall: true,
                incomingCall: false,
            }

        case ActionTypes.CALL_REFUSED:
            return initialState

        case ActionTypes.CALL_IN_PROGRESS:
            return {
                ...state,
                inProgressCall: true,
            }
        
        case ActionTypes.CALL_CLOSED:
            return {
                ...initialState,
                closedCall: true,
            }
            

        default:
            return state
    }
}