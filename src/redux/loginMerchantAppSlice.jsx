const { createSlice } = require("@reduxjs/toolkit");

const merchantSlice = createSlice({
  name: "user",
  initialState: {
    email: sessionStorage.getItem("email") || null,
  },
  reducers: {
    loginMerchant: (state, action) => {
      const email = action.payload.email;
      const token = action.payload.token;
      state.email = email;
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("token", token);
    },
    logoutMerchant: (state) => {
      state.email = null;
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("auth_token");
    },
  },
});

const { reducer, actions } = merchantSlice;
export const { loginMerchant, logoutMerchant } = actions;
export default reducer;
