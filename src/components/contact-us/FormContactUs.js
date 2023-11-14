"use client"
import React, {useState} from 'react';
import {Button, Input, Textarea} from "@nextui-org/react";
import {useUploadDescriptionMutation} from "@/store/features/contact-us/uploadSlice";

const FormContactUs = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const styleInput = {
        inputWrapper: ["border-2", "border-primary-color", "h-[46px]"],
    };
    const [uploadDescription,{ isLoading }]=useUploadDescriptionMutation()
    const validateEmail = (value) =>
        value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const isInvalid = React.useMemo(() => {
        if (email === "") return false;

        return !validateEmail(email);
    }, [email]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the email is valid before making the API call
        if (!isInvalid) {
            try {
                const data = {
                    email: email,
                    message: message,
                };

                // Call the mutation
                await uploadDescription(data);

                // Reset form state after successful submission if needed
                setEmail("");
                setMessage("");
            } catch (error) {
                // Handle error if needed
                console.error("Error submitting form:", error);
            }
        }
    };
    return (
        <form onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                classNames={styleInput}
            />
            <Textarea
                label="Description"
                variant="bordered"
                labelPlacement="outside"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                classNames={styleInput}
            />
            <Button type={"submit"} className="bg-primary-color text-white h-[46px] font-semibold w-40">
                Send Message
            </Button>
        </div>
        </form>
    );
};

export default FormContactUs;