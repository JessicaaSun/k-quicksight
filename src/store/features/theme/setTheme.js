import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: ''
}

const setTheme = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setThemeSwitcher: (state, action) => {
            state.theme = action.payload;
        },
    },
});

export const { setThemeSwitcher } = setTheme.actions;

export default setTheme.reducer;