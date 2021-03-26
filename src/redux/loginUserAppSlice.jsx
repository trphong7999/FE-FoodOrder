const { createSlice } = require("@reduxjs/toolkit");

const loginUserAppSlice = createSlice({
  name: "loginUserApp",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

const { reducer, actions } = loginUserAppSlice;
export const { login, logout } = actions;
export default reducer;
