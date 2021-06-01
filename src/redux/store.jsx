import { configureStore } from "@reduxjs/toolkit";
import managerReducer from "./loginManagerAppSlice";
import merchantReducer from "./loginMerchantAppSlice";
import partnerReducer from "./loginPartnerAppSlice";
import tabNavSlice from "./tabNavSlice";
import loginUserAppSlice from "./loginUserAppSlice";
import cartOrderSlice from "./cartOrderSlice";
import unReadSlice from "./navMerchantUnread";

const rootReducer = {
  merchant: merchantReducer,
  partner: partnerReducer,
  manager: managerReducer,
  tabNav: tabNavSlice,
  loginUserApp: loginUserAppSlice,
  cartOrder: cartOrderSlice,
  unRead: unReadSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
