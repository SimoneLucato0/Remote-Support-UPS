import { AnyAction, combineReducers } from "@reduxjs/toolkit";

import { auth } from "./auth/reducers";
import { callStates } from "./call-states/reducers";
import { callInfo } from "./call-info/reducers";

const AppReducer = combineReducers({ auth, callStates, callInfo });

export const RootReducer = (state: any , action: AnyAction) => {
    if(action.type === "USER_LOGOUT")
        return AppReducer(undefined, action)
    return AppReducer(state, action)
}