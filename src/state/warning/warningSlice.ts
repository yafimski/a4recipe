import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface WarningState {
  warning: string;
}

const initialState: WarningState = {
  warning: "",
};

const warningSlice = createSlice({
  name: "warning",
  initialState,
  reducers: {
    setWarning: (state, action: PayloadAction<string>) => {
      state.warning = action.payload;
    },
  },
});

export const { setWarning } = warningSlice.actions;

export default warningSlice.reducer;
