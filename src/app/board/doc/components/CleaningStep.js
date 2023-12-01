'use client'

import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useGetFileDetailQuery, useGetFileOverviewQuery} from "@/store/features/files/allFileByuserId";
import {useGetUserQuery} from "@/store/features/clean/importFile";
import TableImpute from "@/app/board/dataset/component/cleaning/TableImpute";
import TableMissingValue from "@/app/board/dataset/component/cleaning/Table";
import {Button, Checkbox, CheckboxGroup, Radio, RadioGroup, Spinner} from "@nextui-org/react";
import {useCleansingProcessMutation} from "@/store/features/clean/cleaning";
import FileDetail from "@/app/board/dataset/component/FileDetail";

const CleaningStep = () => {
    const UUIDFile = useSelector(state => state.analysisUuid.uuid);
    const {data:user} = useGetUserQuery();
    const {data:fileOverview, isLoading: overviewLoading, refetch: refetchOverview} = useGetFileOverviewQuery({uuid: UUIDFile, userId: user?.data.id});
    const {data:fileDetailNotClean} = useGetFileDetailQuery({uuid: UUIDFile, size: 0, page: 1});
    const [outlier, setOutlier] = useState([])

    useEffect(() => {
        setOutlier(fileOverview?.outlier)
    }, [fileOverview]);

    const [select, setSelect] = useState('autoClean');
    const [option, setOption] = useState(["delete_missing_row", "delete_duplicate_row"])
    const [cleanProcess] = useCleansingProcessMutation();

    useEffect(() => {
        if (select === 'autoClean') {
            setOption(['delete_row_outlier', 'data_type_conversion', 'delete_missing_row', 'delete_duplicate_row', 'impute_by_mean', 'impute_by_mode', 'remove_missing_cell'])
        } else if (select === 'byOption') {
            setOption(["delete_missing_row", "delete_duplicate_row"])
        }
    }, [select])

    const [uuidFileCleaned, setFileCleanUUID] = useState('');
    const {data:fileDetail} = useGetFileDetailQuery({uuid: uuidFileCleaned, size: 0, page: 1});


    const handleClean = async () => {
        const body = {
            process: option,
            created_by: user?.data.id,
            filename: fileDetailNotClean?.filename
        }
        const response = await cleanProcess({data: body});
        console.log(body)
        setFileCleanUUID(response?.data?.uuid)
    }

    console.log(fileDetail)

    return (
        <div>
            {
                UUIDFile ? (
                    <div className={'flex flex-col gap-3'}>
                        <p>File overview</p>
                        <ul className={'list-disc ml-10 leading-8'}>
                            <li>Number of columns = {fileOverview?.headers?.length ? fileOverview?.headers.length : 0}</li>
                            <li>Number of rows = {fileOverview?.total}</li>
                            <li>Duplicate row = {fileOverview?.duplicate_rows?.length? fileOverview.duplicate_rows?.length : 0}</li>
                            <li>
                                Outlier
                                {
                                    outlier?.map((item, index) => (
                                        <div className={'flex gap-5 flex-wrap text-primary-color font-medium'} key={index}>Column: {item.column_name} : ( {item.outlier_range[0]}, {item.outlier_range[1]} )
                                            <p className={'text-text-color font-medium'}>Founded: [
                                                {
                                                    item.outliers.map((item, index)=> (
                                                        <span key={index} className={'font-medium text-red-400'}>{item.value}, </span>
                                                    ))
                                                } ]</p>
                                        </div>
                                    ))
                                }
                            </li>
                            <li className={'flex flex-wrap'}>Label names = [
                                {
                                    fileOverview?.headers?.map((item, index) => (
                                        <span key={index} className={'font-medium text-secondary-color'}>{item} , </span>
                                    ))
                                }]</li>
                        </ul>
                        {
                            !overviewLoading ? (
                                <>
                                    <p className={'text-primary-color font-semibold'}>Imputation</p>
                                    <TableImpute item={fileOverview} />
                                    <p className={'text-primary-color font-semibold'}>Missing values</p>
                                    <TableMissingValue item={fileOverview} />
                                </>
                            ) : (<Spinner size={'md'} color={'primary'} />)
                        }
                        <div className={'flex flex-col gap-3'}>
                            <p className={'my-4 font-semibold text-primary-color text-lg'}>Perform cleaning</p>
                            <div className={'mt-5'}>
                                <RadioGroup
                                    value={select}
                                    orientation="horizontal"
                                    onValueChange={setSelect}
                                >
                                    <Radio value="autoClean" className={'bg-third-color rounded-xl mr-3 h-[47px]'} color={'primary'}><span className={'text-white font-normal px-2'}>Auto Clean</span></Radio>
                                    <Radio value="byOption" className={'bg-primary-color rounded-xl h-[47px]'} color={'warning'} ><span className={'text-white font-normal px-2'}>By Options</span></Radio>
                                </RadioGroup>
                            </div>

                            <div className={'mt-8'}>
                                <CheckboxGroup
                                    value={option}
                                    onValueChange={setOption}
                                >
                                    <Checkbox isDisabled={select === 'autoClean' } value="delete_missing_row">delete_missing_row</Checkbox>
                                    <Checkbox isDisabled={select === 'autoClean' } value="delete_duplicate_row">delete_duplicate_row</Checkbox>
                                    <Checkbox isDisabled={select === 'autoClean' } value="data_type_conversion">data_type_conversion</Checkbox>
                                    <Checkbox isDisabled={select === 'autoClean' } value="delete_row_outlier">delete_row_outlier</Checkbox>
                                    <Checkbox isDisabled={select === 'autoClean' } value="impute_by_mean">impute_by_mean</Checkbox>
                                    <Checkbox isDisabled={select === 'autoClean' } value="impute_by_mode">impute_by_mode</Checkbox>
                                    <Checkbox isDisabled={select === 'autoClean' } value="remove_missing_cell">remove_missing_cell</Checkbox>
                                </CheckboxGroup>
                            </div>
                            <Button onClick={handleClean} color={'primary'} variant={'bordered'}>Perform clean dataset</Button>
                        </div>
                    </div>
                ) : null
            }
            {
                uuidFileCleaned && (
                    <div className={'my-10'}>
                        <p className={'text-primary-color my-3 font-medium'}>Cleaned dataset</p>
                        <FileDetail uuid={uuidFileCleaned} />
                    </div>
                )
            }
        </div>
    );
};

export default CleaningStep;