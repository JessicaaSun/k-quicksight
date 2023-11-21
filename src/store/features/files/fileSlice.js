import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    allFiles: [],
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
        }
    }
})

export const {setFiles, setTotalSize} = allFiles.actions;
export default allFiles.reducer;