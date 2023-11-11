"use client"
import React from 'react';
import {Input, Textarea} from "@nextui-org/react";

const FormContactUs = () => {
    const styleInput = {
        inputWrapper: ["border-2", "border-primary-color", "h-[46px]"],
    };
    const [value, setValue] = React.useState("junior2happy.org");

    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalid = React.useMemo(() => {
        if (value === "") return false;

        return !validateEmail(value);
    }, [value]);
    return (
        <div className="py-4 flex flex-col gap-6 w-full ">
            <Input
                type="email"
                label="Email"
                placeholder="you@example.com"
                labelPlacement="outside"
                isRequired
                required
                variant="bordered"
                isInvalid={isInvalid}
                errorMessage={isInvalid && "Please enter a valid email"}
                onValueChange={setValue}
                classNames={styleInput}
            />
            <Textarea
                label="Description"
                variant="bordered"
                labelPlacement="outside"
                required
                classNames={styleInput}
            />
        </div>

    );
};

export default FormContactUs;