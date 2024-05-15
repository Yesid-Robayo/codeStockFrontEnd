import { createSlice } from "@reduxjs/toolkit";
import { userData } from "../../utils/utilsDTOS";

type AuthState = {
  isAuthenticated: boolean;
  user: userData | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

/**
 * Represents the authentication reducer.
 */
export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Updates the state to indicate that the user is logged in.
     * @param state - The current state.
     * @param action - The login action payload.
     */
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    /**
     * Updates the state to indicate that the user is logged out.
     * @param state - The current state.
     */
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  },
});
