const { createSlice } = require("@reduxjs/toolkit");

const managerSlice = createSlice({
  name: "user",
  initialState: {
    username: localStorage.getItem("username") || null,
  },
  reducers: {
    login: (state, action) => {
      const username = action.payload.username;
      const token = action.payload.token;
      state.username = username;
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
      localStorage.setItem("type", "manager");
    },
    logout: (state) => {
      state.username = null;
      localStorage.removeItem("username");
      localStorage.removeItem("auth_token");
    },
  },
});

const { reducer, actions } = managerSlice;
export const { login, logout } = actions;
export default reducer;
