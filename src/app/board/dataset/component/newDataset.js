'use client'
import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure, Spinner
} from "@nextui-org/react";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "@/store/features/auth/authSlice";
import { useFileImportMutation } from "@/store/features/clean/importFile";
import { useRouter } from "next/navigation";
import { useGetAllFilesQuery } from "@/store/features/files/allFileByuserId";
import SampleDataset from "@/app/board/dataset/component/SampleDataset";
import {toast, ToastContainer} from "react-toastify";
import FullStorage from "@/app/board/dataset/component/AlertFullStorage";

export default function NewDataset({isFull}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { data: user } = useGetUserQuery();
    const dispatch = useDispatch();
    const [fileInfo, setFileInfo] = useState({});
    const [importFile] = useFileImportMutation();
    const router = useRouter();
    const {data:allFiles, refetch: refetchAllFiles, isLoading: importLoading} = useGetAllFilesQuery({id:user?.data.id, filename: '', type: ''})

    useEffect(() => {
        dispatch(setCurrentUser(user));
    }, [user, dispatch]);

    const handleImportFile = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        const response = await importFile({ file: formData, userId: user?.data.id });
        onOpenChange(false)
        refetchAllFiles();
    };

    return (
        <>
            {
                !isFull ? (
                    <Button
                        onPress={onOpen}
                        className={'bg-primary-color text-sm text-white font-semibold border-2 border-white shadow-lg'}
                    >
                        New Dataset
                    </Button>
                ) : (
                    <FullStorage />
                )
            }
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                {!isFull ? (
                    <ModalContent>
                        {
                            !importLoading ? (
                                <div className={'flex p-5 flex-col gap-5'}>
                                    <ModalHeader className="flex flex-col gap-1 text-center text-2xl">Import Dataset</ModalHeader>
                                    <ModalBody className={'flex flex-row gap-5 w-full'}>
                                        <input id="importFile" style={{ display: "none" }} type="file" accept=".csv, application/json, .xlsx, .txt" onChange={handleImportFile} />
                                        <label htmlFor="importFile" className={'text-white rounded-xl flex justify-center items-center hover:bg-secondary-color/80 cursor-pointer transition-all w-1/2 bg-secondary-color border-2 border-white shadow-lg'}>
                                            <div>
                                                Import
                                            </div>
                                        </label>
                                        <SampleDataset />
                                    </ModalBody>
                                </div>
                            ) : (
                                <Spinner color={'primary'} loading={'eager'} />
                            )
                        }
                    </ModalContent>
                ) : (
                    <ModalContent>
                        <div className={'flex p-5 flex-col gap-5 justify-center'}>
                            <ModalHeader className="flex flex-col gap-1 text-center text-2xl">Import Dataset</ModalHeader>
                            <ModalBody className={'flex flex-row gap-5 w-full justify-center'}>
                                <p className={'text-center text-red-500 font-medium text-lg'}>Your storage fulled! Please Delete some un-use files... <br></br> <span className={'text-lg text-green-600'}>Thank you! </span> </p>
                            </ModalBody>
                        </div>
                    </ModalContent>
                )}
            </Modal>
        </>
    );
}