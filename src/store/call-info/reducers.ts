import { AnyAction, Reducer } from "@reduxjs/toolkit";
import User from "src/model/User";
import { singleMeasureModel } from "src/view/components/call-in-progress/ups-info-container/UPSInfoMeasures";
import { singleStateOrAlarmModel } from "src/view/components/call-in-progress/ups-info-container/UPSInfoStatesOrAlarms";
import { ActionTypes } from "./actions";

type initialStateModel = {
  technicianStream?: MediaStream;

  clientInfo?: User;
  clientStreams: Array<MediaStream>;
  states: Array<singleStateOrAlarmModel>;
  alarms: Array<singleStateOrAlarmModel>;
  measures: Array<singleMeasureModel>;
  isBatteryPresent?: boolean;
  isBypassPresent?: boolean;

  isDataFiltered?: boolean;

  upsUserConnectionDetails: "connected" | "disconnected" | "";
};

const initialState: initialStateModel = {
  technicianStream: undefined,

  clientInfo: undefined,
  clientStreams: [],
  states: [],
  alarms: [],
  measures: [],
  isBatteryPresent: undefined,
  isBypassPresent: undefined,

  isDataFiltered: false,

  upsUserConnectionDetails: "",
};

export const callInfo: Reducer = (
  state = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case ActionTypes.CLOSE_CALL:
        return initialState

    case ActionTypes.SET_CLIENT_INFO:
      return {
        ...state,
        clientInfo: action.payload,
      };

    case ActionTypes.SET_CLIENT_STREAMS:
      return {
        ...state,
        clientStreams: action.payload,
      };

    case ActionTypes.SET_TECHNICIAN_STREAM:
      return {
        ...state,
        technicianStream: action.payload,
      };

    case ActionTypes.SET_UPS_INFO:
      return {
        ...state,
        ...action.payload,
      };

    case ActionTypes.SET_UPS_USER_CONNECTION_DETAILS:
      return {
        ...state,
        upsUserConnectionDetails: action.payload,
      }

    case ActionTypes.UPDATE_IS_DATA_FILTERED:
      return {
        ...state,
        isDataFiltered: action.payload,
      }

    default:
      return state;
  }
};
