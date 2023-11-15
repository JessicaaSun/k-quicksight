"use client"
import React, {useState} from 'react';
import Image from "next/image";
import contactus from "@assets/images/contact-us/contact_us.png"
import FormContactUs from "@/components/contact-us/FormContactUs";

const Page = () => {
    return (
        <main className="flex lg:min-h-screen w-full flex-col lg:px-48 items-center justify-center lg:max-h-screen lg:pt-32 md:pt-36 md:px-5 pt-48 px-10">
            <div className={" w-full md:gap-20 items-center md:flex "}>
                <div className={"flex w-full md:w-[40%] lg: flex-col"}>
                    <h1 className={"text-primary-color pb-4"}>Contact Us</h1>
                    <p className={"text-descriptive-color pb-6"}>Got any issue?  Want to send feedback about the beta feature? need detail about our business plan? Let us know.</p>
                    <FormContactUs/>
                </div>
                {/*image div*/}
                <div className={'lg:w-1/2 md:w-[60%] flex items-center'}>
                    <Image src={contactus} alt={"authentication"} className={'w-full md:block hidden'}/>
                </div>
            </div>
        </main>

    );
};

export default Page;