import api from "api/userApi";
const { createSlice } = require("@reduxjs/toolkit");

const loginUserAppSlice = createSlice({
  name: "loginUserApp",
  initialState: {
    username: localStorage.getItem("username") || null,
    pos: {},
    profile: JSON.parse(localStorage.getItem("profile")) || {
      info: {
        name: "",
        gender: "",
        avt: "",
        phone: "",
        email: "",
        location: {
          address: "",
          lat: null,
          lng: null,
        },
      },
    },
  },
  reducers: {
    login: (state, action) => {
      const username = action.payload.username;
      const token = action.payload.token;
      const id = action.payload.id;

      state.username = username;
      localStorage.setItem("username", username);
      localStorage.setItem("userId", id);
      localStorage.setItem("token", token);
      localStorage.setItem("type", "user");
    },
    logout: (state) => {
      state.username = null;
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      localStorage.removeItem("userId");
      localStorage.removeItem("type");
    },
    getPos: (state, action) => {
      state.pos = action.payload;
    },
    getProfile: (state, action) => {
      state.profile = action.payload;
      console.log(action.payload);
      localStorage.setItem("profile", JSON.stringify(action.payload));
    },
  },
});

const { reducer, actions } = loginUserAppSlice;
export const { login, logout, getPos, getProfile, changeSuccess } = actions;
export default reducer;
