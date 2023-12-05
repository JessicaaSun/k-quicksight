import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    filename:  '',
    uuid: '',
    file_type: ''
}

const sampleDataset = createSlice({
    name: 'uuid',
    initialState,
    reducers: {
        setSampleFilename: (state, action) => {
            state.filename = action.payload
        },
        setSampleFileType: (state, action) => {
            state.file_type = action.payload
        }

    }
})

export const {setSampleFilename, setSampleFileType} = sampleDataset.actions;
export default sampleDataset.reducer;