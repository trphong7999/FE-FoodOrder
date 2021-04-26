const { createSlice } = require("@reduxjs/toolkit");

const cartOrderSlice = createSlice({
  name: "cardOrder",
  initialState: JSON.parse(sessionStorage.getItem("cart")) || [],
  reducers: {
    addCartOrder: (state, action) => {
      const dishes = action.payload;
      dishes.quantity = 1;
      state.push(dishes);
      sessionStorage.setItem("cart", JSON.stringify(state));
    },
    incQuantity: (state, action) => {
      const dishes = action.payload;
      const idx = state.findIndex(
        (item) =>
          item.merchantId === dishes.merchantId && item.name === dishes.name
      );
      state[idx].quantity++;
      sessionStorage.setItem("cart", JSON.stringify(state));
    },
    decQuantity: (state, action) => {
      const dishes = action.payload;
      const idx = state.findIndex(
        (item) =>
          item.merchantId === dishes.merchantId && item.name === dishes.name
      );
      if (state[idx].quantity === 1) state.splice(idx, 1);
      else state[idx].quantity--;
      sessionStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

const { actions, reducer } = cartOrderSlice;
export const { addCartOrder, incQuantity, decQuantity } = actions;
export default reducer;
