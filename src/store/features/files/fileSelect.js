import {createSlice} from "@reduxjs/toolkit";

const initialState = {}

const fileSelect = createSlice({
    name: 'fileSelect',
    initialState,
    reducers: {
        setSelectFile: (state, action) => {
            state.fileSelect = action.payload;
        },
    }
})

export const {setSelectFile} = fileSelect.actions;
export default fileSelect.reducer;