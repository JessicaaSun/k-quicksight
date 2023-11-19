import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

export default function TableMissingValue() {
    let content = (
        (
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn className={'bg-blue-50'}>USERNAME</TableColumn>
                    <TableColumn className={'bg-blue-50'}>AGE</TableColumn>
                    <TableColumn className={'bg-blue-50'}>salary</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>0</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>0</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        )
    )
    return content;
}
