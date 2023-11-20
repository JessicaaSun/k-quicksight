import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    dataset: []
}

const recentData = createSlice({
    name: 'recentData',
    initialState,
    reducers: {
        setRecentData: (state, action) => {
            state.dataset = action.payload;
        },
    }
})

export const {setRecentData} = recentData.actions;
export default recentData.reducer;