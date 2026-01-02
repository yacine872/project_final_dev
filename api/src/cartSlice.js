import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    ItemsList: [],
    TotalPrice: 0,
    CheckedOut: false,
  },
  reducers: {
    AddItem: (state, action) => {
      const exists = state.ItemsList.find(
        (item) => item.id == action.payload.id
      );
      if (!exists) {
        state.ItemsList.push({
          ...action.payload,
          Quantity: 1,
          ItemPrice: action.payload.price,
        });
      } else {
        exists.ItemPrice += action.payload.price;
        exists.Quantity += 1;
      }
      state.TotalPrice = state.ItemsList.reduce(
        (sum, item) => sum + item.ItemPrice,
        0
      );
    },
    RemoveItem: (state, action) => {
      const AlreadyExists = state.ItemsList.find(
        (item) => item.id === action.payload.id
      );

      if (!AlreadyExists) return;

      const unitPrice = AlreadyExists.ItemPrice / AlreadyExists.Quantity;

      AlreadyExists.Quantity -= 1;
      AlreadyExists.ItemPrice -= unitPrice;

      if (AlreadyExists.Quantity === 0) {
        state.ItemsList = state.ItemsList.filter(
          (item) => item.id !== action.payload.id
        );
      }
      state.TotalPrice = state.ItemsList.reduce(
        (sum, item) => sum + item.ItemPrice,
        0
      );
    },
  },
});

export const { AddItem, RemoveItem } = cartSlice.actions;
export default cartSlice.reducer;
