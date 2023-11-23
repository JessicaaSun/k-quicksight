'use client'

import React, {useEffect, useState} from "react";
import {
    Avatar,
    Button, Chip,
    Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import {useGetUserSearchQuery} from "@/store/features/user/usersApiSlice";
import {useShareMemberMutation} from "@/store/features/shareMember/apiSliceShare";
import {FaShareFromSquare} from "react-icons/fa6";
import {toast, ToastContainer} from "react-toastify";
import {generateBashURL} from "@/utils/util";

export default function ShareMember({filename, fileId, list}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [searchTerm, setSearchTerm] = useState('');
    const  {data:userSearched, refetch: userRefetch} = useGetUserSearchQuery({name: searchTerm});
    const [searchResult, setSearchResult] = useState([]);
    const [userSelected, setUserSelected] = useState([]);
    const [userSelectedFilter, setUserSelectedFilter] = useState([])
    const [shareMember] = useShareMemberMutation();

    const handleSelectedUser = (userId) => {
        setUserSelected((prevItems) => [...prevItems, userId]);
        const filteredResults = searchResult.filter(item => item.id === userId);
        setUserSelectedFilter((prevItems) => [...prevItems, ...filteredResults]);
    };
    const handleRemoveUserSelect = (userId) => {
        setUserSelected((prevItems) => prevItems.filter(user => user !== userId));
        setUserSelectedFilter(prevState => prevState.filter(item => item.id !== userId));
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
    };

    const handleCheck = (userId) => {
        return userSelected?.some((id) => id === userId) === true;
    }

    // const userSelcted = {
    //     "member": [23],
    //     "file": 4,
    //     "owner": 19
    // }

    const handleShare = async () => {
        const dataShare = {
            members: userSelected,
            file: fileId,
        }
        const share = await shareMember({data: dataShare});
        if (share?.data?.code === 201) {
            toast.success(`${share?.data?.message}`)
            setTimeout(() => {
                onClose(true)
            }, 1500)
        } else if (share?.error?.data.code === 400) {
            toast.error(`${share?.error?.data?.message}`)
        }
    }

    useEffect(() => {
        setSearchResult(userSearched?.data.data);
        userRefetch();
    }, [userRefetch, userSearched]);

    return (
        <>
            {
                !list ? (
                    <Button onPress={onOpen} className={'h-[30px] bg-white border-1 border-primary-color flex justify-center text-primary-color items-center'}>
                        <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.07118 6.25C6.61701 6.25 6.19957 6.40271 5.87005 6.65811L3.81118 5.40705C3.87215 5.13891 3.87215 4.86107 3.81118 4.59293L5.87005 3.34188C6.19957 3.59729 6.61701 3.75 7.07118 3.75C8.1363 3.75 8.99976 2.91053 8.99976 1.875C8.99976 0.839473 8.1363 0 7.07118 0C6.00607 0 5.14261 0.839473 5.14261 1.875C5.14261 2.0148 5.15848 2.15098 5.18834 2.28205L3.12947 3.53311C2.79994 3.27771 2.38251 3.125 1.92833 3.125C0.863213 3.125 -0.000244141 3.96447 -0.000244141 5C-0.000244141 6.03553 0.863213 6.875 1.92833 6.875C2.38251 6.875 2.79994 6.72229 3.12947 6.46689L5.18834 7.71795C5.1579 7.85161 5.14257 7.9881 5.14261 8.125C5.14261 9.16053 6.00607 10 7.07118 10C8.1363 10 8.99976 9.16053 8.99976 8.125C8.99976 7.08947 8.1363 6.25 7.07118 6.25Z" fill="#0346A5"/>
                        </svg>
                        Share
                    </Button>
                ) : (
                    <button onClick={onOpen} className={'hover:text-secondary-color text-medium flex gap-3 justify-start items-center'}><FaShareFromSquare /> Share</button>
                )
            }
            <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-0">
                                Share Dataset
                                <p className={'text-md font-normal text-description-color'}>{filename} </p>
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
                                <div className="flex gap-2 flex-wrap">
                                    {userSelectedFilter?.map((item, index) => (
                                        <Chip
                                            avatar={
                                                <Avatar
                                                    size="lg"
                                                    name="profile"
                                                    src={generateBashURL(item.avatar)}
                                                />
                                            }
                                            size='lg'
                                            variant="bordered" color={'primary'} key={index} onClose={() => handleRemoveUserSelect(item.id)}>
                                            {item.username}
                                        </Chip>
                                    ))}
                                </div>
                                <input placeholder={'search users ...'} className={'px-4 py-2 rounded-xl border-1 border-primary-color'} value={searchTerm} onChange={handleSearch} size={'40px'} type="email" />
                                {searchResult?.length > 0 ? (
                                    <ul className={'h-48 overflow-y-scroll transition-all'}>

                                        {
                                            searchResult.map((item, index) => (
                                                <li key={index} className={'flex justify-between items-center cursor-pointer overflow-x-scroll gap-5 mt-3 p-2 rounded-xl hover:bg-blue-50 transition-all'}>
                                                    <div className={'flex justify-between items-center gap-5'}>
                                                        <img src={item.avatar ? generateBashURL(item.avatar) : 'http://136.228.158.126:8002/api/v1/files/4d68fed87605409794748c2e2b10ef95.webp'} alt={'profile'} width={50} height={50} className={'rounded-full object-cover w-[50px] h-[50px]'}  />
                                                        <div>
                                                            <p>{item.username}</p>
                                                            <p>{item.email}</p>
                                                        </div>
                                                    </div>
                                                    {
                                                        handleCheck(item.id) ? (
                                                            <Button
                                                                onClick={() => handleRemoveUserSelect(item.id)}
                                                                className={'w-fit p-0'}
                                                                size='sm'
                                                                color={'primary'}
                                                                variant="light"
                                                            >
                                                                Remove
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                onClick={() => handleSelectedUser(item.id)}
                                                                className={'w-fit p-0'}
                                                                size='sm'
                                                                color={'primary'}
                                                                variant="light"
                                                            >
                                                                Add
                                                            </Button>
                                                        )
                                                    }
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
                                <Button className={'text-background-color bg-primary-color rounded-lg'} onPress={handleShare}>
                                    Share
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
