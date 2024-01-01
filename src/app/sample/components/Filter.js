'use client'
import React from "react";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import {IoFilterSharp} from "react-icons/io5";
import {dataType} from "@/app/board/mockData/mockData";
import {useDispatch, useSelector} from "react-redux";
import {setSampleFilename, setSampleFileType} from "@/store/features/sample/Dataset";

export default function Filter() {
    const dispatch = useDispatch();
    const handleSelectType = (e) => {
        dispatch(setSampleFileType(e))
    }



    return (
        <Popover placement="bottom" offset={20} showArrow>
            <PopoverTrigger>
                <Button variant={'light'}><IoFilterSharp /> Filter</Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2 grid gap-2">
                    {
                        dataType.map((item, index) => (
                            <Button key={item.id} variant={'light'} onClick={() => handleSelectType(item.value)}>{item.label}</Button>
                        ))
                    }
                </div>
            </PopoverContent>
        </Popover>
    );
}
