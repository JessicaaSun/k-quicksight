import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    fileType: null
}

const fileType = createSlice({
    name: 'fileType',
    initialState,
    reducers: {
        setFilesType: (state, action) => {
            state.fileType = action.payload;
        },
    }
})

export const { setFilesType } = fileType.actions;
export default fileType.reducer;