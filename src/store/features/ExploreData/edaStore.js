import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    independent_variable: null,
    dependent_variable: null,
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
        setDetail: (state, action) => {
            state.detail = action.payload;
        },
        setDependentVariable: (state, action) => {
            state.dependent_variable = action.payload;
        },
        setInDependentVariable: (state, action) => {
            state.independent_variable = action.payload;
        },
    }
})

export const { setInDependentVariable, setDependentVariable ,setEdaFilename, setVisualization, setDetail} = eda.actions;
export default eda.reducer;