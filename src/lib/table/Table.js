'use client'

import React, {useMemo, useState} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Spinner,
    getKeyValue,
    Tooltip
} from "@nextui-org/react";
import {getTrimIntoColumnOnlyDate} from "@/utils/getTrimDateTIme";
import {formatBytes} from "@/utils/convertByte";
import {useRouter} from "next/navigation";
import {useDeleteFileByIdMutation, useGetAllFilesQuery} from "@/store/features/files/allFileByuserId";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import {useDispatch} from "react-redux";
import {setFiles} from "@/store/features/files/fileSlice";

export default function TableData({file, isSample, isFileLoading, sample_dataset, headers}) {
    const router = useRouter();
    const [deleteFileById] = useDeleteFileByIdMutation();
    const {data:user} = useGetUserQuery();
    const dispatch = useDispatch();
    const {data:allFiles, refetch: refetchAllFiles} = useGetAllFilesQuery({id:user?.data.id, filename: '', type: ''})
    const [actual, setActual] = useState([])
    const handleDeleteFile = async (uuid) => {
        await deleteFileById({ uuid: uuid, id: user?.data.id });
        const updatedFiles = allFiles.filter((file) => file.uuid !== uuid);
        setActual(updatedFiles);
        console.log(updatedFiles);
        dispatch(setFiles(updatedFiles));
        refetchAllFiles(); // Optional: Refetch the updated list of files
    };
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
                            !isFileLoading ? (
                                <TableRow key={item.id}>
                                    <TableCell>{item.file}</TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>{getTrimIntoColumnOnlyDate(item.created_at)}</TableCell>
                                    <TableCell>{formatBytes(item.size)}</TableCell>
                                    <TableCell className={'flex gap-5'}>
                                        <Tooltip showArrow={true} content="Edit">
                                            <button ><i className="fa-regular fa-pen-to-square"></i></button>
                                        </Tooltip>
                                        <Tooltip showArrow={true} content={'View'}>
                                            <button onClick={() => router.push(`/board/dataset/${item.uuid}`)}><i className="fa-regular fa-eye"></i></button>
                                        </Tooltip>
                                        <Tooltip showArrow={true} content={'Delete'}>
                                            <button onClick={() => handleDeleteFile(item.uuid)} ><i className="fa-solid fa-trash"></i></button>
                                        </Tooltip>

                                    </TableCell>
                                </TableRow>
                            ) : (
                                // eslint-disable-next-line react/jsx-key
                                <TableRow >
                                    <TableCell><Spinner color="default"/></TableCell>
                                    <TableCell><Spinner color="default"/></TableCell>
                                    <TableCell><Spinner color="default"/></TableCell>
                                    <TableCell><Spinner color="default"/></TableCell>
                                    <TableCell><Spinner color="default"/></TableCell>

                                </TableRow>

                            )
                        ))
                    ) : (
                        sample_dataset?.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{getTrimIntoColumnOnlyDate(item.createAt)}</TableCell>
                                <TableCell>{item.size}</TableCell>
                                <TableCell>No actions</TableCell>
                            </TableRow>
                        ))
                    )
                }
            </TableBody>
        </Table>
    );
}
