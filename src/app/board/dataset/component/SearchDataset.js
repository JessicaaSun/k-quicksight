'use client'

import React, {useEffect, useState} from 'react';
import {Input} from "@nextui-org/react";
import {SearchIcon} from "@/app/board/recent/searchIcons";
import {useDispatch, useSelector} from "react-redux";
import {setFileName} from "@/store/features/files/fileType";
import {useGetAllFilesQuery} from "@/store/features/files/allFileByuserId";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import {setFiles} from "@/store/features/files/fileSlice";

const SearchDataset = () => {

    const [searchValue, setValueSearch] = useState('');
    const dispatch = useDispatch();
    const files = useSelector(state => state.fileType);
    const {data: user} = useGetUserQuery();
    const {data: setAllFiles, isLoading: isFileLoading} = useGetAllFilesQuery({id: user?.data.id, filename: files?.filename, type: files.fileType});

    // console.log(setAllFiles)



    useEffect(() => {
        dispatch(setFileName(searchValue))
        dispatch(setFiles(setAllFiles))
    }, [searchValue, dispatch, setAllFiles]);

    // const state = useSelector(state => state)
    // console.log(setAllFiles)


    return (
        <Input color={'primary'} startContent={<SearchIcon />} classNames={{
            inputWrapper: [
                'h-[41px] w-[325px] bg-white shadow-sm border-1 border-gray-400'
            ]
        }}  onValueChange={setValueSearch} value={searchValue} placeholder={'Search'} className={'w-fit'} />
    );
};

export default SearchDataset;