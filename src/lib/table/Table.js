'use client'

import React, {useMemo} from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue} from "@nextui-org/react";
import {getTrimIntoColumnOnlyDate} from "@/utils/getTrimDateTIme";
import {formatBytes} from "@/utils/convertByte";

export default function TableData({file, isSample, sample_dataset, headers}) {
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
                    !isSample ? (
                        file?.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.file}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{getTrimIntoColumnOnlyDate(item.created_at)}</TableCell>
                                <TableCell>{formatBytes(item.size)}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        sample_dataset?.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{getTrimIntoColumnOnlyDate(item.createAt)}</TableCell>
                                <TableCell>{item.size}</TableCell>
                            </TableRow>
                        ))
                    )
                }
            </TableBody>
        </Table>
    );
}
