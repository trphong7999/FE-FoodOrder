import io from "socket.io-client";

const id =
  localStorage.merchantId || localStorage.partnerId || localStorage.userId;
const type = localStorage.type;
const socket = io(`http://localhost:4001?id=${id}&type=${type}`, {
  transport: ["websocket"],
});
// `https://api-food-order-thesis.herokuapp.com?id=${id}&type=${type}`,
export default socket;
