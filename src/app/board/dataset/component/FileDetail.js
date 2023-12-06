'use client'

import React, {useMemo, useState} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Spinner,
    Pagination,
    Button, SelectItem, Select
} from "@nextui-org/react";
import {useGetFileDetailQuery} from "@/store/features/files/allFileByuserId";

export default function FileDetail({uuid}) {
    const [size, setSize] = useState(100);
    const [page,setPage] = useState(1)
    const {data:fileDetail, refetch: refetchDetail, isLoading} = useGetFileDetailQuery({uuid: uuid, size: size, page: page});

    const handleSelectionChange = (e) => {
        setSize(e.target.value);
    };

    const handlePageChange = (page) => {
        setPage(page);
    }

    return (
        <div className={'flex justify-end flex-col items-center relative shadow-lg rounded-xl w-full'}>
            {
                fileDetail !== undefined ? (
                    <>
                        <Table
                            isHeaderSticky
                            className={'max-h-[600px] overflow-y-scroll'} aria-label="Example static collection table">
                            <TableHeader>
                                {fileDetail?.headers?.map((header, index) => (
                                    <TableColumn key={index}>{header}</TableColumn>
                                ))}
                            </TableHeader>
                            <TableBody
                                loadingContent={<Spinner label={'Loading dataset'} />}
                                emptyContent={"No rows to display."}>
                                {fileDetail?.results?.map((row, index) => (
                                    <TableRow key={index}>
                                        {fileDetail?.headers.map((header, index) => (
                                            <TableCell key={index}>{row[header]}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className={'flex justify-end items-center'}>
                            <Select
                                size={'sm'}
                                variant={'bordered'}
                                defaultSelectedKeys={['100']}
                                className="w-20"
                                onChange={handleSelectionChange}
                            >
                                <SelectItem key={100} value={100}>
                                    100
                                </SelectItem>
                                <SelectItem key={200} value={200}>
                                    200
                                </SelectItem>
                                <SelectItem key={300} value={300}>
                                    300
                                </SelectItem>
                                <SelectItem key={400} value={400}>
                                    400
                                </SelectItem>
                                <SelectItem key={500} value={500}>
                                    500
                                </SelectItem>
                                <SelectItem key={fileDetail?.count} value={fileDetail?.count}>
                                    {fileDetail?.count}
                                </SelectItem>
                            </Select>
                            <Pagination isCompact showControls total={fileDetail?.pages.length} initialPage={1} onChange={handlePageChange} />
                        </div>
                    </>

                ) :  (
                    <div className={'flex justify-center items-center w-full'}>
                        <Spinner size={'lg'} label={'Loading dataset'} />
                    </div>
                )
            }
        </div>
    );
}
