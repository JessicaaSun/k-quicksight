'use client'

import React, {useEffect, useState} from "react";
import {Select, SelectItem} from "@nextui-org/react";
import {dataType} from "@/app/board/mockData/mockData";
import {useDispatch, useSelector} from "react-redux";
import {setFilesType} from "@/store/features/files/fileType";
import {useGetAllFilesQuery} from "@/store/features/files/allFileByuserId";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";

export default function DropDown() {
    const [currentValue, setCurrentValue] = useState(null)
    const [value, setValue] = useState(['All Files']);
    const dispatch = useDispatch()
    const state = useSelector(state => state.fileType)
    console.log(state)

    useEffect(() => {
        setCurrentValue(value.currentKey)
        dispatch(setFilesType(currentValue?currentValue:null))
    }, [currentValue, dispatch, value])

    return (
        <div className="flex w-full max-w-[300px] h-[56px] flex-col gap-2">
            <Select
                aria-label={'select'}
                variant="bordered"
                selectedKeys={value}
                size={'40px'}
                onSelectionChange={setValue}
            >
                {dataType.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                        {animal.label}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
}
