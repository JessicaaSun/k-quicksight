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
            icon: <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5833 0.5C5.08325 0.5 0.583252 5 0.583252 10.5C0.583252 16 5.08325 20.5 10.5833 20.5C16.0833 20.5 20.5833 16 20.5833 10.5C20.5833 5 16.0833 0.5 10.5833 0.5ZM14.7833 14.7L9.58325 11.5V5.5H11.0833V10.7L15.5833 13.4L14.7833 14.7Z" fill="#323232"/>
            </svg>
            ,
            name: 'Recent',
            route: '/board/recent'
        },
        dataset: {
            icon: <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1236_2535)">
                    <path d="M10.5833 4.8335H4.58325C3.48325 4.8335 2.59325 5.7335 2.59325 6.8335L2.58325 18.8335C2.58325 19.9335 3.48325 20.8335 4.58325 20.8335H20.5833C21.6833 20.8335 22.5833 19.9335 22.5833 18.8335V8.8335C22.5833 7.7335 21.6833 6.8335 20.5833 6.8335H12.5833L10.5833 4.8335Z" fill="#323232"/>
                </g>
                <defs>
                    <clipPath id="clip0_1236_2535">
                        <rect width="24" height="24" fill="white" transform="translate(0.583252 0.833496)"/>
                    </clipPath>
                </defs>
            </svg>
            ,
            name: 'Dataset',
            route: '/board/dataset'
        },
        sample: {
            icon: <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1236_2547)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.5 16H17C18.8856 16 19.8284 16 20.4142 15.4142C21 14.8284 21 13.8856 21 12V7C21 5.11438 21 4.17157 20.4142 3.58579C19.8284 3 18.8856 3 17 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V18.5C5 17.1193 6.11929 16 7.5 16ZM10 6C8.89543 6 8 6.89543 8 8C8 9.10457 8.89543 10 10 10L16 10C17.1046 10 18 9.10457 18 8C18 6.89543 17.1046 6 16 6L10 6Z" fill="#222222"/>
                    <path d="M20.4142 15.4142L19.7071 14.7071L19.7071 14.7071L20.4142 15.4142ZM20.4142 3.58579L19.7071 4.29289L19.7071 4.29289L20.4142 3.58579ZM10 6L10 5H10V6ZM10 10L10 9H10V10ZM16 10L16 11H16V10ZM16 6L16 5L16 5L16 6ZM17 15H7.5V17H17V15ZM19.7071 14.7071C19.631 14.7832 19.495 14.8774 19.0613 14.9357C18.5988 14.9979 17.9711 15 17 15V17C17.9145 17 18.701 17.0021 19.3278 16.9179C19.9833 16.8297 20.6117 16.631 21.1213 16.1213L19.7071 14.7071ZM20 12C20 12.9711 19.9979 13.5988 19.9357 14.0613C19.8774 14.495 19.7832 14.631 19.7071 14.7071L21.1213 16.1213C21.631 15.6117 21.8297 14.9833 21.9179 14.3278C22.0021 13.701 22 12.9145 22 12H20ZM20 7V12H22V7H20ZM19.7071 4.29289C19.7832 4.36902 19.8774 4.50496 19.9357 4.9387C19.9979 5.40121 20 6.02892 20 7H22C22 6.08546 22.0021 5.29896 21.9179 4.67221C21.8297 4.01669 21.631 3.38834 21.1213 2.87868L19.7071 4.29289ZM17 4C17.9711 4 18.5988 4.00212 19.0613 4.06431C19.495 4.12262 19.631 4.21677 19.7071 4.29289L21.1213 2.87868C20.6117 2.36902 19.9833 2.17027 19.3278 2.08214C18.701 1.99788 17.9145 2 17 2V4ZM9 4H17V2H9V4ZM6.29289 4.29289C6.36902 4.21677 6.50496 4.12262 6.9387 4.06431C7.40121 4.00212 8.02892 4 9 4V2C8.08546 2 7.29896 1.99788 6.67221 2.08214C6.01669 2.17027 5.38834 2.36902 4.87868 2.87868L6.29289 4.29289ZM6 7C6 6.02892 6.00212 5.40121 6.06431 4.9387C6.12262 4.50496 6.21677 4.36902 6.29289 4.29289L4.87868 2.87868C4.36902 3.38834 4.17027 4.01669 4.08214 4.67221C3.99788 5.29896 4 6.08546 4 7H6ZM6 18.5V7H4V18.5H6ZM7.5 15C5.567 15 4 16.567 4 18.5H6C6 17.6716 6.67157 17 7.5 17V15ZM9 8C9 7.44772 9.44772 7 10 7V5C8.34315 5 7 6.34315 7 8H9ZM10 9C9.44772 9 9 8.55228 9 8H7C7 9.65685 8.34315 11 10 11V9ZM16 9L10 9L10 11L16 11L16 9ZM17 8C17 8.55229 16.5523 9 16 9V11C17.6569 11 19 9.65686 19 8H17ZM16 7C16.5523 7 17 7.44772 17 8H19C19 6.34315 17.6569 5 16 5L16 7ZM10 7L16 7L16 5L10 5L10 7Z" fill="#222222"/>
                </g>
                <defs>
                    <clipPath id="clip0_1236_2547">
                        <rect width="24" height="24" fill="white" transform="translate(0.583252 0.5)"/>
                    </clipPath>
                </defs>
            </svg>

            ,
            name: 'Sample',
            route: '/board/sample'
        }
    },

    visualization: {
        _name: 'visaulization',
        analysis: {
            icon: <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.361 0.5H2.80547C1.58325 0.5 0.583252 1.5 0.583252 2.72222V18.2778C0.583252 19.5 1.58325 20.5 2.80547 20.5H18.361C19.5833 20.5 20.5833 19.5 20.5833 18.2778V2.72222C20.5833 1.5 19.5833 0.5 18.361 0.5ZM7.24992 16.0556H5.0277V8.27778H7.24992V16.0556ZM11.6944 16.0556H9.47214V4.94444H11.6944V16.0556ZM16.1388 16.0556H13.9166V11.6111H16.1388V16.0556Z" fill="#323232"/>
            </svg>,
            name: 'Analysis',
            route: "/board/analysis",
        },
        dashboard: {
            icon: <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1236_2571)">
                    <path d="M10 10.52H15V21.5H10V10.52ZM17 21.5H20C21.1 21.5 22 20.6 22 19.5V10.5H17V21.5ZM20 3.5H5C3.9 3.5 3 4.4 3 5.5V8.5H22V5.5C22 4.4 21.1 3.5 20 3.5ZM3 19.5C3 20.6 3.9 21.5 5 21.5H8V10.5H3V19.5Z" fill="#323232"/>
                </g>
                <defs>
                    <clipPath id="clip0_1236_2571">
                        <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                </defs>
            </svg>

            ,
            name: 'dashboard',
            route: '/board/dashboard'
        },

    }
}


const Sidebar = ({toggleSidebar}) => {
    console.log(toggleSidebar)
    const {data:user, isSuccess} = useGetUserQuery()
    const pathname = usePathname();
    return (
        <div className={`${toggleSidebar ? 'ml-[-1000px]' : ''} bg-white transition-all text-description-color z-20 left-0 px-5 py-10 fixed flex flex-col gap-10 top-[87px] lg:overflow-y-hidden md:overflow-y-scroll min-w-[278px] min-h-screen`}>
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
                    <Link className={`${pathname === contentRoute.visualization.analysis.route}font-semibold text-text-color text-xl pl-5 py-2 hover:bg-primary-color hover:text-white transition-all rounded-xl flex justify-start items-center gap-5`} href={contentRoute.visualization.analysis.route}>{contentRoute.visualization.analysis.icon}{contentRoute.visualization.analysis.name}</Link>
                    <Link className={`${pathname === contentRoute.visualization.dashboard.route}font-semibold text-text-color text-xl pl-5 py-2 hover:bg-primary-color hover:text-white transition-all rounded-xl flex justify-start items-center gap-5`} href={contentRoute.visualization.dashboard.route}>{contentRoute.visualization.dashboard.icon}{contentRoute.visualization.dashboard.name}</Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;