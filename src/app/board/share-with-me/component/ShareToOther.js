'use client'

import React, {useEffect, useState} from 'react';
import {useShareOtherQuery} from "@/store/features/shareMember/fileShareQuery";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import ShareTable from "@/lib/table/TableShare";

const ShareToOther = () => {
    const {data:user} = useGetUserQuery();
    const {data:useShareOther, refetch: shareOtherRefetch} = useShareOtherQuery({userId: user?.data.id});
    useEffect(() => {
        shareOtherRefetch();
    }, [shareOtherRefetch, useShareOther, user]);

    return (
        <div className={'pt-5'}>
            <h3 className={'text-primary-color dark:text-third-color'}>Files share to other</h3>
            <div className={'pt-7'}>
                <ShareTable file={useShareOther} />
            </div>
        </div>
    );
};

export default ShareToOther;