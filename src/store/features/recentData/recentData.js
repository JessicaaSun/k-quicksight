import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    model: ''
}

const recentData = createSlice({
    name: 'recentData',
    initialState,
    reducers: {
        setRecentData: (state, action) => {
            state.model = action.payload;
        },
    }
})

export const {setRecentData} = recentData.actions;
export default recentData.reducer;