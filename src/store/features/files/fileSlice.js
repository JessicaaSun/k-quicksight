import {createSlice} from "@reduxjs/toolkit";

const initialState = {}

const allFiles = createSlice({
    name: 'allFiles',
    initialState,
    reducers: {
        setFiles: (state, action) => {
            // console.log(action.payload)
            state.allFiles = action.payload;
        },
    }
})

export const {setFiles} = allFiles.actions;
export default allFiles.reducer;