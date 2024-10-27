import io from "socket.io-client";
import Model from "src/model/model";
import User from "src/model/User";
import { ClientOffer, ClientIceCandidate } from "./RTCMiddlewareTypes";
import {
  acceptCall,
  closeCall as closeCallForCallState,
  incomingCall,
  inProgressCall,
  refuseCall,
} from "./call-states/actions";
import {
  closeCall as closeCallForInProgressCall,
  setClientInfo,
  setClientStreams,
  setTechnicianStream,
  setUPSInfo,
  setUPSUserConnectionDetails,
} from "./call-info/actions";

export const WebRTCActionTypes = {
  CONNECTION_INIT: "CONNECTION_INIT",

  UPDATE_AVAILABILITY: "UPDATE_AVAILABILITY",

  SEND_MEDIA_STATUS: "SEND_MEDIA_STATUS",

  ACCEPT_CALL: "ACCEPT_CALL",
  REFUSE_CALL: "REFUSE_CALL",
  CLOSE_CALL: "CLOSE_CALL",
};

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

const RTCMiddleware = (store) => {
  /** @type {RTCPeerConnection} */
  let peerConnection;
  /** @type {RTCDataChannel} */
  let dataChannel;

  let socket;

  const model = new Model();

  return (next) => (action) => {
    switch (action.type) {
      case WebRTCActionTypes.CONNECTION_INIT: {
        console.log("Starting");

        socket = io(`${process.env.REACT_APP_SIGNALING_ENDPOINT}/`, {
          transports: ["websocket"],
          query: { ...store.getState().auth.technician },
        });

        peerConnection = new RTCPeerConnection(servers);

        socket.on("start-call", (client) => {
          console.log("start-call", client);

          navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            for (const track of stream.getTracks()) {
              console.log("adding track: ", track);
              peerConnection.addTrack(track, stream);
            }
            store.dispatch(setTechnicianStream(stream));
          });

          const clientInfo = new User(client.from, true);

          if (clientInfo instanceof User) {
            store.dispatch(setClientInfo(clientInfo));
            store.dispatch(incomingCall());
          }
        });

        socket.on("client-offer", async (offer) => {
          console.log("client-offer", offer);

          /** @type {ClientOffer} */
          const off = offer;
          if (off.offer) {
            await peerConnection.setRemoteDescription(off.offer);

            const answer = await peerConnection.createAnswer();

            await peerConnection.setLocalDescription(answer);

            const obj = {
              from: store.getState().auth.technician,
              to: store.getState().callInfo.clientInfo,
              answer: answer,
            };

            socket.emit("technician-offer", obj);
          }
        });

        socket.on("client-ice-candidate", (iceCandidate) => {
          /** @type {ClientIceCandidate} */
          const candidate = iceCandidate;

          if (Object.keys(candidate).length === 3) {
            console.log("client-ice-candidate", candidate);

            peerConnection.addIceCandidate(candidate.candidate);
          }
        });

        socket.on("close-call", (data) => {
          console.log("close-call", data);

          store.getState().callInfo.technicianStream.getTracks().forEach((track) => {
            track.stop();
          });

          if (peerConnection && data.from && data.to) {
            for (const sender of peerConnection.getSenders()) {
              console.log("removing track: ", sender.track);
              peerConnection.removeTrack(sender);
            }

            peerConnection.close();
            peerConnection = null;

            store.dispatch(closeCallForCallState());
            store.dispatch(closeCallForInProgressCall());

            store.dispatch({ type: WebRTCActionTypes.CONNECTION_INIT });
          }
        });

        peerConnection.addEventListener("icecandidate", (event) => {
          console.log("event-listener-icecandidate", event);

          if (event.candidate) {
            const obj = {
              from: store.getState().auth.technician,
              to: store.getState().callInfo.clientInfo,
              candidate: event.candidate,
            };

            socket.emit("technician-ice-candidate", obj);
          }
        });

        peerConnection.addEventListener("datachannel", (event) => {
          console.log("event-listener-datachannel", event);

          store.dispatch(inProgressCall());

          dataChannel = event.channel;

          dataChannel.onopen = (event) => {
            console.log("data-channel-onopen", event);
          };

          dataChannel.onmessage = (event) => {
            console.log("data-channel-onmessage", event);
            const parsedData = JSON.parse(event.data);
            console.log("parsedData", parsedData);

            if (parsedData.type === "config") {
              const { mcmt, format } = parsedData.data;

              model.setMCMTModel(mcmt);
              model.setSelectedFormat(format);
            }

            if (parsedData.type === "data") {
              const {
                states,
                alarms,
                measurements,
                isBatteryPresent,
                isBypassPresent,
              } = parsedData.data;

              model.setAlarmsModel(states);
              model.setStatesModel(alarms);
              model.setMeasuresModel(measurements);

              const statesList = model.getFormattedStates();
              const alarmsList = model.getFormattedAlarms();
              const measuresList = model.getFormattedMeasures();

              store.dispatch(
                setUPSInfo(
                  statesList,
                  alarmsList,
                  measuresList,
                  isBatteryPresent,
                  isBypassPresent
                )
              );
              store.dispatch(setUPSUserConnectionDetails("connected"));
            }

            if (parsedData.type === "upsConnectionStatus") {
              const status = parsedData.data.upsConnectionStatus;

              store.dispatch(setUPSUserConnectionDetails(status));
            }
          };
        });

        peerConnection.addEventListener("track", (event) => {
          console.log("track-event", event);
          store.dispatch(setClientStreams(event.streams));
        });

        return;
      }

      case WebRTCActionTypes.ACCEPT_CALL: {
        const obj = {
          from: store.getState().auth.technician,
          to: store.getState().callInfo.clientInfo,
        };
        console.log("accept-call", obj);
        socket.emit("accept-call", obj);

        store.dispatch(acceptCall());

        return;
      }

      case WebRTCActionTypes.REFUSE_CALL: {
        const obj = {
          from: store.getState().auth.technician,
          to: store.getState().InProgressCall.clientInfo,
        };

        socket.emit("refuse-call", obj);

        store.dispatch(refuseCall());

        return;
      }

      case WebRTCActionTypes.CLOSE_CALL: {
        const obj = {
          from: store.getState().auth.technician,
          to: store.getState().callInfo.clientInfo,
        };
        console.log("emit-close-call", obj);
        socket.emit("close-call", obj);

        store.getState().callInfo.technicianStream.getTracks().forEach((track) => {
          track.stop();
        });

        if (peerConnection) {
          for (const sender of peerConnection.getSenders()) {
            console.log("removing track: ", sender.track);
            peerConnection.removeTrack(sender);
          }

          peerConnection.close();
          peerConnection = null;

          store.dispatch(closeCallForCallState());
          store.dispatch(closeCallForInProgressCall());

          store.dispatch({ type: WebRTCActionTypes.CONNECTION_INIT });
        }

        return;
      }

      case WebRTCActionTypes.UPDATE_AVAILABILITY: {
        const obj = {
          from: store.getState().auth.technician,
          availability: action.payload,
        };

        store.getState().auth.technician.setIsAvailable(action.payload);

        socket.emit("update-availability", obj);
        return;
      }

      case WebRTCActionTypes.SEND_MEDIA_STATUS: {
        console.log("sending-media-status", action.payload);

        if (dataChannel.readyState === "open") {
          console.log("sent-media-status");
          dataChannel.send(
            JSON.stringify({
              type: "mediaStatus",
              data: action.payload,
            })
          );
        }
      }
    }

    return next(action);
  };
};

export default RTCMiddleware;
