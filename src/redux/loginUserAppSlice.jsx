import api from "api/userApi";

const { createSlice } = require("@reduxjs/toolkit");

const loginUserAppSlice = createSlice({
  name: "loginUserApp",
  initialState: {
    username: sessionStorage.getItem("username") || null,
    pos: {},
    profile: sessionStorage.getItem("profile") || {},
  },
  reducers: {
    login: async (state, action) => {
      const username = action.payload.username;
      const token = action.payload.token;

      state.username = username;
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("token", token);

      sessionStorage.setItem("profile", JSON.stringify(await api.getProfile()));
    },
    logout: (state) => {
      state.username = null;
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("profile");
      sessionStorage.removeItem("token");
    },
    getPos: (state, action) => {
      state.pos = action.payload;
    },
  },
});

const { reducer, actions } = loginUserAppSlice;
export const { login, logout, getPos } = actions;
export default reducer;
