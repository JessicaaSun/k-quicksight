'use client'

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import forget_password from '@assets/images/forgetpassword.png'
import {Button, Input} from "@nextui-org/react";
import {useSelector} from "react-redux";
import {MdOutlineResetTv, MdRemoveRedEye} from "react-icons/md";
import {useChangePasswordMutation} from "@/store/features/user/userApiSlice";
import {toast} from "react-toastify";

const RePassword = () => {
    const [password, setPassword] = useState();
    const [con_password, setCon_password] = useState();
    const email = useSelector((state) => state.auth.email);
    const token = useSelector((state) => state.codeInfo.codeInfo);
    const [error, setError] = useState({
        password: '',
        con_password: ''
    })

    const [changePassword] = useChangePasswordMutation();

    const handleChangePassword = async () => {
        let body = {
            email: email,
            password: password,
            confirmed_password: con_password,
            uid_base64: token?.uid_base64,
            token: token?.token
        }

        if (con_password && password) {
            const change = await changePassword({body: body})
            if (change?.error) {
                setError(prevState => ({
                    ...prevState,
                    password: 'Password not found!'
                }));
            } else {
                toast.success('Password has been change')
            }
        }
        else if (
            !con_password && !password
        ) {
            setError(prevState => ({
                ...prevState,
                password: 'Password must not be blank!',
                con_password: 'Incorrect password!'
            }));
        }
        else if (!con_password){
            setError(prevState => ({
                ...prevState,
                con_password: 'Incorrect password!'
            }));
        } else if (!password) {
            setError(prevState => ({
                ...prevState,
                password: 'Password must not be blank!'
            }));
        }
    }

    useEffect(() => {
        if (con_password || password) {
            setError(prevState => ({
                ...prevState,
                password: '',
                con_password: ''
            }));
        }
    }, [con_password, password]);

    return (
        <div className={'min-h-screen py-36 p-10 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 justify-center items-center'}>
            <div className={'flex justify-center items-center'}>
                <Image src={forget_password} alt={'forget password'} />
            </div>
            <div className={'flex flex-col gap-3 lg:w-2/3 md:w-full w-full'}>
                <p className={'text-center text-primary-color font-semibold text-3xl my-5'}>Change your password</p>
                <Input
                    size={'lg'}
                    color={'primary'}
                    placeholder={'Example@345'}
                    variant={'bordered'}
                    label={'Enter your new password'}
                    labelPlacement={'outside'}
                    value={password} onValueChange={setPassword}
                />
                <p className={'text-red-400 font-semibold'}>{error.password}</p>
                <Input
                    size={'lg'}
                    color={'primary'}
                    placeholder={'Example@345'}
                    variant={'bordered'}
                    label={'Confirm your password'}
                    labelPlacement={'outside'}
                    value={con_password} onValueChange={setCon_password}
                />
                <p className={'text-red-400 font-semibold'}>{error.con_password}</p>
                <Button onClick={handleChangePassword} size={'md'} color={'primary'} className={'text-medium'}>
                    <MdOutlineResetTv /> Reset my password
                </Button>
            </div>
        </div>
    );
};

export default RePassword;