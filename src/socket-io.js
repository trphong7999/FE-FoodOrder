import io from "socket.io-client";

const data = localStorage.merchantId;
const socket = io(`localhost:4000?data=${data}`, { transport: ["websocket"] });

export default socket;
