'use client'

import React, {useEffect, useState} from 'react';
import ShareMember from "@/app/board/dataset/component/shareMember";
import Overview from "@/app/board/dataset/component/cleaning/Overview";
import CleanModal from "@/app/board/dataset/component/cleaning/CleanModal";
import HistoryDrawer from "@/app/board/dataset/component/HistoryDrawer";
import {useGetFileDetailQuery, useGetFileOverviewQuery} from "@/store/features/files/allFileByuserId";
import FileDetail from "@/app/board/dataset/component/FileDetail";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import {useDispatch} from "react-redux";
import {setFileAccurate} from "@/store/features/files/filesDetail";
import {Pagination, Select, SelectItem, Spinner} from "@nextui-org/react";


const DetailDataset = ({params}) => {
    let uuid = params.uuid;
    const {data:user} = useGetUserQuery();
    const {data:fileDetail, refetch: refetchDetail, isLoading} = useGetFileDetailQuery({uuid: uuid, size: 0, page: 1})
    const {data:fileOverview, isLoading: overviewLoading, refetch: refetchOverview} = useGetFileOverviewQuery({uuid: uuid, userId: user?.data.id});
    const dispatch = useDispatch();

    useEffect(() => {
        const fileOverview = async () => {
            const overview = await refetchOverview();
            dispatch(setFileAccurate(overview.data))
        }
        fileOverview()
    }, [dispatch, refetchOverview]);

    return (
        <div className={'p-5'} >
            <p className={'text-3xl font-medium text-primary-color dark:text-third-color'}>Detail</p>
            <div className={'flex justify-start items-center gap-5 mt-3'}>
                <p className={'text-lg font-medium text-text-color dark:text-third-color'}>{fileDetail?.file}</p>
                <ShareMember list={false} filename={fileDetail?.file} fileId={fileDetail?.id} owner={user?.data.id} />
            </div>
            <div className={'flex justify-end items-center w-full gap-5 my-5'}>
                <Overview filename={fileDetail?.file} uuid={uuid}  />
                <CleanModal filename={fileDetail?.filename} />
            </div>

            <div className={'flex flex-col gap-3'}>
                <p className={'text-primary-color font-semibold text-medium dark:text-third-color'}>Total records: {fileDetail?.total} </p>
                <FileDetail uuid={uuid} showHeader={true}/>
            </div>
        </div>
    );
};

export default DetailDataset;