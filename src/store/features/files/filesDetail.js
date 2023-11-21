import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    fileDetail: [],
    fileAccurate: [],
}

const allRecord = createSlice({
    name: 'allRecord',
    initialState,
    reducers: {
        setFileDetail: (state, action) => {
            state.fileDetail = action.payload;
        },
        setFileAccurate: (state, action) => {
            state.fileAccurate = action.payload
        }
    }
})

export const {setFileDetail, setFileAccurate} = allRecord.actions;
export default allRecord.reducer;