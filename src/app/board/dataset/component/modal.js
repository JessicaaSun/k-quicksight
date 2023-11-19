'use client'

import React, {useState} from "react";
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

export default function App() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [linkScrap, setLinkScrap] = useState('');


    return (
        <>
            <Button onPress={onOpen} className={'text-primary-color bg-blue-200 font-semibold border-2 border-white capitalize shadow-lg'}>Import from web</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Import form Web</ModalHeader>
                            <ModalBody>
                                <Input color={'primary'} placeholder={'Import URL'} classNames={{
                                    inputWrapper: [
                                        'h-[42px]'
                                    ]
                                }} value={linkScrap} onValueChange={setLinkScrap} />
                            </ModalBody>
                            <ModalFooter className={'flex gap-5'}>
                                <Button className={'bg-white border-1 border-primary-color text-primary-color font-medium'} variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button className={'bg-primary-color text-white font-medium'} onPress={onClose}>
                                    Import
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
