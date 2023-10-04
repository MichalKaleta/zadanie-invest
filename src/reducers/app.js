import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  darkTheme: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    darkThemeOn: (state) => {
      state.darkTheme = true;
    },
    darkThemeOff: (state) => {
      state.darkTheme = false;
    },
    fillList: (state, payload) => {
      state.list = payload;
    },
  },
});

export const { darkThemeOn, darkThemeOff, fillList } = appSlice.actions;

export default appSlice.reducer;
