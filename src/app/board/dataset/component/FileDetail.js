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
    Button
} from "@nextui-org/react";

export default function FileDetail({dataFile, headers, isLoading}) {
    const [page, setPage] = useState(1);
    const rowsPerPage = 100;
    const pages = Math.ceil(dataFile?.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return dataFile?.slice(start, end);
    }, [page, dataFile]);

    const [notFound, setNotFound] = useState('')

    setTimeout(() => (
        setNotFound('File not found')
    ), 30000)

    return (
        <div className={'flex justify-center items-center relative shadow-lg rounded-xl'}>
            {
                !isLoading && dataFile !== undefined ? (
                    <Table
                        isHeaderSticky
                        bottomContent={
                            <div className="flex w-full gap-5 items-center justify-end">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={pages}
                                    onChange={(page) => setPage(page)}
                                />
                            </div>
                        }
                        className={'max-h-[600px] overflow-y-scroll'} aria-label="Example static collection table">
                        <TableHeader>
                            {headers?.map((header, index) => (
                                <TableColumn key={index}>{header}</TableColumn>
                            ))}
                        </TableHeader>
                        <TableBody
                            loadingContent={<Spinner />}
                            emptyContent={"No rows to display."}>
                            {items?.map((row, index) => (
                                <TableRow key={index}>
                                    {headers?.map((header, index) => (
                                        <TableCell key={index}>{row[header]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <>
                        <Spinner label={'Loading your dataFile'} className={`${notFound ? 'hidden' : ''}`} />
                        <p className={'text-primary-color font-medium text-lg'}>{notFound}</p>
                    </>

                )
            }
        </div>
    );
}
