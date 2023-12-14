import React from 'react';
import {Select, SelectItem} from "@nextui-org/react";
import {useDispatch, useSelector} from "react-redux";
import {setVisualization} from "@/store/features/ExploreData/edaStore";
const options = [
    {
        label: "scatter_plot",
        value: "scatter_plot",
    },
    {
        label: "histogram",
        value: "histogram",
    },
    {
        label: "line_chart",
        value: "line_chart",
    },
    {
        label: "boxplot",
        value: "boxplot"
    }
];
const SelectVisualize = () => {
    const dispatch = useDispatch();
    const visualization = useSelector(state => state.eda.visualizes)
    const handleChange = (value) => {
        dispatch(setVisualization(value))
    };
    return (
        <>
            <p className={'text-primary-color font-semibold text-lg'}>Select Visualization graphics</p>
            <Select
                size={'large'}
                mode="multiple"
                allowClear
                selectionMode="multiple"
                className="w-full"
                defaultValue={visualization}
                placeholder="Please select"
                onChange={handleChange}
                aria-label="Select"
                options={options}
            >
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </Select>
        </>
    );
};

export default SelectVisualize;