import React from 'react'
import Image from "next/image";
import quickSight from '@assets/images/kquicksign_logo.png'
import istad_logo from '@assets/images/istad_logo.png'
import Link from "next/link";

export default function Footer() {
    const data_link = [
        {
            name: "Feature",
            "url": "/",
        },
        {
            name: "Tutorials",
            "url": "/",
        },
        {
            name: "About us",
            "url": "/",
        },
        {
            name: "Contact Us",
            "url": "/",
        },
    ]
    const guide = [
        {
            name: "Sign Up",
            url: "/"
        },{
            name: "FAQs",
            url: "/"
        },{
            name: "Login",
            url: "/auth/login"
        },
    ]
    return (
        <div className={'bg-background-color w-full lg:flex md:flex-wrap block justify-between items-start p-10'}>
            <div className={'flex flex-col gap-5'}>
                <div className={'flex gap-5'}>
                    <Image src={quickSight} alt={'quickSight_logo'} className={'w-[73px] border-2 border-primary-color rounded-full'} />
                    <Image src={istad_logo} alt={'quickSight_logo'} className={'w-[73px]'} />
                </div>
                <div>
                    <a className={'text-xl font-semibold lowercase'} href={'mailto:kquicksight@gmail.com'}>kquicksight@gmail.com</a>
                    <p className={'text-descriptive-color font-normal'}>You can contact us by this email to get more information from us. </p>
                </div>
            </div>
            <div className={'flex flex-col gap-5'}>
                {data_link.map(e => (
                    // eslint-disable-next-line react/jsx-key
                    <Link href={e.url} className={`font-medium text-lg text-text-color hover:text-gray-500 transition-all`}>{e.name}</Link>
                ))}
            </div><div className={'flex flex-col gap-5'}>
                {guide.map(e => (
                    // eslint-disable-next-line react/jsx-key
                    <Link href={e.url} className={`font-medium text-lg text-text-color hover:text-gray-500 transition-all`}>{e.name}</Link>
                ))}
            </div>
            <div className={'lg:w-1/4 md:w-2/3 '}>
                <span className={'font-bold text-text-color text-3xl'}>Unlocking Insights, Empowering Decisions with <span className={'text-primary-color font-bold'}>K-QuickSight</span></span>
            </div>
            <div className={'h-0.5 mt-10 w-full bg-descriptive-color'}></div>
            <div className={'lg:flex md:flex block justify-between items-center w-full py-5'}>
                <a href={'/'} className={'hover:text-primary-color'}>K-QuickSight@ 2023. All rights reserved.</a>
                <div className={'flex gap-5'}>
                    <a href={'/'} className={'hover:underline'}>Privacy</a>
                    <a href={'/'} className={'hover:underline'}>Term and Service</a>
                </div>
            </div>
        </div>
    )
}
