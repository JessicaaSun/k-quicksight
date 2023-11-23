'use client'

import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, AvatarGroup, Avatar} from "@nextui-org/react";
import {headers} from "@/app/board/analysis/components/SelectDataSet";
import {getTrimIntoColumnOnlyDate} from "@/utils/getTrimDateTIme";
import {formatBytes} from "@/utils/convertByte";
import {IoEyeSharp} from "react-icons/io5";
import {useRouter} from "next/navigation";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {generateBashURL} from "@/utils/util";

export default function ShareTable({file}) {
    const router = useRouter();
    return (
        <Table removeWrapper aria-label="Example static collection table" className={'rounded-xl shadow-sm'}>
            <TableHeader>
                {
                    headers.map((item, index) => (
                        <TableColumn key={index}>{item.header}</TableColumn>
                    ))
                }
                <TableColumn>Shared</TableColumn>
            </TableHeader>
            <TableBody emptyContent={'None data'}>
                {
                    file?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.file.file}</TableCell>
                            <TableCell>{item.file.type}</TableCell>
                            <TableCell>{getTrimIntoColumnOnlyDate(item.file.created_at)}</TableCell>
                            <TableCell>{formatBytes(item.file.size)}</TableCell>
                            <TableCell>
                                <div onClick={() => router.push(`/board/dataset/${item.file.uuid}`)} className={'cursor-pointer'}> <IoEyeSharp /> </div>
                            </TableCell>
                            <TableCell>
                                <AvatarGroup isBordered max={5}>
                                    {
                                        item.members?.map((e, index) => (
                                            <Avatar size='sm' key={index} src={e.avatar ? generateBashURL(e.avatar) : 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250'} />
                                        ))
                                    }
                                </AvatarGroup>
                            </TableCell>
                        </TableRow>
                    ))
                }

            </TableBody>
        </Table>
    );
}
