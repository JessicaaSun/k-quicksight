"use client"
import React, {useState} from 'react';
import Image from "next/image";
import contactus from "@assets/images/contact-us/contact_us.png"
import FormContactUs from "@/components/contact-us/FormContactUs";

const Page = () => {
    return (
        <main className="flex w-full flex-col lg:px-48 items-center justify-center lg:max-h-screen xl:pt-28 max-sm:pt-48 sm:pt-48 max-sm:pb-6 sm:pb-6 lg:pt-34 md:pt-36 md:px-14 max-sm:px-8 sm:px-8">
            <div className={" w-full md:gap-20 items-center md:flex "}>
                <div className={"flex w-full md:w-[90%] xl:w-[40%] lg:w-[80%] flex-col"}>
                    <h1 className={"text-primary-color dark:text-third-color pb-4"}>Contact Us</h1>
                    <p className={"text-descriptive-color dark:text-white pb-6"}>Got any issue?  Want to send feedback about the beta feature? need detail about our business plan? Let us know.</p>
                    <FormContactUs/>
                </div>

                <div className={'lg:w-1/2 md:w-[60%] flex items-center'} data-aos="zoom-in-up">
                    <Image src={contactus} alt={"authentication"} unoptimized={true} className={'w-full md:block hidden'}/>
                </div>
            </div>
        </main>

    );
};

export default Page;