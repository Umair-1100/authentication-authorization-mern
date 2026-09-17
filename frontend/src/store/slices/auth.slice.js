import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isInitializing: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isInitializing = false;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isInitializing = false;
      localStorage.removeItem("authToken");
    },
    setInitializing: (state, action) => {
      state.isInitializing = action.payload;
    },
  },
});

export const { setUser, logout, setInitializing } = authSlice.actions;
export default authSlice.reducer;
