const { createSlice } = require("@reduxjs/toolkit");

const countUnread = [
  {
    id: 0,
    count: 0,
  },
  {
    id: 1,
    count: 0,
  },
  {
    id: 2,
    count: 0,
  },
  {
    id: 3,
    count: 0,
  },
];
const unReadSlice = createSlice({
  name: "unread",
  initialState: countUnread,
  reducers: {
    haveUnread: (state, action) => {
      const idx = parseInt(action.payload);
      state[idx].count++;
    },
    readDone: (state, action) => {
      state.map((st) => {
        if (st.id == action.payload) st.count = 0;
      });
    },
  },
});

const { actions, reducer } = unReadSlice;
export const { haveUnread, readDone } = actions;
export default reducer;
