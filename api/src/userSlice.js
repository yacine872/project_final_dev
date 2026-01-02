import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await axios.get('http://localhost:8080/api/auth/users');
  return res.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null,
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = 'Erreur lors du chargement des utilisateurs';
      });
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
