import React, {useEffect, useState} from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio} from "@nextui-org/react";
import {headers} from "@/app/board/dataset/page";
import {sample_dataset} from "@/app/board/mockData/mockData";
import {useDispatch, useSelector} from "react-redux";
import {setSelectFile} from "@/store/features/files/fileSelect";

const SampleDatasetTable = () => {
    const [selectedLKey, setSelectedKey] = React.useState(new Set(["2"]));
    // console.log(selectedLKey.currentKey)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSelectFile(selectedLKey.currentKey))
    }, [dispatch, selectedLKey])

    // const state = useSelector(state => state)
    // console.log(state)

    return (
        <div className="flex flex-col gap-3">
            <Table
                color={'primary'}
                selectionMode="single"
                defaultSelectedKeys={[]}
                aria-label="Example static collection table"
                selectedKeys={selectedLKey}
                onSelectionChange={setSelectedKey}
            >
                <TableHeader>
                    {
                        headers.map((item, index) => (

                            <TableColumn key={index}>{item.header}</TableColumn>
                        ))
                    }
                </TableHeader>
                <TableBody>
                    {
                        sample_dataset.map((item, index) => (
                            <TableRow key={item.uuid}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.fileType}</TableCell>
                                <TableCell>{item.size}</TableCell>
                                <TableCell>{item.createAt}</TableCell>
                                <TableCell>{item.size}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default SampleDatasetTable;