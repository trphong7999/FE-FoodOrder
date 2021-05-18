const { createSlice } = require("@reduxjs/toolkit");

const merchantSlice = createSlice({
  name: "user",
  initialState: {
    email: localStorage.getItem("email") || null,
  },
  reducers: {
    loginMerchant: (state, action) => {
      const email = action.payload.email;
      const token = action.payload.token;
      const merchantId = action.payload.merchantId;
      state.email = email;
      localStorage.setItem("email", email);
      localStorage.setItem("token", token.token);
      localStorage.setItem("merchantId", merchantId);
      localStorage.setItem("type", "merchant");
    },
    logoutMerchant: (state) => {
      state.email = null;
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("merchantId");
    },
  },
});

const { reducer, actions } = merchantSlice;
export const { loginMerchant, logoutMerchant } = actions;
export default reducer;
