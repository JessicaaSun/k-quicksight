'use client'

import React, {useState} from 'react';
import {useAnalysisMutation} from "@/store/features/analysis/Analysis";
import {Select} from "antd";
import { Button, Input } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '@/store/features/user/userApiSlice';
import { useFindHeaderQuery } from '@/store/features/ExploreData/ExploreData';

const Analysis = () => {
    
    const {data:user} = useGetUserQuery();

    const [chosenModel, setModel] = useState('');

    const [random_number_generation, setRandomNumberGeneration] = useState('')

    const [independent_variable, setIndependentVariable] = useState('');
    const [independent_variables, setIndependentVariables] = useState('');

    const [dependent_variable, setDependentVariable] = useState('');
    const [dependent_variables, setDependentVariables] = useState('');

    const [analysisPost] = useAnalysisMutation();

    const [contentBody, setContentBody] = useState(null);
    const [body, setBody] = useState([]);

    const filename = useSelector(state => state.eda.filename);
    const {data:headers} = useFindHeaderQuery({filename: filename});

    const handleDependentVariablesChange = (value) => {
        setDependentVariable(value)
        if (chosenModel === 'descriptive_statistic'){
            let body_json = {
                model_name: chosenModel,
                independent_variable: independent_variable,
                dependent_variable: dependent_variable,
                filename: filename,
                user: user?.data.id
            }
            setBody(body_json)
        }
    }

    const handleIndepedentChange = (value) => {
        setIndependentVariable(value)
        if (chosenModel === 'descriptive_statistic'){
            let body_json = {
                model_name: chosenModel,
                independent_variable: independent_variable,
                dependent_variable: dependent_variable,
                filename: filename,
                user: user?.data.id
            }
            setBody(body_json)
        }
    }

    const handleChange = (value) => {
        setModel(value)
    };

    const handleSubmitAnalysis = () => {
        console.log(body)   
    }

    return (
        <div className={'grid gap-3'}>
            <h3 className={'text-primary-color'}>Prep the Data for Modelling</h3>
            <div className={'grid gap-2'}>
                <p className={'text-lg text-primary-color'}>Choosing model: <span className={'font-semibold'}>{chosenModel}</span></p>
                <Select
                    size={'large'}
                    placeholder={'Selecting model'}
                    style={{
                        width: '40%',
                    }}
                    onChange={handleChange}
                    options={[
                        {
                            value: 'descriptive_statistic',
                            label: 'descriptive_statistic',
                        },
                        {
                            value: 'random_number_generation',
                            label: 'random_number_generation',
                        },
                        {
                            value: 'correlation',
                            label: 'correlation',
                        },
                        {
                            value: 'simple_linear_regression',
                            label: 'simple_linear_regression',
                        },
                        {
                            value: 'non_linear_regression',
                            label: 'non_linear_regression',
                        },
                        {
                            value: 'multiple_linear_regression',
                            label: 'multiple_linear_regression',
                        },
                    ]}
                />
                <>
                    {chosenModel && (
                        <>
                            {
                                chosenModel === 'descriptive_statistic' ? 
                                <div className='flex gap-5 w-full'>
                                    <div className='w-full'>
                                        <p className='text-description-color text-md'>Select Dependent variable</p>
                                        <Select
                                            size={'large'}
                                            placeholder={'Selecting model'}
                                            style={{
                                                width: '40%',
                                            }}
                                            onChange={handleDependentVariablesChange}
                                            options={headers?.header_label}
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <p className='text-description-color text-md'>Select Independent variable</p>
                                        <Select
                                            size={'large'}
                                            placeholder={'Selecting model'}
                                            style={{
                                                width: '40%',
                                            }}
                                            onChange={handleIndepedentChange}
                                            options={headers?.header_label}
                                        />
                                    </div>
                                </div> : null
                            }
                        </>
                    )}
                    <Button onClick={handleSubmitAnalysis} size='sm'>Perform analysis</Button>
                </>
                
            </div>
        </div>
    );
};

export default Analysis;