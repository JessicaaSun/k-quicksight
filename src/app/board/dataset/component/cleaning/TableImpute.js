import React from 'react';
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

const TableImpute = ({item}) => {
    console.log(item.mean)
    return (
        <div className={'flex justify-between items-center gap-3'}>
            <div className={'w-full'}>
                <p className={'text-primary-color font-semibold'}>Mean:</p>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn className={'bg-blue-50'}>Headers</TableColumn>
                        <TableColumn className={'bg-blue-50'}>Values</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={'none value'}>
                        {
                            item?.mean && item?.headers_number?.map((header, headerIndex) => (
                                <TableRow key={headerIndex}>
                                    <TableCell>{header}</TableCell>
                                    <TableCell><span className={'text-text-color font-semibold'}>{item.mean[header]}</span></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
            <div className={'w-full'}>
                <p className={'text-primary-color font-semibold'}>Mode:</p>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn className={'bg-blue-50'}>Headers</TableColumn>
                        <TableColumn className={'bg-blue-50'}>Values</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={'none value'}>
                        {
                            item?.mode && item?.headers_number?.map((header, headerIndex) => (
                                <TableRow key={headerIndex}>
                                    <TableCell>{header}</TableCell>
                                    <TableCell><span className={'text-text-color font-semibold'}>{item.mode[header]}</span> </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TableImpute;