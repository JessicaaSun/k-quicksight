"use client";
import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Spinner, Tooltip, Button,
} from "@nextui-org/react";
import { getTrimIntoColumnOnlyDate } from "@/utils/getTrimDateTIme";
import { formatBytes } from "@/utils/convertByte";
import { useRouter } from "next/navigation";
import {FaEye} from "react-icons/fa6";
import Dropdown_table from "@/lib/table/componentTable/dropdown";
import {useDispatch} from "react-redux";
import {setUUID} from "@/store/features/files/analysisuuid";


export default function TableDataSet({
                                      file,
                                      isSample,
                                      isFileLoading,
                                      sample_dataset,
                                      headers,
                                         onFileSelect,
                                  }) {
    const router = useRouter();
    const handleRowClick = (file) => {
        onFileSelect(file);
    };
    const handleView = (uuid) => {
        router.push(`/board/analysis/${uuid}`);
    };
    const [selectedColor, setSelectedColor] = useState("default");
    const [selectedRow, setSelectedRow] = useState(null);

    const dispatch = useDispatch();
    const handleRowSelect = (key) => {
        dispatch(setUUID(key))
        setSelectedRow(key);
        setSelectedColor("success");
    };

    return (
        <>
        <Table
            isHeaderSticky
            aria-label="Example table with client async pagination"
            color={selectedColor}
            selectionMode="single"
            defaultSelectedKeys={[selectedRow]}
        >
            <TableHeader>
                {headers.map((item, index) => (
                    <TableColumn
                        className={`bg-blue-50 text-lg text-medium ${
                            item.header === "Select" ? "text-center w-[200px]" : ""
                        }`}
                        key={index}
                    >
                        {item.header}
                    </TableColumn>
                ))}
            </TableHeader>
            <TableBody>
                {!isSample
                    ? file?.map((item, index) =>
                        !isFileLoading ? (
                            <TableRow
                                key={item.uuid}
                                onClick={() => handleRowSelect(item.uuid)}
                                selected={item.id === selectedRow}
                                // onClick={() => handleView(item.)}
                            >
                                <TableCell>{item.file}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>
                                    {getTrimIntoColumnOnlyDate(item.created_at)}
                                </TableCell>
                                <TableCell>{formatBytes(item.size)}</TableCell>
                                <TableCell className={"flex gap-5 justify-center"}>
                                    <Dropdown_table
                                        uuid={item.uuid}
                                        filename={item.file}
                                        type={item.type}
                                        size={item.size}
                                        createAt={item.created_at}
                                    />
                                </TableCell>
                            </TableRow>
                        ) : (
                            // eslint-disable-next-line react/jsx-key
                            <TableRow>
                                <TableCell>
                                    <Spinner color="default" />
                                </TableCell>
                                <TableCell>
                                    <Spinner color="default" />
                                </TableCell>
                                <TableCell>
                                    <Spinner color="default" />
                                </TableCell>
                                <TableCell>
                                    <Spinner color="default" />
                                </TableCell>
                                <TableCell>
                                    <Spinner color="default" />
                                </TableCell>
                            </TableRow>
                        )
                    )
                    : sample_dataset?.map((item, index) => (
                        <TableRow
                            key={item.id}
                            onClick={() => handleRowSelect(item.id)}
                            selected={item.id === selectedRow}
                        >
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>
                                {getTrimIntoColumnOnlyDate(item.createAt)}
                            </TableCell>
                            <TableCell>{item.size}</TableCell>
                            <TableCell className={"flex gap-5 justify-center"}>
                                <Button >
                                    <i>
                                        <FaEye />
                                    </i>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
        </>
    );
}
