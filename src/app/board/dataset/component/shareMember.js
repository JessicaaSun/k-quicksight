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
} from "@nextui-org/react";
import {users} from "@/app/board/mockData/mockData";
import {useGetUserSearchQuery} from "@/store/features/user/usersApiSlice";
import Image from "next/image";

export default function ShareMember() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [searchTerm, setSearchTerm] = useState('');
    const  {data:userSearched, refetch: userRefetch} = useGetUserSearchQuery({name: searchTerm});
    const [searchResult, setSearchResult] = useState([])

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm)
    };

    useEffect(() => {
        setSearchResult(userSearched?.data.data)
        userRefetch();
    }, [userRefetch, userSearched]);

    return (
        <>
            <Button onPress={onOpen} className={'h-[30px] bg-white border-1 border-primary-color flex justify-center text-primary-color items-center'}>
                <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.07118 6.25C6.61701 6.25 6.19957 6.40271 5.87005 6.65811L3.81118 5.40705C3.87215 5.13891 3.87215 4.86107 3.81118 4.59293L5.87005 3.34188C6.19957 3.59729 6.61701 3.75 7.07118 3.75C8.1363 3.75 8.99976 2.91053 8.99976 1.875C8.99976 0.839473 8.1363 0 7.07118 0C6.00607 0 5.14261 0.839473 5.14261 1.875C5.14261 2.0148 5.15848 2.15098 5.18834 2.28205L3.12947 3.53311C2.79994 3.27771 2.38251 3.125 1.92833 3.125C0.863213 3.125 -0.000244141 3.96447 -0.000244141 5C-0.000244141 6.03553 0.863213 6.875 1.92833 6.875C2.38251 6.875 2.79994 6.72229 3.12947 6.46689L5.18834 7.71795C5.1579 7.85161 5.14257 7.9881 5.14261 8.125C5.14261 9.16053 6.00607 10 7.07118 10C8.1363 10 8.99976 9.16053 8.99976 8.125C8.99976 7.08947 8.1363 6.25 7.07118 6.25Z" fill="#0346A5"/>
                </svg>
                Members
            </Button>
            <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-0">
                                Share Dataset
                                <p className={'text-md text-description-color font-normal'}>Survey</p>
                            </ModalHeader>
                            <ModalBody>
                                <input placeholder={'search members ...'} className={'px-4 py-2 rounded-xl border-1 border-primary-color'} value={searchTerm} onChange={handleSearch} size={'40px'} type="email" />
                                {searchResult?.length > 0 ? (
                                    <ul className={'h-48 overflow-y-scroll transition-all'}>
                                        {
                                            searchResult.map((item, index) => (
                                                <li key={index} className={'flex justify-start cursor-pointer items-center gap-5 mt-3 rounded-xl hover:bg-blue-50 transition-all p-3'}>
                                                    <img src={item.avatar ? item.avatar : 'http://136.228.158.126:8002/api/v1/files/4d68fed87605409794748c2e2b10ef95.webp'} alt={'profile'} width={50} height={50} className={'rounded-full object-cover w-[50px] h-[50px]'}  />
                                                    <div>
                                                        <p>{item.username}</p>
                                                        <p>{item.email}</p>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                ) : (
                                    <p>No results found.</p>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
