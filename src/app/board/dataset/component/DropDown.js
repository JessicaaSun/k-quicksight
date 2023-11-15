import React from 'react';
import {Select} from "antd";
import {SelectItem} from "@nextui-org/react";
import {dataType} from "@/app/board/mockData/mockData";

const DropDown = () => {

    return (
        <Select
            defaultValue={'CSV'}
            label="Select types"
            className="w-[108px] h-[41px] shadow-sm"
            variant="bordered"
        >
            {dataType.map((animal) => (
                <SelectItem key={animal.id} value={animal.value}>
                    {animal.label}
                </SelectItem>
            ))}
        </Select>
    );
};

export default DropDown;