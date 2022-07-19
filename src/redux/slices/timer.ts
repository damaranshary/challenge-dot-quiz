import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
      timerCount: 1200 as number,
      timerNotification: undefined as string | undefined
  },
  reducers: {
    setTimerCount: (state, action: PayloadAction<number>) => {
      state.timerCount = state.timerCount + action.payload;
    },
    resetTimerCount: (state) => {
      state.timerCount = 1200;
    },
    setTimerNotification: (state, action: PayloadAction<string | undefined>) => {
      state.timerNotification = action.payload;
    },
  }
})

export const { setTimerCount, resetTimerCount, setTimerNotification } = timerSlice.actions;

export default timerSlice.reducer;

