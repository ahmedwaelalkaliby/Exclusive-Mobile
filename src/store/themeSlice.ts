import { createSlice } from "@reduxjs/toolkit";
import type { Theme } from "../types";

const themeSlice = createSlice({
  name: "theme",
  initialState: "light" as Theme,
  reducers: {
    setTheme: (_state, action: { payload: Theme }) => action.payload,
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
