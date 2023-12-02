'use client'
import React, {useEffect, useState} from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Tooltip} from "@nextui-org/react";
import {getTrimIntoColumnOnlyDate} from "@/utils/getTrimDateTIme";
import {headers} from "@/app/board/dataset/page";
import {formatBytes} from "@/utils/convertByte";
import Dropdown_table from "@/lib/table/componentTable/dropdown";
import {useDispatch} from "react-redux";
import {setUUID} from "@/store/features/files/analysisuuid";

export default function TableExistingData({data}) {
    const [key, setKey] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setUUID(key.currentKey))
    }, [dispatch, key]);

    return (
        <div>
            <Table
                color="primary"
                selectionMode="single"
                aria-label="Example static collection table"
                selectedKeys={key}
                onSelectionChange={setKey}
            >
                <TableHeader>
                    {headers.map((item, index) => (
                        <TableColumn
                            className={`text-md font-medium ${
                                item.header === "Actions" ? "text-center w-[200px]" : ""
                            }`}
                            key={index}
                        >
                            {item.header}
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody emptyContent={'No data'}>
                    {
                        data?.map((item, index) => (
                            <TableRow key={item.uuid}>
                                <TableCell>{item.title || item.file}</TableCell>
                                <TableCell>
                                    {!item.is_original ? <span>Cleaned</span> : <span>Original</span>}
                                </TableCell>
                                <TableCell>{item.type || item.fileType}</TableCell>
                                <TableCell>{getTrimIntoColumnOnlyDate(item.created_at || item.createAt)}</TableCell>
                                <TableCell>{formatBytes(item.size)}</TableCell>
                                <TableCell className="flex gap-5 justify-center">
                                    <Dropdown_table
                                        uuid={item.uuid}
                                        filename={item.file || item.filename}
                                        type={item.type}
                                        size={item.size}
                                        createAt={item.created_at || item.createAt}
                                        fileId={item.id}
                                        file={item.filename}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>

    );
}
