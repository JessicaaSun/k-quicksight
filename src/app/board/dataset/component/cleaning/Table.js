import React from "react";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

export default function TableMissingValue({item}) {
    return (
        (
            <Table aria-label="Example static collection table">
                <TableHeader>
                    {
                        item?.headers?.map((item) => (
                            <TableColumn className={'bg-blue-50'} key={item}>{item}</TableColumn>
                        ))
                    }
                </TableHeader>
                <TableBody emptyContent={'none value'}>
                    {
                        item?.missing_cell?.map((rowItem, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {
                                    item?.headers?.map((header, colIndex) => (
                                        <TableCell key={colIndex}>
                                            {
                                                rowItem[header] || <span className={'text-red-500 font-medium'}>null</span>
                                            }
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        )
    );
}
