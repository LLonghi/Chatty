import socketIOClient from "socket.io-client";
const SOCKET_URL = "http://127.0.0.1:5571";

export const socket = socketIOClient(SOCKET_URL);