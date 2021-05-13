import { getPos } from "redux/loginUserAppSlice";
import { useDispatch } from "react-redux";

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function computeDistant(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d.toFixed(1);
}

const validatePrice = (price) => {
  if (typeof price === "string") {
    return price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  } else {
    const numberPrice = price.toString();
    return numberPrice.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }
};

const sumQuantity = (acc, curr) => acc + curr.quantity;

const sumTotal = (acc, curr) => acc + curr.total;
var lat;
const getLocationUser = () => {
  navigator.geolocation.getCurrentPosition(
    callback,
    (e) => console.log("fail", e),
    { timeout: 10000 }
  );
  function callback(position) {
    localStorage.setItem("lat", position.coords.latitude);
    localStorage.setItem("lng", position.coords.longitude);
  }
  return lat;
};

export {
  validatePrice,
  getLocationUser,
  sumQuantity,
  sumTotal,
  computeDistant,
};
