import User from "src/model/User";
import { singleMeasureModel } from "src/view/components/call-in-progress/ups-info-container/UPSInfoMeasures";
import { singleStateOrAlarmModel } from "src/view/components/call-in-progress/ups-info-container/UPSInfoStatesOrAlarms";

export const ActionTypes = {
  CLOSE_CALL: "CLOSE_CALL",

  SET_CLIENT_INFO: "SET_CLIENT_INFO",
  SET_CLIENT_STREAMS: "SET_CLIENT_STREAMS",
  SET_CLIENT_VIDEO_ENABLED: "SET_CLIENT_VIDEO_ENABLED",
  SET_CLIENT_AUDIO_ENABLED: "SET_CLIENT_AUDIO_ENABLED",
  SET_TECHNICIAN_STREAM: "SET_TECHNICIAN_STREAM",
  SET_UPS_INFO: "SET_UPS_INFO",
  SET_UPS_USER_CONNECTION_DETAILS: "SET_UPS_USER_CONNECTION_DETAILS",
};

export const setClientInfo = (info: User) => ({
  type: ActionTypes.SET_CLIENT_INFO,
  payload: info,
});

export const setClientStreams = (streams: Array<MediaStream>) => ({
  type: ActionTypes.SET_CLIENT_STREAMS,
  payload: streams,
});

export const setTechnicianStream = (stream: MediaStream) => ({
  type: ActionTypes.SET_TECHNICIAN_STREAM,
  payload: stream,
});

export const setUPSInfo = (
  states: Array<singleStateOrAlarmModel>,
  alarms: Array<singleStateOrAlarmModel>,
  measures: Array<singleMeasureModel>,
  isBatteryPresent: boolean,
  isBypassPresent: boolean
) => ({
  type: ActionTypes.SET_UPS_INFO,
  payload: {
    states,
    alarms,
    measures,
    isBatteryPresent,
    isBypassPresent,
  },
});

export const setUPSUserConnectionDetails = (connectionDetails: string) => ({
  type: ActionTypes.SET_UPS_USER_CONNECTION_DETAILS,
  payload: connectionDetails,
});

export const closeCall = () => ({
  type: ActionTypes.CLOSE_CALL,
});
