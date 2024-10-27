import User from "src/model/User";

export type ClientOffer = {
    from: string,
    to: string,
    offer: RTCSessionDescription,
}

export type ClientIceCandidate = {
    from: string,
    to: string,
    candidate: RTCIceCandidate
}