import React from 'react';
import {Input, Textarea} from "@nextui-org/react";

const FormContactUs = () => {
    const styleInput = {
        inputWrapper: ["border-2", "border-primary-color", "h-[46px]"],
    };

    return (
        <div className="py-4 flex flex-col gap-6 w-full ">
            <Input
                type="email"
                label="Email"
                placeholder="you@example.com"
                labelPlacement={"outside"}
                isRequired
                required
                variant="bordered"
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