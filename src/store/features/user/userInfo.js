import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const codeInfo = createSlice({
    name: "codeInfo",
    initialState,
    reducers: {
        setCodeInfo: (state, action) => {
            state.codeInfo = action.payload;
        },
    },
});

export const { setCodeInfo } = codeInfo.actions;

export default codeInfo.reducer;