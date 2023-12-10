'use client'

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { FaCirclePlus } from "react-icons/fa6";
import ExistingDataset from "./ExistingDataset";

import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import PerformAnalysisButton from "./PerformAnalysis";
import { useFileImportMutation } from "@/store/features/clean/importFile";

export default function AddNewButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { data: user } = useGetUserQuery();
    const [file, setFilename] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    const [choice, setChoice] = useState('new');

    const handleChoice = (value) => {
        setChoice(value);
    };

    const [importFile] = useFileImportMutation();

    const handleImportFile = async (event) => {

        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        const response = await importFile({ file: formData, userId: user?.data.id });
        console.log(response);

        if (response?.error?.status === 400) {
            setErrorMessage(response?.error.data);
        }

        let body = {
            filename: response?.data?.filename,
            uuid: response?.data?.uuid
        }
        setFilename(body)
    };

    console.log(file)


    return (
        <>
            <Button onPress={onOpen} className="bg-primary-color text-white" variant="solid">
                <FaCirclePlus />Add new
            </Button>
            <Modal size="2xl" className="max-h-[400px] min-h-[400px] overflow-auto" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Importing dataset
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button onClick={() => handleChoice('exist')} className={`${choice === 'exist' ? 'bg-primary-color text-white' : ''}`}>Existing Dataset</Button>
                                    <Button onClick={() => handleChoice('new')} className={`${choice === 'new' ? 'bg-primary-color text-white' : ''}`}>New Dataset</Button>
                                </div>
                                {
                                    choice === 'exist' ? (
                                        <ExistingDataset />
                                    ) : (
                                        <div className="grid gap-3">
                                            <p>{file?.filename || errorMessage}</p>
                                            <input
                                                type="file"
                                                name="dataset"
                                                accept=".txt, .json, .xlsx, .csv" // Specify allowed file types
                                                onChange={handleImportFile}
                                            />
                                            {
                                                file ? (
                                                    <PerformAnalysisButton uuid={file?.uuid} />
                                                ) : null
                                            }
                                        </div>
                                    )
                                }
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
