import { Reducer } from "@reduxjs/toolkit";
import { ActionTypes } from "src/store/call-states/actions";
import { callStates } from "src/store/call-states/reducers";

describe("callStates reducers", () => {
  const callStatesReducer: Reducer = callStates;

  test("should return initial state", () => {
    expect(callStates(undefined, {} as any)).toEqual({
      incomingCall: false,
      acceptedCall: false,
      inProgressCall: false,
      closedCall: false,
    });
  });

  test("should handle call accept", () => {
    expect(callStates(undefined, { type: ActionTypes.CALL_ACCEPTED })).toEqual({
      incomingCall: false,
      acceptedCall: true,
      inProgressCall: false,
      closedCall: false,
    });
  });

  test("should handle call refuse", () => {
    expect(callStates(undefined, { type: ActionTypes.CALL_REFUSED })).toEqual({
      incomingCall: false,
      acceptedCall: false,
      inProgressCall: false,
      closedCall: false,
    });
  });
  
  test("should handle call in progress", () => {
    expect(callStates(undefined, { type: ActionTypes.CALL_IN_PROGRESS })).toEqual({
      incomingCall: false,
      acceptedCall: false,
      inProgressCall: true,
      closedCall: false,
    });
  });
  
  test("should handle call closed", () => {
    expect(callStates(undefined, { type: ActionTypes.CALL_CLOSED })).toEqual({
      incomingCall: false,
      acceptedCall: false,
      inProgressCall: false,
      closedCall: true,
    });
  });

});
