const { createSlice } = require("@reduxjs/toolkit");

const tabNavigation = [
  { id: 1, head: "Đơn hàng của bạn", active: true },
  { id: 2, head: "Cửa hàng yêu thích", active: false },
  { id: 3, head: "Quản lý thẻ", active: false },
];
const tabNavSlice = createSlice({
  name: "tabNav",
  initialState: tabNavigation,
  reducers: {
    changeActiveTab(state, action) {
      state.map((item, i) => {
        if (i === action.payload) {
          item.active = true;
        } else {
          item.active = false;
        }
        return item;
      });
    },
  },
});

const { actions, reducer } = tabNavSlice;
export const { changeActiveTab } = actions;
export default reducer;
