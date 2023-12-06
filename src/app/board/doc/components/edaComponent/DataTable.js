'use client'
import React from 'react';
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

const DataTable = ({header, body}) => {
    return (
        <div>
            <div>
                <p className={'text-primary-color text-lg font-medium'}>Descriptive Statistics Table</p>
                <Table>
                    <TableHeader>
                        <TableColumn>Statistic</TableColumn>
                        {header.map((header, index) => (
                            <TableColumn key={index}><b>{header}</b></TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody emptyContent={'none data'}>
                    {Object.keys(body).map((statistic, statIndex) => (
                        <TableRow key={statIndex}>
                            <TableCell>{statistic}</TableCell>
                            {header.map((header, colIndex) => (
                                <TableCell key={colIndex}>{body[statistic][header]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default DataTable;