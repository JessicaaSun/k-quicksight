import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    fileType: null,
    filename: null
}

const fileType = createSlice({
    name: 'fileType',
    initialState,
    reducers: {
        setFilesType: (state, action) => {
            state.fileType = action.payload;
        },
        setFileName: (state, action) => {
            state.filename = action.payload;
        }
    }
})

export const { setFilesType, setFileName } = fileType.actions;
export default fileType.reducer;