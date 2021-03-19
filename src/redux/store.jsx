import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tabNavSlice from "./tabNavSlice";

const rootReducer = {
  user: userReducer,
  tabNav: tabNavSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
