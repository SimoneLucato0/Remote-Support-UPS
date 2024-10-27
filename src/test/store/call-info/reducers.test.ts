import { Reducer } from "@reduxjs/toolkit";
import { ActionTypes } from "src/store/call-info/actions";
import { callInfo } from "src/store/call-info/reducers";

describe("callInfo reducers", () => {
  const callInfoReducer: Reducer = callInfo;

  test("should return initial state", () => {
    expect(callInfoReducer(undefined, {} as any)).toEqual({
      technicianStream: undefined,

      clientInfo: undefined,
      clientStreams: [],
      states: [],
      alarms: [],
      measures: [],
    });
  });

  test("should handle close call", () => {
    expect(
      callInfoReducer(undefined, { type: ActionTypes.CLOSE_CALL })
    ).toEqual({
      technicianStream: undefined,

      clientInfo: undefined,
      clientStreams: [],
      states: [],
      alarms: [],
      measures: [],
    });
  });

  test("should handle set client info", () => {
    const user = jest.mock("src/model/User");
    expect(
      callInfoReducer(undefined, {
        type: ActionTypes.SET_CLIENT_INFO,
        payload: user,
      })
    ).toEqual({
      technicianStream: undefined,

      clientInfo: user,
      clientStreams: [],
      states: [],
      alarms: [],
      measures: [],
    });
  });

  test("should handle set ups info", () => {
      const states = [{name: "", number: "", value: ""}]
      const alarms = [{name: "", number: "", value: ""}]
      const measures = [{name: "", values: [{name: "", number: "", value: ""}]}]

      expect(
        callInfoReducer(undefined, {
          type: ActionTypes.SET_UPS_INFO,
          payload: {states, alarms, measures},
        })
      ).toEqual({
        technicianStream: undefined,
  
        clientInfo: undefined,
        clientStreams: [],
        states: states,
        alarms: alarms,
        measures: measures,
      });
  })
});
