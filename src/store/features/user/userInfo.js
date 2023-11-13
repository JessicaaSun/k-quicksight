import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const userInfo = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
    },
});

export const { setUserInfo } = userInfo.actions;

export default userInfo.reducer;