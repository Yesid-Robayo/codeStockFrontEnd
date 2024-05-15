import { createSlice } from "@reduxjs/toolkit";

type utilsRedux = {
    language: string;
};

const initialState: utilsRedux = {
    language: "es",
};

/**
 * Reducer for managing the language state.
 */
export const languageReducer = createSlice({
    name: "language",
    initialState,
    reducers: {
        /**
         * Action creator for setting the language.
         * @param state - The current state.
         * @param action - The action object containing the payload.
         */
        setLanguaje: (state, action) => {
            state.language = action.payload;
        }
    },
});
