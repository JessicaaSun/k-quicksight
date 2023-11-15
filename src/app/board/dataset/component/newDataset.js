'use client'

import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function NewDataset() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} className={'bg-primary-color text-white font-semibold border-2 border-white shadow-lg'}>New Dataset</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    <div className={'flex p-5 flex-col gap-5'}>
                        <ModalHeader className="flex flex-col gap-1 text-center text-2xl">Import Dataset</ModalHeader>
                        <ModalBody className={'flex flex-row gap-5 w-full'}>
                            <Button className={'text-white w-1/2 bg-secondary-color broder-2 border-white shadow-lg'}>
                                Import
                            </Button>
                            <Button className={'text-white w-1/2 bg-primary-color broder-2 border-white shadow-lg'}>
                                Sample Dataset
                            </Button>
                        </ModalBody>
                    </div>
                </ModalContent>
            </Modal>
        </>
    );
}
