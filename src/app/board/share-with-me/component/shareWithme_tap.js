'use client'

import React from 'react';
import ShareTable from "@/lib/table/TableShare";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import {useShareOtherQuery, useShareWithMeQuery} from "@/store/features/shareMember/fileShareQuery";

const ShareWithmeTap = () => {
    const {data:user} = useGetUserQuery();
    const {data:useShareWithMe, refetch: shareMeRefetch} = useShareWithMeQuery({ownerId: user?.data.id});
    return (
        <div className={'pt-5'}>
            <h3 className={'text-primary-color pb-7 dark:text-third-color'}>Files Shared with You</h3>
            <ShareTable file={useShareWithMe} />
        </div>
    );
};

export default ShareWithmeTap;