'use client'

import React, {useState} from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import CleanModal from "@/app/board/dataset/component/cleaning/CleanModal";

export default function DetailTable({filename, fileType}) {
    const [jupyterLink, setJupyterUrl] = useState('https://jupyter.org/try-jupyter/lab?path=notebooks%2Fsqlite.ipynb')
    return (
        <div className={'grid gap-3'}>
            <div className={'flex justify-between items-center'}>
                <div>
                    <h2 className={'text-primary-color mb-10'}>Detail dataset</h2>
                    <p>{filename}</p>
                    <p>{fileType}</p>
                </div>
                <CleanModal filename={filename} />
            </div>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody emptyContent={'No row to display'}>
                    <TableRow key="1">
                        <TableCell>Tony Reichert</TableCell>
                        <TableCell>CEO</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>Zoey Lang</TableCell>
                        <TableCell>Technical Lead</TableCell>
                        <TableCell>Paused</TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell>Jane Fisher</TableCell>
                        <TableCell>Senior Developer</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow key="4">
                        <TableCell>William Howard</TableCell>
                        <TableCell>Community Manager</TableCell>
                        <TableCell>Vacation</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
