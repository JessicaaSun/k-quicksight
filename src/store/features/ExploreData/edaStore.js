import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    filename: null,
    visualizes: []
}

const eda = createSlice({
    name: 'eda',
    initialState,
    reducers: {
        setEdaFilename: (state, action) => {
            state.filename = action.payload;
        },
        setVisualization: (state, action) => {
            state.visualizes = action.payload;
        },
    }
})

export const { setEdaFilename, setVisualization} = eda.actions;
export default eda.reducer;