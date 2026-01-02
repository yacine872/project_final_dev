import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    OrderList: [],
    OrderHistory: [],
  },
  reducers: {
    MakeOrder: (state, action) => {
      const { items, user } = action.payload;

      state.OrderHistory.push({
        items,
        id: Date.now(),
        email: user.email,
        date: new Date().toISOString(),
      });
      state.OrderList = [];
    },
    ClearOrder: (state) => {
      state.OrderList = [];
    },
  },
});

export const { MakeOrder, ClearOrder } = orderSlice.actions;
export default orderSlice.reducer;
