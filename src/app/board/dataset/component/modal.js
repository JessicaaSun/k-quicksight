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
import {useScrapDataMutation} from "@/store/features/files/allFileByuserId";
import {useDispatch, useSelector} from "react-redux";
import {setFileScrap} from "@/store/features/files/fileSlice";
import {useRouter} from "next/navigation";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";

export default function App() {
    const {data:user} = useGetUserQuery();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [linkScrap, setLinkScrap] = useState('');
    const [scrapping] = useScrapDataMutation();
    const [error, setError] = useState('')
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, isLoading] = useState(false);
    const theme = useSelector(state => state.theme.theme)

    const handleScrapping = async () => {
        let data = {
            url: linkScrap,
        }
        isLoading(true)
        const scrap = await scrapping({userId: user?.data.id, data: data})
        dispatch(setFileScrap(scrap?.data?.filename))
        router.push('/board/dataset/file-scrap')
    }

    return (
        <>
            <Button onPress={onOpen} className={'text-primary-color bg-blue-200 font-semibold border-2 border-white capitalize shadow-lg'}>Import from web</Button>
            <Modal size={'3xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 dark:text-white">Import form Web</ModalHeader>
                            <ModalBody>
                                <Input color={theme === 'light' ? 'primary' : 'default'} placeholder={'Import URL'} classNames={{
                                    inputWrapper: [
                                        'h-[46px]'
                                    ]
                                }} value={linkScrap} onValueChange={setLinkScrap} />
                                <p className={'text-md text-red-400 font-medium'}>{error}</p>
                            </ModalBody>
                            <ModalFooter className={'flex gap-5'}>
                                <Button color={theme === 'light' ? 'danger' : 'default'} className={'font-medium'} variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button isLoading={loading} className={'bg-primary-color text-white font-medium dark:bg-third-color'} onClick={handleScrapping}>
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
