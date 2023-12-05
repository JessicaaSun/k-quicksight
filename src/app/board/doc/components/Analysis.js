'use client'

import React, {useState} from 'react';
import {useAnalysisMutation} from "@/store/features/analysis/Analysis";
import {Select} from "antd";
import { Button, Input } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '@/store/features/user/userApiSlice';
import { useFindHeaderQuery } from '@/store/features/ExploreData/ExploreData';
import JsonTable from './analysisComponent/JsonTable';


export const variableNotMoreThan2 = [
    'descriptive_statistic',
    'correlation',
    'covariance',
    'simple_linear_regression',
    'non_linear_regression'
]


const Analysis = () => {
    
    const {data:user} = useGetUserQuery();
    const [chosenModel, setModel] = useState('');
    const [random_number_generation, setRandomNumberGeneration] = useState('')
    const [independent_variable, setIndependentVariable] = useState('');
    const [independent_variables, setIndependentVariables] = useState([]);
    const [dependent_variable, setDependentVariable] = useState('');
    const [analysisPost] = useAnalysisMutation();
    const [body, setBody] = useState([]);

    const filename = useSelector(state => state.eda.filename);
    const {data:headers} = useFindHeaderQuery({filename: filename});
    const [resultAnalysis, setResultAnalysis] = useState(null)

    const handleChange = (value) => {
        setModel(value)
    };

    const handleSubmitAnalysis = async () => {
        let body_json; 
        if (variableNotMoreThan2.some((model_mode) => chosenModel.startsWith(model_mode))){
            body_json = {
                model_name: chosenModel,
                independent_variable: independent_variable,
                dependent_variable: dependent_variable,
                filename: filename,
                user: user?.data.id
            }
        } else {
            body_json = {
                model_name: chosenModel,
                independent_variables: independent_variables,
                dependent_variable: dependent_variable,
                filename: filename,
                user: user?.data.id
            }
        }
        setBody(body_json)
        const responseAnalysis = await analysisPost({data: body_json})

        setResultAnalysis(responseAnalysis?.data)
    }

    console.log('result ', resultAnalysis)

    

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
                                variableNotMoreThan2.some((model_mode) => chosenModel.startsWith(model_mode)) ? 
                                <div className='grid gap-3'>
                                    <div>
                                        <p className='text-description-color text-md'>Select Dependent variable</p>
                                        <Select
                                            size={'large'}
                                            placeholder={'Selecting model'}
                                            style={{
                                                width: '40%',
                                            }}
                                            value={dependent_variable}
                                            onChange={setDependentVariable}
                                            options={headers?.header_label}
                                        />
                                    </div>
                                    <div>
                                        <p className='text-description-color text-md'>Select Independent variable</p>
                                        <Select
                                            size={'large'}
                                            placeholder={'Selecting model'}
                                            style={{
                                                width: '40%',
                                            }}
                                            value={independent_variable}
                                            onChange={setIndependentVariable}
                                            options={headers?.header_label}
                                        />
                                    </div>
                                </div> : (
                                    <div>
                                        <p className='text-description-color text-md'>Select Dependent variable</p>
                                        <div className='flex gap-5'>
                                            <Select
                                                size={'large'}
                                                placeholder={'Selecting model'}
                                                style={{
                                                    width: '40%',
                                                }}
                                                value={dependent_variable}
                                                onChange={setDependentVariable}
                                                options={headers?.header_label}
                                            />
                                            <Select
                                                size={'large'}
                                                mode="multiple"
                                                placeholder="Independent variable"
                                                value={independent_variables}
                                                onChange={setIndependentVariables}
                                                style={{
                                                    width: '40%',
                                                }}
                                                options={
                                                    headers?.header_label
                                                }
                                                />
                                        </div>
                                    </div>
                                )
                            }
                        </>
                    )}
                    <Button color='primary' onClick={handleSubmitAnalysis} size='sm' className='w-fit font-medium'>Perform analysis</Button>
                </>
            </div>
            <JsonTable jsonData={resultAnalysis?.descriptive_statistic.descriptive_statistic} chosenModel={chosenModel} headers={headers?.header_label} />
        </div>
    );
};

export default Analysis;