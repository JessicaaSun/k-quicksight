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
    Checkbox, Radio, RadioGroup, cn, CheckboxGroup, Tooltip
} from "@nextui-org/react";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {useCleansingProcessMutation} from "@/store/features/clean/cleaning";
import {RiQuestionFill} from "react-icons/ri";

export const option_clean = [
    {
        id: 1,
        value: 'delete_missing_row',
        label: 'Delete missing row',
        content: 'Deleting missing rows in data analytics is done to preserve data integrity, ensure statistical analysis accuracy, facilitate model training, address imputation challenges, improve data quality, and manage the sensitivity of certain analyses. It helps maintain reliability by excluding incomplete data, ensuring more robust results in statistical and machine learning processes.'
    },
    {
        id: 2,
        value: 'delete_duplicate_row',
        label: 'Delete Duplicate Row',
        content: 'Deleting duplicate rows in data analytics is crucial for maintaining data accuracy, ensuring consistency, improving efficiency, and enhancing data quality. It helps prevent distortions in analysis, streamlines datasets, and is essential for effective database management.'
    },
    {
        id: 3,
        value: 'data_type_conversion',
        label: 'Data type conversion',
        content: 'Data type conversion is the process of changing the type of data from one format to another. It\'s essential for ensuring compatibility and performing operations.'
    },
    {
        id: 4,
        value: 'delete_row_outlier',
        label: 'Delete Row outlier',
        content: 'Deleting rows with outliers is a common step in data cleaning to enhance analysis accuracy by removing extreme data points that could distort results.'
    },
    {
        id: 5,
        value: 'impute_by_mean',
        label: 'Impute by mean',
        content: 'Imputing by mean is a method of filling missing values in a dataset by replacing them with the mean value of the available data. This approach helps maintain dataset integrity and facilitates statistical analyses.'
    },
    {
        id: 6,
        value: 'impute_by_mode',
        label: 'Impute by mode',
        content: 'Imputing by mode involves filling in missing values with the mode, which is the most frequently occurring value in a dataset. This method is used to address missing categorical data, ensuring a representative and complete dataset for analysis.'
    },
    {
        id: 7,
        value: 'remove_missing_cell',
        label: 'Remove missing cell',
        content: 'Removing missing cells involves eliminating entries in a dataset that have incomplete or null values. This step is taken to enhance data quality and ensure that the remaining information is complete and suitable for analysis.'
    }
]

export default function CleanModal({filename}) {
    const router = useRouter();
    const {data:user} = useGetUserQuery();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [select, setSelect] = useState('autoClean');
    const [option, setOption] = useState(["delete_missing_row", "delete_duplicate_row"])
    const [cleanProcess] = useCleansingProcessMutation();

    useEffect(() => {
        if (select === 'autoClean') {
            setOption(['delete_row_outlier', 'data_type_conversion', 'delete_missing_row', 'delete_duplicate_row', 'impute_by_mean', 'impute_by_mode', 'remove_missing_cell'])
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
                            <ModalHeader className="flex flex-col gap-1 text-primary-color text-3xl dark:text-third-color">Cleansing Options</ModalHeader>
                            <ModalBody>
                               
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
                                        {
                                            option_clean.map((item, index) => (
                                                <div key={item.id} className={'flex justify-between items-center relative'}>
                                                    <Checkbox isDisabled={select === 'autoClean' } value={item.value}>{item.label}</Checkbox>
                                                    <Tooltip showArrow placement={'left'} className={'dark:bg-white'} key={item.id} content={item.content}>
                                                        <Button className={'flex justify-start bg-transparent'}>
                                                            <RiQuestionFill />
                                                        </Button>
                                                    </Tooltip>
                                                </div>


                                            ))
                                        }
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
