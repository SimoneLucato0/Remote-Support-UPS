import axios from "axios";
import User from "src/model/User";
import { login as serviceLogin } from "src/service/auth";

import { WebRTCActionTypes } from "../RTCMiddleware";
export const ActionTypes = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  LOGOUT: "LOGOUT",
};


export const login = (email: string, password: string) => async (dispatch: any) => {
  const response = await serviceLogin(email, password)
  
  if(response.success){
    const user : User = new User(response.data, false, true)
    dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: user})
    dispatch({ type: WebRTCActionTypes.CONNECTION_INIT })
  }
  else
  dispatch({ type: ActionTypes.LOGIN_FAIL, payload: response.data})
};

export const logout = () => (dispatch: any) => {
  return dispatch({ type: ActionTypes.LOGOUT });
}
