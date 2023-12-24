"use client";

import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import { useVerifyMutation } from "@/store/features/auth/authApiSlice";
import { toast } from "react-toastify";
import {useVerifyCodeMutation} from "@/store/features/user/userApiSlice";
import {setCodeInfo} from "@/store/features/user/userInfo";

export default function VerifyCode({ callback, reset, isLoading }) {
    const [code, setCode] = useState("");
    const [loading, setIsLoading] = useState(false);
    const router = useRouter();
    const [verify] = useVerifyCodeMutation();
    const dispatch = useDispatch();

    // Refs to control each digit input element
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    // Reset all inputs and clear state
    const resetCode = () => {
        inputRefs.forEach((ref) => {
            ref.current.value = "";
        });
        inputRefs[0].current.focus();
        setCode("");
    };

    const email = useSelector((state) => state.auth.email);
    const [error, setError] = useState("");
    const token = useSelector((state) => state.codeInfo);
    console.log(token)

    const dataCode = async () => {
        const data = {
            email: email,
            verification_code: code,
        };

        const verify_account = await verify({ code: data });
        if (verify_account?.error) {
            setError(verify_account.error.data.error);
        } else {
            dispatch(setCodeInfo(verify_account?.data))
            toast.success("Verified your account");
            setTimeout(() => {
                router.push("/auth/re-password");
            }, 2000);
        }
    };

    // Call our callback when code = 6 chars
    useEffect(() => {
        if (code.length === 10) {
            if (typeof callback === "function") callback(code);
            resetCode();
        }
    }, [code]); //eslint-disable-line

    // Listen for external reset toggle
    // useEffect(() => {
    //   resetCode();
    // }, [reset]); //eslint-disable-line

    // Handle input
    function handleInput(e, index) {
        const input = e.target;
        const previousInput = inputRefs[index - 1];
        const nextInput = inputRefs[index + 1];

        // Update code state with single digit
        const newCode = [...code];
        // Convert lowercase letters to uppercase
        if (/^[a-z]+$/.test(input.value)) {
            const uc = input.value.toUpperCase();
            newCode[index] = uc;
            inputRefs[index].current.value = uc;
        } else {
            newCode[index] = input.value;
        }
        setCode(newCode.join(""));

        input.select();

        if (input.value === "") {
            // If the value is deleted, select previous input, if exists
            if (previousInput) {
                previousInput.current.focus();
            }
        } else if (nextInput) {
            // Select next input on entry, if exists
            nextInput.current.select();
        }
    }

    // Select the contents on focus
    function handleFocus(e) {
        e.target.select();
    }

    // Handle backspace key
    function handleKeyDown(e, index) {
        const input = e.target;
        const previousInput = inputRefs[index - 1];
        const nextInput = inputRefs[index + 1];

        if ((e.keyCode === 8 || e.keyCode === 46) && input.value === "") {
            e.preventDefault();
            setCode(
                (prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1)
            );
            if (previousInput) {
                previousInput.current.focus();
            }
        }
    }

    // Capture pasted characters
    const handlePaste = (e) => {
        const pastedCode = e.clipboardData.getData("text");
        if (pastedCode.length === 6) {
            setCode(pastedCode);
            inputRefs.forEach((inputRef, index) => {
                inputRef.current.value = pastedCode.charAt(index);
            });
        }
    };

    // Clear button deletes all inputs and selects the first input for entry
    const ClearButton = () => {
        return (
            <button
                onClick={resetCode}
                className="text-2xl absolute right-[-30px] top-3 bg-primary-color"
            >
                <FaTimes />
            </button>
        );
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between py-56">
            <div className={"grid md:grid-cols-2 place-items-center md:gap-16"}>
                <div className={"grid grid-cols-1 place-items-center px-3 md:px-0"}>
                    <h1 className={"text-primary-color text-center lg:text-[32px] dark:text-white"}>
                        Verify your email address
                    </h1>
                    <div className={"mt-5 text-red-500 font-medium"}>{error}</div>
                    <div className={"grid grid-cols-6 gap-4 mt-14 mb-8 text-center"}>
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <Input
                                key={index}
                                isRequired
                                id="0"
                                className={"md:w-14 shadow-md rounded-2xl"}
                                style={{ textAlign: "center", fontSize: "20px" }}
                                type="text"
                                maxLength={1}
                                onChange={(e) => handleInput(e, index)}
                                ref={inputRefs[index]}
                                autoFocus={index === 0}
                                onFocus={handleFocus}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                disabled={isLoading}
                            />
                        ))}
                    </div>
                    <Button
                        radius="md"
                        className={"w-full text-[18px] bg-primary-color dark:bg-third-color text-white"}
                        onClick={dataCode}
                    >
                        Register
                    </Button>
                    <div className={"mt-4 flex justify-center items-center"}>
                        <p className="text-[18px] dark:text-white">or</p>
                    </div>
                    <Button
                        variant="bordered"
                        className={"mt-2 w-full text-[18px] dark:text-third-color text-primary-color"}
                    >
                        Sign up again
                    </Button>
                    <div className={"flex mt-4 dark:text-white"}>
                        <p>Already have an account?</p>
                        <p
                            className={
                                "font-bold cursor-pointer flex text-primary-color dark:text-third-color hover:underline ps-1"
                            }
                            onClick={() => router.push("/auth/login")}
                        >
                            Login
                        </p>
                    </div>
                </div>

                {/*image div*/}
                <div>
                    <Image
                        src={"/assets/images/authentication.png"}
                        alt={"authentication"}
                        height={600}
                        width={600}
                    />
                </div>
            </div>
            {code.length ? <ClearButton /> : <></>}
        </main>
    );
}
