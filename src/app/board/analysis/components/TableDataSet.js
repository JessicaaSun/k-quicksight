"use client";
import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Spinner, Tooltip,
} from "@nextui-org/react";
import { getTrimIntoColumnOnlyDate } from "@/utils/getTrimDateTIme";
import { formatBytes } from "@/utils/convertByte";
import { useRouter } from "next/navigation";
import {FaEye} from "react-icons/fa6";
import Dropdown_table from "@/lib/table/componentTable/dropdown";

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
        router.push(`/board/dataset/${uuid}`);
    };
    const [selectedColor, setSelectedColor] = useState("default");
    const [selectedRow, setSelectedRow] = useState(null);
    // const [page, setPage] = React.useState(1);
    // const rowsPerPage = 4;
    //
    // const pages = Math.ceil(users.length / rowsPerPage);
    //
    // const items = React.useMemo(() => {
    //     const start = (page - 1) * rowsPerPage;
    //     const end = start + rowsPerPage;
    //
    //     return users.slice(start, end);
    // }, [page, users]);
    const handleRowSelect = (key) => {
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
                                onClick={() => handleRowSelect(item.id)}
                                selected={item.id === selectedRow}
                                // key={rowData.uuid} onClick={() => handleRowClick(rowData)
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
                                <Tooltip showArrow={true} content={"View"}>
                                    <button onClick={() => handleView(item.uuid)}>
                                        <i>
                                            <FaEye />
                                        </i>
                                    </button>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
            {/*<div className="flex w-full justify-center mt-4">*/}
            {/*    <Pagination*/}
            {/*        isCompact*/}
            {/*        showControls*/}
            {/*        showShadow*/}
            {/*        color="secondary"*/}
            {/*        page={page}*/}
            {/*        total={pages}*/}
            {/*        onChange={(page) => setPage(page)}*/}
            {/*    />*/}
            {/*</div>*/}
        </>
    );
}
