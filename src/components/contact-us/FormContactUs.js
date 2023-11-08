import React from 'react';
import {Button, Input, Link, Textarea} from "@nextui-org/react";
import {EyeSlashFilledIcon} from "@/components/icons/EyeSlashFilledIcon";
import {EyeFilledIcon} from "@/components/icons/EyeFilledIcon";
import Image from "next/image";

const FormContactUs = () => {
    const styleInput = {
        inputWrapper: ["border-2", "border-primary-color", "h-[46px]"],
    };

    return (
        <div className="py-4 flex flex-col gap-6 w-full ">
            <Input
                type="email"
                label="Email"
                isRequired
                required
                variant="bordered"
                classNames={styleInput}
            />
            <Textarea
                label="Description"
                variant="bordered"
                required
                classNames={styleInput}
            />
        </div>

    );
};

export default FormContactUs;