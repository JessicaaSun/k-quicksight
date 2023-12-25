'use client'

import React from 'react';
import { Select, Space } from 'antd';
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
export default function selectVisulize () {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const visualization = useSelector(state => state.eda.visualizes)
    const handleChange = (value) => {
        dispatch(setVisualization(value))
    };
    return (
        <>
            <p className={'text-primary-color font-semibold text-lg dark:text-white'}>Select Visualization graphics</p>
            <Select
                size={'large'}
                mode="multiple"
                allowClear
                style={{
                    width: '100%',
                    marginTop: '10px',
                }}
                defaultValue={visualization}
                placeholder="Please select"
                onChange={handleChange}
                options={options}
            />
        </>
    )
}