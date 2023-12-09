'use client'

import { useFindHeaderQuery } from '@/store/features/ExploreData/ExploreData';
import { useAnalysisMutation } from '@/store/features/analysis/Analysis';
import { useGetFileDetailQuery } from '@/store/features/files/allFileByuserId';
import { useGetUserQuery } from '@/store/features/user/userApiSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import perform from '@assets/images/Project_66-03.jpg'
import { Button, Input, Spinner } from '@nextui-org/react';
import { Select } from 'antd';
import Descriptive_statistic from '@/app/board/doc/components/analysisComponent/Descriptive_statistic';
import Correllation from '@/app/board/doc/components/analysisComponent/Correllaltion';
import SimpleLinear from '@/app/board/doc/components/analysisComponent/SimpleLinear';
import NonLinear from '@/app/board/doc/components/analysisComponent/NonLinear';
import MultipleLinear from '@/app/board/doc/components/analysisComponent/MultipleLinear';
import { FaCheck } from 'react-icons/fa';
import { MdDataThresholding } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const variableNotMoreThan2 = [
    'descriptive_statistic',
    'correlation',
    'covariance',
    'simple_linear_regression',
    'non_linear_regression'
]
export default function Perform({ params }) {

    const { model } = params;
    const { uuid } = params;

    const { data: user } = useGetUserQuery();
    const [independent_variable, setIndependentVariable] = useState('');
    const [independent_variables, setIndependentVariables] = useState([]);
    const [dependent_variable, setDependentVariable] = useState('');
    const [analysisPost] = useAnalysisMutation();
    const [disable, setDisabled] = useState(true);
    const { data: fileDetail } = useGetFileDetailQuery({ uuid: uuid, size: 1, page: 1 });
    const { data: headers } = useFindHeaderQuery({ filename: fileDetail?.filename });

    const router = useRouter();

    const [resultAnalysis, setResultAnalysis] = useState(null);
    const [loading, isLoading] = useState(false)

    const handleSubmitAnalysis = async () => {
        let body_json;
        if (variableNotMoreThan2.some((model_mode) => model.startsWith(model_mode))) {
            body_json = {
                model_name: model,
                independent_variable: independent_variable,
                dependent_variable: dependent_variable,
                filename: fileDetail?.filename,
                user: user?.data.id
            }
        } else {
            body_json = {
                model_name: model,
                independent_variables: independent_variables,
                dependent_variable: dependent_variable,
                filename: fileDetail?.filename,
                user: user?.data.id
            }
        }
        setDisabled(false)
        const responseAnalysis = await analysisPost({ data: body_json })
        setResultAnalysis(responseAnalysis?.data);
        isLoading(true)
    }

    useEffect(() => {
        if (resultAnalysis) {
            isLoading(false)
        } else if (resultAnalysis === undefined) {
            setTimeout(() => {
                isLoading(false)
                toast.error('Something went wrong please try again!')
            }, 5000)
        }
    }, [resultAnalysis,]);

    return (
        <div className='p-3'>
            <div>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <p className='uppercase text-xl font-medium text-primary-color mb-10'>Performing analsis with {model}</p>
                {
                    variableNotMoreThan2.some((model_mode) => model.startsWith(model_mode)) ?
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
                <div className='flex gap-3 justify-start items-center'>
                    <Button  color='primary' onClick={handleSubmitAnalysis} size='md' className='w-fit font-medium my-3'><MdDataThresholding />Perform analysis</Button>
                    <Button disabled={disable} color='primary' size='md' className='w-fit' onClick={() => router.push('/board/analysis')} ><FaCheck />Done</Button>
                </div>
                {
                    loading ? (
                        <div className='flex justify-center items-center'>
                            <Spinner size={'md'} label={'Processing'} />
                        </div>
                    ) : (
                        <>
                            {
                                model === 'descriptive_statistic' ? (
                                    <Descriptive_statistic data={resultAnalysis?.descriptive_statistic} headers={headers?.header_numeric} />
                                ) : model === 'correlation' || model === 'covariance' ? (
                                    <Correllation data={resultAnalysis?.correlation || resultAnalysis?.covariance} dependentvariable={dependent_variable} indepentvariable={independent_variable} />
                                ) : model === 'simple_linear_regression' ? (
                                    <SimpleLinear data={resultAnalysis?.simple_linear_regression} />
                                ) : model === 'non_linear_regression' ? (
                                    <NonLinear data={resultAnalysis?.non_linear_regression} headers={headers?.header_numeric} />
                                ) : model === 'multiple_linear_regression' ? (
                                    <MultipleLinear data={resultAnalysis?.multiple_linear_regression} headers={headers?.header_numeric} />
                                ) : ''
                            }
                        </>
                    )
                }
            </div>

        </div>
    )
}
