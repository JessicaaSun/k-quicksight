'use client'

import React, {useEffect} from 'react';
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "@/store/features/auth/authSlice";

const contentRoute =
{
    file: {
        _name: 'File',
        recent: {
            name: 'Recent',
            route: '/board/userBoard/recent'
        },
        dataset: {
            name: 'Dataset',
            route: '/board/userBoard/dataset'
        },
        sample: {
            name: 'Sample',
            route: '/board/userBoard/Sample'
        }
    },

    visualization: {
        _name: 'visaulization',
        recent: {
            name: 'Analysis',
            route: "/board/userBoard/analysis",
        },
        dataset: {
            name: 'dashboard',
            route: '/board/userBoard/dashboard'
        },

    }
}

const Sidebar = () => {
    const {data:user, isSuccess} = useGetUserQuery()
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (isSuccess) {
            dispatch(setCurrentUser(user))
        }
    }, [dispatch, isSuccess, user])

    return (
        <div className={'text-description-color z-20 px-2 py-10 bg-white fixed flex flex-col gap-20 top-0 left-0 min-w-[288px] min-h-screen'}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className={'flex gap-5 justify-center items-center'}>
                <img className={'border-2 border-primary w-[70px] h-[70px] rounded-full'} src={user?.data.avatar ? user.data.avatar : 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'}  alt={'profile'}/>
                <div>
                    <p className={'text-primary-color text-2xl font-semibold'}>Board</p>
                    <p className={'text-description-color'}>{user?.data.email}</p>
                </div>
            </div>
            <div className={'flex flex-col gap-5'}>

            </div>

        </div>
    );
};

export default Sidebar;