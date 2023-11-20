import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    fileDetail: []
}

const allRecord = createSlice({
    name: 'allRecord',
    initialState,
    reducers: {
        setFileDetail: (state, action) => {
            state.fileDetail = action.payload;
        },
    }
})

export const {setFileDetail} = allRecord.actions;
export default allRecord.reducer;