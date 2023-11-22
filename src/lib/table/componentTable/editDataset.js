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
    Input
} from "@nextui-org/react";
import {MdEditDocument} from "react-icons/md";
import {useGetAllFilesQuery, useUpdateFileNameMutation} from "@/store/features/files/allFileByuserId";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditDataset({title_dataset, uuid}) {
    const {data:user} = useGetUserQuery();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [title, setTitle] = useState('')
    const [updateFileName] = useUpdateFileNameMutation();
    const {data:allFile, refetch: refecthFiles} = useGetAllFilesQuery({id: user?.data.id, filename: '', type: ''});

    const handleUpdate = async () => {
        const body = {
            file: title? title : ''
        }
        const response = await updateFileName({uuid: uuid, data: body});
        refecthFiles();
        toast.success('update Success!')
        setTimeout(() => {
            onOpenChange(false)
        }, 2000)
    }

    return (
        <>
            <div onClick={onOpen} className={'text-medium flex gap-3 justify-start items-center'}><MdEditDocument />Edit</div>
            <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Edit dataset infomation</ModalHeader>
                            <ModalBody>
                                <ToastContainer
                                    position="top-center"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="light"
                                />

                                <Input placeholder={title_dataset} labelPlacement='outside' type="text" variant='bordered' label="Dataset title" onValueChange={setTitle} value={title} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onClick={handleUpdate}>
                                    update filename
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
