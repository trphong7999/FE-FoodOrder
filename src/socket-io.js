import io from "socket.io-client";

const id =
  localStorage.merchantId || localStorage.partnerId || localStorage.userId;
const type = localStorage.type;
const socket = io(`localhost:4000?id=${id}&type=${type}`, {
  transport: ["websocket"],
});

export default socket;
