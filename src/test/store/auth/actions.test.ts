var mockLogin = jest.fn()
const dispatchLogin = jest.mock("src/store/auth/actions", () => ({
    login: mockLogin
}))

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { login } from "src/store/auth/actions";
import RTCMiddleware, { WebRTCActionTypes } from "src/store/RTCMiddleware";
import { store } from "src/store/StoreConfig";


describe("auth actions", () => {

  test("should call serviceLogin", () => {
/* 
    const fn = jest.fn(() => store.dispatch({type: WebRTCActionTypes.CONNECTION_INIT}))

    expect(fn).toBeCalled() */
  })
});
