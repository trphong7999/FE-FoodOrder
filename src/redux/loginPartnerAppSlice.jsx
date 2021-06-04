const { createSlice } = require("@reduxjs/toolkit");

const partnerSlice = createSlice({
  name: "user",
  initialState: {
    email: localStorage.getItem("email") || null,
    profile: JSON.parse(localStorage.getItem("profile")) || {
      name: "",
      address: "",
      gender: "",
      avt: "",
      phone: "",
      setting: {
        radiusWorking: 2000,
      },
    },
  },
  reducers: {
    loginPartner: (state, action) => {
      console.log(action);
      const email = action.payload.email;
      const token = action.payload.token;
      const partnerId = action.payload.partnerId;
      localStorage.setItem("email", email);
      localStorage.setItem("token", token.token);
      localStorage.setItem("partnerId", partnerId);
      localStorage.setItem("type", "partner");
    },
    logoutPartner: (state) => {
      state = null;
      localStorage.clear();
    },
    getProfile: (state, action) => {
      console.log(action.payload, "profile partner");
      state.profile = action.payload;
      state.email = localStorage.email;
      localStorage.setItem("profile", JSON.stringify(action.payload));
    },
  },
});

const { reducer, actions } = partnerSlice;
export const { loginPartner, logoutPartner, getProfile } = actions;
export default reducer;
