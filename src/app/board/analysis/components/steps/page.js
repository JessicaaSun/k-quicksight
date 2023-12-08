"use client"
import React, {useState} from 'react';
import AnalysisStep from "@/app/board/components/AnalysisStep";
import FileDetail from "@/app/board/dataset/component/FileDetail";
import {useGetFileDetailQuery, useGetFileOverviewQuery} from "@/store/features/files/allFileByuserId";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";

const Page = ({params}) => {
    let uuid = params.uuid;
    const { data: user } = useGetUserQuery();
    const [headers, setHeader] = useState([]);
    const [data, setData] = useState([]);
    const {data: fileDetail, refetch: refetchDetail, isLoading,} = useGetFileDetailQuery({ uuid: uuid, size: 100, page: 1 });
    const {data: fileOverview, isLoading: overviewLoading, refetch: refetchOverview,} = useGetFileOverviewQuery({ uuid: uuid, userId: user?.data.id });


    return (
        <div>
           <AnalysisStep/>
            <FileDetail
                dataFile={fileDetail?.results}
                uuid={uuid}
                headers={fileDetail?.headers}
                isLoading={isLoading}
                size={30}
            />
        </div>
    );
};

export default Page;