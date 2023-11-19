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
} from "@nextui-org/react";
import {users} from "@/app/board/mockData/mockData";

export default function ShareMember() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        const filteredResults = users.filter((user) =>
            user.name.toLowerCase().includes(searchTerm)
        );
        setSearchResults(filteredResults);
    };

    const handleMember = (option, id) => {
        if (option === 'add') {
            const filterUserById = users.filter((user) => user.id === id);
            if (filterUserById.length > 0) {
                const updatedUsers = filterUserById.map((user) => ({
                    ...user,
                    isMember: true,
                }));
                const updatedSearchResults = searchResults.map((result) => {
                    if (result.id === id) {
                        return {
                            ...result,
                            isMember: true,
                        };
                    }
                    return result;
                });
                setSearchResults((prevSelectedUsers) => [
                    ...prevSelectedUsers,
                    ...updatedUsers,
                ]);
                setSearchResults(updatedSearchResults);
            }
        }
        // console.log(searchResults);
    };

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
                                {searchResults.length > 0 ? (
                                    <ul className={'h-48 overflow-y-scroll'}>
                                        {searchResults.map((user) => (
                                            <div key={user.id} className={'p-2 w-full rounded-xl transition-all hover:bg-primary-color/20 flex justify-start items-center gap-5'}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img className={'w-1/6'} src={user.avatar} alt={user.name} />
                                                <div className={'text-left w-full'}>
                                                    <div className={'flex justify-between w-full items-center'}>
                                                        <h4>{user.name}</h4>
                                                        <p>{user.isMember ? (
                                                            <div className={'flex gap-3'}>
                                                                <span>membered</span>
                                                                <button onClick={() => handleMember('remove', user.id)}>
                                                                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M12.1094 0C5.41992 0 0 5.41992 0 12.1094C0 18.7988 5.41992 24.2188 12.1094 24.2188C18.7988 24.2188 24.2188 18.7988 24.2188 12.1094C24.2188 5.41992 18.7988 0 12.1094 0ZM5.66406 14.0625C5.3418 14.0625 5.07812 13.7988 5.07812 13.4766V10.7422C5.07812 10.4199 5.3418 10.1562 5.66406 10.1562H18.5547C18.877 10.1562 19.1406 10.4199 19.1406 10.7422V13.4766C19.1406 13.7988 18.877 14.0625 18.5547 14.0625H5.66406Z" fill="#E20000"/>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button onClick={() => handleMember('add', user.id)}>
                                                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12.1094 0C5.41992 0 0 5.41992 0 12.1094C0 18.7988 5.41992 24.2188 12.1094 24.2188C18.7988 24.2188 24.2188 18.7988 24.2188 12.1094C24.2188 5.41992 18.7988 0 12.1094 0ZM19.1406 13.4766C19.1406 13.7988 18.877 14.0625 18.5547 14.0625H14.0625V18.5547C14.0625 18.877 13.7988 19.1406 13.4766 19.1406H10.7422C10.4199 19.1406 10.1562 18.877 10.1562 18.5547V14.0625H5.66406C5.3418 14.0625 5.07812 13.7988 5.07812 13.4766V10.7422C5.07812 10.4199 5.3418 10.1562 5.66406 10.1562H10.1562V5.66406C10.1562 5.3418 10.4199 5.07812 10.7422 5.07812H13.4766C13.7988 5.07812 14.0625 5.3418 14.0625 5.66406V10.1562H18.5547C18.877 10.1562 19.1406 10.4199 19.1406 10.7422V13.4766Z" fill="#0346A5"/>
                                                                </svg>
                                                            </button>
                                                        )}</p>
                                                    </div>
                                                    <p>{user.email}</p>
                                                </div>
                                            </div>
                                        ))}
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
