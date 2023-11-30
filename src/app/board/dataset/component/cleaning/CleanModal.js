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
    Checkbox, Radio, RadioGroup, cn, CheckboxGroup
} from "@nextui-org/react";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import {toast, ToastContainer} from "react-toastify";
import {useRouter} from "next/navigation";
import {useCleansingProcessMutation} from "@/store/features/clean/cleaning";
import 'react-toastify/dist/ReactToastify.css';

export default function CleanModal({filename}) {
    const router = useRouter();
    const {data:user} = useGetUserQuery();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [select, setSelect] = useState('autoClean');
    const [option, setOption] = useState(["delete_missing_row", "delete_duplicate_row"])
    const [cleanProcess] = useCleansingProcessMutation();

    useEffect(() => {
        if (select === 'autoClean') {
            setOption(['delete_row_outlier', 'data_type_conversion', 'delete_missing_row', 'delete_duplicate_row'])
        } else if (select === 'byOption') {
            setOption(["delete_missing_row", "delete_duplicate_row"])
        }
    }, [select])


    const handleClean = async () => {
        const body = {
            process: option,
            created_by: user?.data.id,
            filename: filename
        }
        try {
            console.log(body)
            const response = await cleanProcess({data: body});
            if (response) {
                toast.success('success!')
                setTimeout(() => {
                    router.push('/board/dataset')
                }, 2000)
            } else if (response?.data.status === 500){
                toast.clearWaitingQueue('Data cannot clean!! Sorry sir')
            } else {
                toast.error('Error clean!')
            }
        } catch (error) {
            toast.error(`Error ${error.message}!`)
        }
    }


    return (
        <>
            <Button className={'bg-background-color border-1 border-primary-color text-md font-medium text-primary-color'} onPress={onOpen}>
                <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4.21875C11 2.92383 9.97448 1.875 8.70833 1.875C7.44219 1.875 6.41667 2.92383 6.41667 4.21875C6.41667 5.28516 7.11276 6.18457 8.0638 6.46875C8.04661 6.94043 7.94349 7.30371 7.7487 7.54981C7.30755 8.1123 6.33646 8.20605 5.30807 8.30273C4.50026 8.37891 3.6638 8.46094 2.97917 8.79785V4.5791C3.91016 4.28027 4.58333 3.39258 4.58333 2.34375C4.58333 1.04883 3.55781 0 2.29167 0C1.02552 0 0 1.04883 0 2.34375C0 3.39258 0.673177 4.28027 1.60417 4.5791V10.418C0.673177 10.7197 0 11.6074 0 12.6562C0 13.9512 1.02552 15 2.29167 15C3.55781 15 4.58333 13.9512 4.58333 12.6562C4.58333 11.6602 3.97604 10.8076 3.11667 10.4707C3.20547 10.3184 3.3401 10.1836 3.54349 10.0781C4.00755 9.83789 4.70078 9.77344 5.43698 9.70312C6.64583 9.58887 8.0151 9.45703 8.82292 8.43164C9.22396 7.92187 9.42734 7.26562 9.44167 6.44238C10.3469 6.12598 11 5.25 11 4.21875ZM2.29167 1.875C2.54375 1.875 2.75 2.08594 2.75 2.34375C2.75 2.60156 2.54375 2.8125 2.29167 2.8125C2.03958 2.8125 1.83333 2.60156 1.83333 2.34375C1.83333 2.08594 2.03958 1.875 2.29167 1.875ZM2.29167 13.125C2.03958 13.125 1.83333 12.9141 1.83333 12.6562C1.83333 12.3984 2.03958 12.1875 2.29167 12.1875C2.54375 12.1875 2.75 12.3984 2.75 12.6562C2.75 12.9141 2.54375 13.125 2.29167 13.125ZM8.70833 3.75C8.96042 3.75 9.16667 3.96094 9.16667 4.21875C9.16667 4.47656 8.96042 4.6875 8.70833 4.6875C8.45625 4.6875 8.25 4.47656 8.25 4.21875C8.25 3.96094 8.45625 3.75 8.70833 3.75Z" fill="#0346A5"/>
                </svg>
                Clean
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-primary-color text-3xl">Cleansing Options</ModalHeader>
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
                                <div className={'mt-5'}>
                                    <RadioGroup
                                        value={select}
                                        orientation="horizontal"
                                        onValueChange={setSelect}
                                    >
                                        <Radio value="autoClean" className={'bg-third-color rounded-xl mr-3 h-[47px]'} color={'primary'}><span className={'text-white font-normal px-2'}>Auto Clean</span></Radio>
                                        <Radio value="byOption" className={'bg-primary-color rounded-xl h-[47px]'} color={'warning'} ><span className={'text-white font-normal px-2'}>By Options</span></Radio>
                                    </RadioGroup>
                                </div>

                                <div className={'mt-8'}>
                                    <CheckboxGroup
                                        value={option}
                                        onValueChange={setOption}
                                    >
                                        <Checkbox isDisabled={select === 'autoClean' } value="delete_missing_row">delete_missing_row</Checkbox>
                                        <Checkbox isDisabled={select === 'autoClean' } value="delete_duplicate_row">delete_duplicate_row</Checkbox>
                                        <Checkbox isDisabled={select === 'autoClean' } value="data_type_conversion">data_type_conversion</Checkbox>
                                        <Checkbox isDisabled={select === 'autoClean' } value="delete_row_outlier">delete_row_outlier</Checkbox>
                                    </CheckboxGroup>
                                </div>

                            </ModalBody>
                            <ModalFooter className={'flex  gap-5'}>
                                <Button className={'border-1 border-primary-color bg-white text-md text-primary-color'} onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    className={'bg-primary-color text-background-color'}
                                    onClick={handleClean}
                                >
                                    Proceed
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
