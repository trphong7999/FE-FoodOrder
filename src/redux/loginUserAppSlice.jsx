const { createSlice } = require("@reduxjs/toolkit");

const loginUserAppSlice = createSlice({
  name: "loginUserApp",
  initialState: {
    username: sessionStorage.getItem("username") || null,
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
      sessionStorage.removeItem("auth_token");
    },
  },
});

const { reducer, actions } = loginUserAppSlice;
export const { login, logout } = actions;
export default reducer;
