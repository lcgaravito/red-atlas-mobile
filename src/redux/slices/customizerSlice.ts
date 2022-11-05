import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PortalKey } from "../../types";
import { RootState } from "../store";

export interface CustomizerState {
  portal: PortalKey;
}

const initialState: CustomizerState = {
  portal: PortalKey.residential,
};

export const customizerSlice = createSlice({
  name: "customizer",
  initialState,
  reducers: {
    setPortal: (state, action: PayloadAction<PortalKey>) => {
      state.portal = action.payload;
    },
  },
});

export const { setPortal } = customizerSlice.actions;

export const selectFilters = (state: RootState) => state.customizer;

export default customizerSlice.reducer;
