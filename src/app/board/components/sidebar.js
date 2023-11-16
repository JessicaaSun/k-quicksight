'use client'

import React, {useEffect, useState} from 'react';
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "@/store/features/auth/authSlice";
import Link from "next/link";
import Navbar from "@/app/board/components/navbar";
import {usePathname} from "next/navigation";

const contentRoute =
{
    file: {
        _name: 'Files',
        recent: {
            icon: <i class="fa-solid fa-clock"></i>,
            name: 'Recent',
            route: '/board/recent'
        },
        dataset: {
            icon:<i class="fa-solid fa-folder"></i>,
            name: 'Dataset',
            route: '/board/dataset'
        },
        sample: {
            icon: <i class="fa-solid fa-book"></i>

            ,
            name: 'Sample',
            route: '/board/sample'
        }
    },

    visualization: {
        _name: 'visualization',
        analysis: {
            icon:<i class="fa-solid fa-square-poll-vertical"></i>,
            name: 'Analysis',
            route: "/board/analysis",
        },
        dashboard: {
            icon: <i class="fa-solid fa-table-columns"></i>,
            name: 'dashboard',
            route: '/board/dashboard'
        },

    }
}


const Sidebar = ({toggleSidebar}) => {
    const {data:user, isSuccess} = useGetUserQuery()
    const pathname = usePathname();
    return (
        <div className={`${toggleSidebar ? 'ml-[-1000px]' : ''} bg-white transition-all text-description-color z-20 left-0 px-5 py-10 fixed flex flex-col gap-10 top-[63px] lg:overflow-y-hidden md:overflow-y-scroll min-w-[278px] min-h-screen`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className={'flex gap-5 justify-center items-center'}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={'border-2 border-primary w-[70px] h-[70px] object-cover rounded-full'} src={user?.data.avatar ? user.data.avatar : 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'}  alt={'profile'}/>
                <div>
                    <p className={'text-primary-color text-2xl font-semibold'}>{user?.data.username}</p>
                    <p className={'text-description-color truncate w-[130px]'}>{user?.data.email}</p>
                </div>
            </div>
            <div className={'flex flex-col gap-5'}>
                <p className={'text-2xl font-semibold text-primary-color text-bold'}>{contentRoute.file._name}</p>
                <div className={'flex flex-col gap-2'}>
                    <Link className={`font-semibold text-text-color text-xl pl-5 py-2 hover:bg-primary-color ${pathname === contentRoute.file.recent.route ? 'bg-primary-color text-white' : 'bg-white'} hover:text-white transition-all rounded-xl flex justify-start items-center gap-5`} href={contentRoute.file.recent.route}>{contentRoute.file.recent.icon}{contentRoute.file.recent.name}</Link>
                    <Link className={`font-semibold text-text-color text-xl pl-5 py-2 hover:bg-primary-color ${pathname === contentRoute.file.dataset.route ? 'bg-primary-color text-white' : 'bg-white'} hover:text-white transition-all rounded-xl flex justify-start items-center gap-5`} href={contentRoute.file.dataset.route}>{contentRoute.file.dataset.icon}{contentRoute.file.dataset.name}</Link>
                    <Link className={`font-semibold text-text-color text-xl pl-5 py-2 hover:bg-primary-color ${pathname === contentRoute.file.sample.route ? 'bg-primary-color text-white' : 'bg-white'} hover:text-white transition-all rounded-xl flex justify-start items-center gap-5`} href={contentRoute.file.sample.route}>{contentRoute.file.sample.icon}{contentRoute.file.sample.name}</Link>
                </div>
            </div>
            <div className={'flex flex-col gap-5'}>
                <p className={'text-2xl font-semibold text-primary-color text-bold'}>{contentRoute.visualization._name}</p>
                <div className={'flex flex-col gap-2'}>
                    <Link className={`font-semibold text-text-color text-xl pl-5 py-2 hover:bg-primary-color ${pathname === contentRoute.visualization.analysis.route ? 'bg-primary-color text-white' : 'bg-white'} hover:text-white transition-all rounded-xl flex justify-start items-center gap-5`}  href={contentRoute.visualization.analysis.route}>{contentRoute.visualization.analysis.icon}{contentRoute.visualization.analysis.name}</Link>
                    <Link className={`font-semibold text-text-color text-xl pl-5 py-2 hover:bg-primary-color ${pathname === contentRoute.visualization.dashboard.route ? 'bg-primary-color text-white' : 'bg-white'} hover:text-white transition-all rounded-xl flex justify-start items-center gap-5`} href={contentRoute.visualization.dashboard.route}>{contentRoute.visualization.dashboard.icon}{contentRoute.visualization.dashboard.name}</Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;