import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    allFiles: [],
    fileScrap: [],
    total: ''
}

const allFiles = createSlice({
    name: 'allFiles',
    initialState,
    reducers: {
        setFiles: (state, action) => {
            // console.log(action.payload)
            state.allFiles = action.payload;
        },
        setTotalSize: (state , action) => {
            state.total = action.payload
        },
        setFileScrap: (state, action) => {
            state.fileScrap = action.payload
        }
    }
})

export const {setFiles, setTotalSize, setFileScrap} = allFiles.actions;
export default allFiles.reducer;