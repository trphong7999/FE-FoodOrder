import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tabNavSlice from "./tabNavSlice";
import loginUserAppSlice from "./loginUserAppSlice";

const rootReducer = {
  user: userReducer,
  tabNav: tabNavSlice,
  loginUserApp: loginUserAppSlice
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
