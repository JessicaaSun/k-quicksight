'use client'
import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure
} from "@nextui-org/react";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "@/store/features/auth/authSlice";
import { useFileImportMutation } from "@/store/features/clean/importFile";
import { useRouter } from "next/navigation";
import { useGetAllFilesQuery } from "@/store/features/files/allFileByuserId";

export default function NewDataset() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { data: user } = useGetUserQuery();
    const dispatch = useDispatch();
    const [fileInfo, setFileInfo] = useState({});
    const [importFile] = useFileImportMutation();
    const router = useRouter();
    const {data:allFiles, refetch: refetchAllFiles} = useGetAllFilesQuery({id:user?.data.id, filename: '', type: ''})

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
            <Button
                onPress={onOpen}
                className={'bg-primary-color text-white font-semibold border-2 border-white shadow-lg'}
            >
                New Dataset
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    <div className={'flex p-5 flex-col gap-5'}>
                        <ModalHeader className="flex flex-col gap-1 text-center text-2xl">Import Dataset</ModalHeader>
                        <ModalBody className={'flex flex-row gap-5 w-full'}>
                            <input id="importFile" style={{ display: "none" }} type="file" onChange={handleImportFile} />
                            <label htmlFor="importFile" className={'text-white rounded-xl flex justify-center items-center hover:bg-secondary-color/80 cursor-pointer transition-all w-1/2 bg-secondary-color border-2 border-white shadow-lg'}>
                                <div>
                                    Import
                                </div>
                            </label>
                            <Button
                                className={'text-white w-1/2 bg-primary-color border-2 border-white shadow-lg'}
                            >
                                Sample Dataset
                            </Button>
                        </ModalBody>
                    </div>
                </ModalContent>
            </Modal>
        </>
    );
}