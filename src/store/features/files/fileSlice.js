import {createSlice} from "@reduxjs/toolkit";

const initialState = {}

const allFiles = createSlice({
    name: 'allFiles',
    initialState,
    reducers: {
        setFiles: (state, action) => {
            state.allFiles = action.payload;
        }
    }
})

export const {setFiles} = allFiles.actions;
export default allFiles.reducer;