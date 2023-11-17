'use client'

import React, {useEffect, useState} from "react";
import {Select, SelectItem} from "@nextui-org/react";
import {dataType} from "@/app/board/mockData/mockData";
import {useDispatch, useSelector} from "react-redux";
import {setFilesType} from "@/store/features/files/fileType";

export default function DropDown() {
    const [currentValue, setCurrentValue] = useState('')
    const [value, setValue] = useState(['']);
    const dispatch = useDispatch()

    useEffect(() => {
        setCurrentValue(value.currentKey)
        dispatch(setFilesType(currentValue?currentValue:''))
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
