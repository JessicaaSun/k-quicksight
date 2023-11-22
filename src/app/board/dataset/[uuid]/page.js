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

const DetailDataset = ({params}) => {
    let uuid = params.uuid;
    const {data:user} = useGetUserQuery();
    const [headers, setHeader] = useState([]);
    const [data, setData] = useState([]);
    const {data:fileDetail, refetch: refetchDetail, isLoading} = useGetFileDetailQuery({uuid: uuid, size: 0})
    const {data:fileOverview, isLoading: overviewLoading, refetch: refetchOverview} = useGetFileOverviewQuery({uuid: uuid, userId: user?.data.id});
    const dispatch = useDispatch();

    useEffect(() => {
        const fileOverview = async () => {
            const overview = await refetchOverview();
            dispatch(setFileAccurate(overview.data))
        }
        fileOverview()
    }, [dispatch, refetchOverview]);


    useEffect(() => {
        setHeader(fileDetail?.header);
        setData(fileDetail?.data);
    }, [dispatch, fileDetail?.data, fileDetail?.header, refetchDetail, refetchOverview]);

    return (
        <div className={'p-5'} >
            <p className={'text-3xl font-medium text-primary-color'}>Detail</p>
            <div className={'flex justify-start items-center gap-5 mt-3'}>
                <p className={'text-lg font-medium text-text-color'}>{fileDetail?.file}</p>
                <ShareMember list={false} filename={fileDetail?.file} fileId={fileDetail?.id} owner={user?.data.id} />
            </div>
            <div className={'flex justify-end items-center w-full gap-5 my-5'}>
                <Overview filename={fileDetail?.file} uuid={uuid} />
                <CleanModal filename={fileDetail?.filename} />
            </div>
            <div className={'flex justify-end items-center'}>
                <HistoryDrawer />
            </div>
            <p className={'text-primary-color font-semibold text-medium my-3'}>Total records: {fileDetail?.total} </p>
            <FileDetail dataFile={data} headers={headers} isLoading={isLoading} />
        </div>
    );
};

export default DetailDataset;