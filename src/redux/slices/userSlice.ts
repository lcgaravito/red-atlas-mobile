import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginResponse } from "../../types";
import { RootState } from "../store";

export interface UserState {
  token?: string;
  is_verified?: boolean;
  expiration_subscription_date?: Date;
}

const initialState: UserState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<LoginResponse>) => {
      state.token = action.payload.token;
      state.is_verified = action.payload.is_verified;
      state.expiration_subscription_date =
        action.payload.expiration_subscription_date;
    },
    logOut: (state) => {
      state.token = undefined;
      state.is_verified = undefined;
      state.expiration_subscription_date = undefined;
    },
  },
});

export const { setUser, logOut } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
