import React from 'react';
import Image from "next/image";
import {Community_navbar} from "@/components/navbar/Navbar";
import logoImage from "@assets/logos/logo-square.png"
import contactus from "@assets/images/contact-us/contact_us.png";

const Confirmation = () => {
    return (
        <main>
            <Community_navbar />
            <div className="flex w-full flex-col  items-center justify-center lg:max-h-screen lg:pt-28 lg:px-36 md:pt-36 md:px-5 pt-48 px-10">
                <div className={" w-full md:gap-20 items-center md:flex "}>
                    <div className={"flex w-full md:w-[40%] lg: flex-col"}>
                        <div className={"flex flex-row"}>
                            <Image src={logoImage} alt={"logo"} className={"w-48"}/>
                            <h1 className={"flex-col"}>k-QuickSight</h1>
                        </div>
                        <h1 className={"text-primary-color pb-4"}>Contact Us</h1>
                        <p className={"text-descriptive-color pb-6"}>Got any issue?  Want to send feedback about the beta feature? need detail about our business plan? Let us know.</p>

                    </div>
                    {/*image div*/}
                    <div className={'lg:w-1/2 md:w-[60%] flex items-center'}>
                        <Image src={contactus} alt={"authentication"} className={'w-full md:block hidden'}/>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Confirmation;