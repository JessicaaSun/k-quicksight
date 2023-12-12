'use client'

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import Analysis from "../AnalysisWithData";
import { useState } from "react";
import { generateBashURL } from "@/utils/util";
import { useUploadSingleMutation } from "@/store/features/user/uploadAccountImage";
import { useUpdateAnalysisFileMutation } from "@/store/features/analysis/analysisApiSlice";
import { FaPencilAlt } from "react-icons/fa";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateInfo({ filename, uuid, thumbnailUrl }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [previewImage, setPreviewImage] = useState('');

    const [Analysis_name, setAnalysis_name] = useState(filename);

    const [uploadThumnail] = useUploadSingleMutation();

    const [updateInfoAnalysis] = useUpdateAnalysisFileMutation();

    const handleUploadImage = async (event) => {
        const file = event.target.files[0];
        const response = await uploadThumnail({ data: file })
        setPreviewImage(response?.data?.filename)
    }

    const handleUpdate = async () => {
        let body = {
            "title": Analysis_name,
            "thumbnail": previewImage,
        }
        console.log(body)
        const response = await updateInfoAnalysis({ data: body, uuid: uuid })
        toast.success("Updated");
        setTimeout(() => {
            onOpenChange(false)
        }, 2000)
    }

    return (
        <>
            <Button onPress={onOpen} color="primary" variant="ghost"><FaPencilAlt /> Update info</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Update infomation of analaysis
                                <p className="text-sm text-description-color">Updating {Analysis_name || filename}</p>
                            </ModalHeader>
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
                                <img src={generateBashURL(previewImage || thumbnailUrl)} className="rounded-xl" alt="preview" />
                                <input onChange={handleUploadImage} type="file" />
                                <label>Analysis name</label>
                                <Input size="sm" placeholder="Analysis name" value={Analysis_name} onValueChange={setAnalysis_name} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button onClick={handleUpdate} color="primary" variant="ghost">
                                    Update
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
