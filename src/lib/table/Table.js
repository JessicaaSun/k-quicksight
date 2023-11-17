'use client'

import React, {useMemo} from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue} from "@nextui-org/react";

export default function TableData({file, isSample, sample_dataset, headers}) {

    console.log(file)
    return (
        <Table
            aria-label="Example table with client async pagination">
            <TableHeader>
                {
                    headers.map((item, index) => (
                        <TableColumn key={index}>{item.header}</TableColumn>
                    ))
                }
            </TableHeader>
            <TableBody>
                {
                    file?.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.file}</TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{item.created_at}</TableCell>
                            <TableCell>{item.size}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}
