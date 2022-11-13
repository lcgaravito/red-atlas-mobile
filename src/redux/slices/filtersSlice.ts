import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FiltersState {
  market_id: number;
  listing_sector_id: Array<number>;
}

const initialState: FiltersState = {
  market_id: 1,
  listing_sector_id: [1, 2, 3, 4],
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
});

export const {} = filtersSlice.actions;

export const selectFilters = (state: RootState) => state.filters;

export default filtersSlice.reducer;
