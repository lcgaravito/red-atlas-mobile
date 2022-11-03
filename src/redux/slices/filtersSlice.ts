import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FiltersState {
  forLease: boolean;
  forSale: boolean;
}

const initialState: FiltersState = {
  forLease: false,
  forSale: false,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleForLease: (state) => {
      state.forLease = !state.forLease;
    },
    toggleForSale: (state) => {
      state.forSale = !state.forSale;
    },
  },
});

export const { toggleForLease, toggleForSale } = filtersSlice.actions;

export const selectFilters = (state: RootState) => state.filters;

export default filtersSlice.reducer;
