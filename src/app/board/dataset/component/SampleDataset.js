'use client'

import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import SearchDataset from "@/app/board/dataset/component/SearchDataset";
import SampleDatasetTable from "@/lib/table/SampleDatasetTable";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";

export default function SampleDataset() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const uuid = useSelector(state => state.dataSetSelected.fileSelect);
    console.log(uuid)
    const router = useRouter();

    const handleProceed = () => {
        router.push(`/board/dataset/${uuid}`)
    }

    return (
        <>
            <Button onPress={onOpen} className={'text-white w-1/2 bg-primary-color border-2 border-white shadow-lg'}>Sample dataset</Button>
            <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-2xl text-text-color">Pick our sample dataset.</ModalHeader>
                            <ModalBody>
                                <div className={'flex justify-between items-center w-full'}>
                                    <p className={'text-2xl text-primary-color font-medium'}>All Dataset</p>
                                    {/*<SearchDataset />*/}
                                </div>
                                <SampleDatasetTable />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button onClick={handleProceed} color="primary">
                                    proceed
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
