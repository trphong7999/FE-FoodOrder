import { configureStore } from "@reduxjs/toolkit";
import managerReducer from "./loginManagerAppSlice";
import merchantReducer from "./loginMerchantAppSlice";
import tabNavSlice from "./tabNavSlice";
import loginUserAppSlice from "./loginUserAppSlice";

const rootReducer = {
  merchant: merchantReducer,
  manager: managerReducer,
  tabNav: tabNavSlice,
  loginUserApp: loginUserAppSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
