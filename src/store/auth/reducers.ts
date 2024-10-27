import { AnyAction, Reducer } from "@reduxjs/toolkit";
import User from "src/model/User";
import { ActionTypes } from "./actions";

// ** Updated auth
type authInitialstateModel = {
  technician?: User;
  error?: string;
  isAuthenticated: boolean,
};

const authInitialState: authInitialstateModel = {
  technician: undefined,
  error: "",
  isAuthenticated: false,
};

export const auth: Reducer = (state = authInitialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        technician: action.payload,
        isAuthenticated: true,
        error: "",
      };

    case ActionTypes.LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ActionTypes.LOGOUT:
      return authInitialState;

    default:
      return state;
  }
};
