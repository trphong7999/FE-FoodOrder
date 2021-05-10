import api from "api/userApi";
const { createSlice } = require("@reduxjs/toolkit");

const loginUserAppSlice = createSlice({
  name: "loginUserApp",
  initialState: {
    username: sessionStorage.getItem("username") || null,
    pos: {},
    profile: JSON.parse(sessionStorage.getItem("profile")) || {},
  },
  reducers: {
    login: (state, action) => {
      const username = action.payload.username;
      const token = action.payload.token;

      state.username = username;
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("token", token);
    },
    logout: (state) => {
      state.username = null;
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("profile");
    },
    getPos: (state, action) => {
      state.pos = action.payload;
    },
    getProfile: (state, action) => {
      state.profile = action.payload;
      console.log(action.payload);
      sessionStorage.setItem("profile", JSON.stringify(action.payload));
    },
  },
});

const { reducer, actions } = loginUserAppSlice;
export const { login, logout, getPos, getProfile } = actions;
export default reducer;
