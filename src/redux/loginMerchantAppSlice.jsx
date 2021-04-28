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
      const merchantId = action.payload.merchantId;
      state.email = email;
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("merchantId", merchantId);
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
