import React, {useState} from 'react';
import {useGetAllFilesQuery} from "@/store/features/files/allFileByuserId";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import TableExistingData from "@/app/board/doc/components/TableExistingData";
import {Input, Select, SelectItem} from "@nextui-org/react";
import {SearchIcon} from "@/app/board/doc/searchIcons";



const ImportExistDataset = () => {
    const [filename, setFilename] = useState('');
    const {data:user} = useGetUserQuery();
    const [fileType, setFileType] = useState("");
    const {data: allExistingFile} = useGetAllFilesQuery({filename: filename, id: user?.data.id, type: fileType});

    const handleSelectionChange = (e) => {
        setFileType(e.target.value);
    };

    return (
        <div className={'flex flex-col gap-3'}>
            <div className='flex justify-between flex-wrap items-center'>
                <p className={'text-primary-color font-semibold w-1/2 dark:text-third-color'}>Select data to execute</p>
                <div className={'flex gap-5 justify-end items-center w-1/2'}>
                    <Input size={'sm'} className={'w-full'} placeholder={'Search file...'} color={'primary'} variant={'bordered'} value={filename} onValueChange={setFilename} startContent={<SearchIcon />} />
                    <Select
                        aria-label={'Select file types'}
                        size={'sm'}
                        className={'w-1/2'}
                        placeholder={'select file type'}
                        onChange={handleSelectionChange}
                        variant={'bordered'}
                    >
                        <SelectItem key={'csv'} value={'csv'}>
                            csv
                        </SelectItem>
                        <SelectItem key={'json'} value={'json'}>
                            json
                        </SelectItem>
                        <SelectItem key={'xlsx'} value={'xlsx'}>
                            xlsx
                        </SelectItem>
                        <SelectItem key={'txt'} value={'txt'}>
                            text
                        </SelectItem>
                        <SelectItem key={''} value={''}>
                            All files
                        </SelectItem>
                    </Select>
                </div>
            </div>
            <TableExistingData data={allExistingFile} />
        </div>
    );
};

export default ImportExistDataset;