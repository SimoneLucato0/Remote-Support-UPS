import { Reducer } from "@reduxjs/toolkit";
import { auth } from "src/store/auth/reducers";
import { ActionTypes } from "src/store/auth/actions";

describe("auth reducer", () => {
  const authReducer: Reducer = auth;

  test("should return initial state", () => {
    expect(authReducer(undefined, {} as any)).toEqual({
      technician: undefined,
      error: "",
      isAuthenticated: false,
    });
  });

  test("should handle login success", () => {
      const mockTechnican = jest.mock("src/model/User")
      expect(authReducer(undefined, {type: ActionTypes.LOGIN_SUCCESS, payload: mockTechnican})).toEqual({
        technician: mockTechnican,
        error: "",
        isAuthenticated: true,
      })
  })

  test("should handle login fail", () => {
      const error = "Some error string"
      expect(authReducer(undefined, {type: ActionTypes.LOGIN_FAIL, payload: error})).toEqual({
        technician: undefined,
        error: error,
        isAuthenticated: false,
      })
  })

  test("should handle logout", () => {
      expect(authReducer(undefined, {type: ActionTypes.LOGOUT})).toEqual({
        technician: undefined,
        error: "",
        isAuthenticated: false,
      })
  })
});
