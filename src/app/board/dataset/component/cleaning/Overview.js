'use client'

import React, {useEffect, useState} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Spinner
} from "@nextui-org/react";
import TableMissingValue from "@/app/board/dataset/component/cleaning/Table";
import {useGetFileOverviewQuery} from "@/store/features/files/allFileByuserId";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import {useDispatch, useSelector} from "react-redux";
import {setFileAccurate} from "@/store/features/files/filesDetail";

export default function Overview() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const fileoverview = useSelector(state => state.allRecord.fileAccurate)
    const [outlier, setOutlier] = useState([])

    useEffect(() => {
        setOutlier(fileoverview?.outlier)
    }, [fileoverview?.outlier, fileoverview]);

    return (
        <>
            <Button className={'bg-primary-color border-1 border-background-color shadow-md text-md font-normal text-background-color'} onPress={onOpen}>
                Overview
            </Button>
            <Modal
                size={'5xl'}
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
            >
                <ModalContent className={'overflow-y-scroll max-h-[600px]'}>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-primary-color text-2xl">
                                <h2>Data Overview</h2>
                                <p className={'text-lg font-medium'}>{fileoverview?.file}</p>
                            </ModalHeader>
                            <ModalBody>
                                <ul className={'list-disc ml-10 leading-8'}>
                                    <li>Duplicate row = {fileoverview?.duplicate_rows?.length? fileoverview.duplicate_rows?.length : 0}</li>
                                    <li>
                                        Outlier
                                        {
                                            outlier?.map((item, index) => (
                                                <div className={'flex gap-5 flex-wrap'} key={index}>Column: {item.column_name} : ( {item.outlier_range[0]}, {item.outlier_range[1]} )
                                                    <p>Founded: [
                                                        {
                                                            item.outliers.map((item, index)=> (
                                                                <span key={index}>{item.value}, </span>
                                                            ))
                                                        } ]</p>
                                                </div>
                                            ))
                                        }
                                    </li>
                                    <li>Number of columns = {fileoverview?.headers?.length ? fileoverview?.headers.length : 0}</li>
                                    <li>Number of rows = {fileoverview?.total}</li>
                                    <li className={'flex flex-wrap'}>Label names = [
                                        {
                                            fileoverview?.headers?.map((item, index) => (
                                                <span key={index} className={'font-medium text-description-color'}>{item} , </span>
                                            ))
                                        }]</li>
                                </ul>
                                <p className={'text-text-color font-medium'}>Missing values</p>
                                <TableMissingValue />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
