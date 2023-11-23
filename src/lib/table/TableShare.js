'use client'

import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    AvatarGroup,
    Avatar,
    Tooltip
} from "@nextui-org/react";
import {headers} from "@/app/board/analysis/components/SelectDataSet";
import {getTrimIntoColumnOnlyDate} from "@/utils/getTrimDateTIme";
import {formatBytes} from "@/utils/convertByte";
import {IoEyeSharp} from "react-icons/io5";
import {useRouter} from "next/navigation";
import {generateBashURL} from "@/utils/util";

export default function ShareTable({file}) {
    const router = useRouter();
    return (
        <Table removeWrapper aria-label="Example static collection table" className={'rounded-xl shadow-sm border-1 border-gray-200'}>
            <TableHeader>
                {
                    headers.map((item, index) => (
                        <TableColumn key={index}>{item.header}</TableColumn>
                    ))
                }
                <TableColumn>Shared to</TableColumn>
                <TableColumn>Owner</TableColumn>
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
                                <Tooltip
                                    showArrow
                                    placement="top"
                                    content="View"
                                >
                                    <div onClick={() => router.push(`/board/dataset/${item.file.uuid}`)} className={'cursor-pointer'}> <IoEyeSharp /> </div>
                                </Tooltip>

                            </TableCell>
                            <TableCell>
                                <AvatarGroup isBordered max={5} color={'warning'}>
                                    {
                                        item.members
                                            ? item.members?.map((e, index) => (
                                                <Tooltip showArrow content={e.username} key={index}>
                                                    <Avatar
                                                        size="sm"
                                                        src={e.avatar ? generateBashURL(e.avatar) : 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250'}
                                                    />
                                                </Tooltip>
                                            ))
                                            : (
                                                <Tooltip showArrow content={item.member.username}>
                                                    <Avatar
                                                        size="sm"
                                                        key={index}
                                                        src={item.member.avatar ? generateBashURL(item.member.avatar) : 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250'}
                                                    />
                                                </Tooltip>
                                            )
                                    }
                                </AvatarGroup>
                            </TableCell>
                            <TableCell>
                                <Tooltip showArrow content={item.file.created_by.username}>
                                    <Avatar isBordered color={'primary'} size='sm' key={index} src={item.file.created_by.avatar ? generateBashURL(item.file.created_by.avatar) : 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250'} />
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}
